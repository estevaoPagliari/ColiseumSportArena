'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { api } from '@/api/api'
import { AgendaNew } from '@/api/interface/InterAgenda'
import { HorarioFuncionamento } from '@/api/interface/InterHorarioFuncionamento'
import { BuscarHorario } from '@/api/user/horario/buscarhorario'

let openingTime = ''
let closingTime = ''
let lunchStart = ''
let lunchEnd = ''

interface DiaSelecionado {
  dataSelecionada: { dia: number; mes: number; ano: number } | null
}

export interface HorarioSelecionado {
  dia: number
  mes: number
  ano: number
  horario: string
  recursoId: number
}

const getBgColor = (disponibilidade: string, isInactive: boolean): string => {
  if (isInactive) return 'bg-gray-300'
  return disponibilidade === 'Horário vago' ? 'bg-green-500' : 'bg-red-500'
}

export function NewDiaClientRec2({
  id,
  dataSelecionada,
  idrecurso,
  onHorarioSelecionado,
  selectedHorarios,
}: {
  dataSelecionada: DiaSelecionado['dataSelecionada']
  id: string
  idrecurso: number
  onHorarioSelecionado: (horario: HorarioSelecionado) => void
  selectedHorarios: HorarioSelecionado[]
}) {
  const [appointments, setAppointments] = useState<AgendaNew[]>([])
  const [userHorario, setUserHorario] = useState<HorarioFuncionamento[]>([])
  const [loading, setLoading] = useState(true)

  async function fetchUserHorario() {
    try {
      const data = await BuscarHorario(id)
      await setUserHorario(data)
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error)
    }
  }

  const fetchAppointments = async () => {
    try {
      if (dataSelecionada) {
        setLoading(true)

        const { dia, mes } = dataSelecionada
        const response = await api.post('/buscaragendarecurso', {
          id,
          dia,
          mes,
          idrecurso,
        })

        setAppointments(response.data)
      }
    } catch (error) {
      console.error('Error fetching appointments:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUserHorario()
  }, [])

  useEffect(() => {
    if (userHorario[0] !== undefined) {
      openingTime = userHorario[0].horarioAbertura
      closingTime = userHorario[0].horarioFechamento
      lunchStart = userHorario[0].horarioAlmocoInicio
      lunchEnd = userHorario[0].horarioAlmocoFim
    }
  }, [userHorario[0]])

  useEffect(() => {
    fetchAppointments()
  }, [dataSelecionada?.dia])

  const generateEmptyAppointments = (
    openingTime: string,
    closingTime: string,
    lunchStart: string,
    lunchEnd: string,
    appointments: AgendaNew[],
  ) => {
    const emptyAppointments: AgendaNew[] = []
    let currentTime = openingTime

    const occupiedTimes: { startTime: string; endTime: string }[] = []
    appointments.forEach((appointment) => {
      const endTime = incrementTime(
        appointment.horario,
        parseInt(appointment.TipoServico.tempoServico || '0'),
      )
      occupiedTimes.push({ startTime: appointment.horario, endTime })
    })

    while (currentTime < closingTime) {
      const isDuringLunchBreak =
        currentTime >= lunchStart && currentTime < lunchEnd

      const isDuringService = occupiedTimes.some(
        (occupiedTime) =>
          currentTime >= occupiedTime.startTime &&
          currentTime < occupiedTime.endTime,
      )

      if (!isDuringLunchBreak && !isDuringService) {
        emptyAppointments.push({
          horario: currentTime,
          Cliente: {
            id: 0,
            nome: 'Horário vago',
            email: '',
            senha: '',
            cpf: 0,
            telefone: 0,
            createdAt: '',
            updatedAt: '',
          },
          TipoServico: {
            id: 1,
            nome: 'Aluguel de Campo',
            tempoServico: '60',
            valorServico: 200,
            UserEstabelecimentoId: 0,
          },
          id: '0',
          dia: 0,
          mes: 0,
          ano: 0,
          tipoServicoId: 0,
          estabelecimentoId: 0,
          clienteId: 0,
          recursoId: 0,
          Estabelecimento: {
            id: 0,
            nome: '',
            email: '',
            senha: '',
            cpf: 0,
            telefone: 0,
            createdAt: '',
            updatedAt: '',
          },
          Recurso: {
            id: 0,
            nome: '',
            estabelecimentoId: 0,
          },
        })
      }

      currentTime = incrementTime(currentTime, 60)
    }

    return emptyAppointments
  }

  const incrementTime = (time: string, minutes: number): string => {
    const [hour, minute] = time.split(':').map(Number)
    const newMinute = (minute + minutes) % 60
    const newHour = hour + Math.floor((minute + minutes) / 60)
    return `${String(newHour).padStart(2, '0')}:${String(newMinute).padStart(
      2,
      '0',
    )}`
  }

  const emptyAppointments = generateEmptyAppointments(
    openingTime,
    closingTime,
    lunchStart,
    lunchEnd,
    appointments,
  )

  const allAppointments = [...appointments, ...emptyAppointments].sort(
    (a, b) => (a.horario > b.horario ? 1 : -1),
  )

  const handleSelectHorario = (horario: AgendaNew) => {
    if (horario.Cliente.nome !== 'Horário vago') return

    let newSelectedHorarios = [...selectedHorarios]
    if (newSelectedHorarios.includes(horario)) {
      newSelectedHorarios = newSelectedHorarios.filter(
        (h) => h.horario !== horario.horario,
      )
    } else {
      if (newSelectedHorarios.length === 2) {
        newSelectedHorarios = [horario]
      } else if (newSelectedHorarios.length === 1) {
        const primeiroHorario = newSelectedHorarios[0]
        const proximoHorarioIndex =
          allAppointments.findIndex(
            (h) => h.horario === primeiroHorario.horario,
          ) + 1
        const anteriorHorarioIndex =
          allAppointments.findIndex(
            (h) => h.horario === primeiroHorario.horario,
          ) - 1

        if (
          (proximoHorarioIndex < allAppointments.length &&
            allAppointments[proximoHorarioIndex].horario === horario.horario) ||
          (anteriorHorarioIndex >= 0 &&
            allAppointments[anteriorHorarioIndex].horario === horario.horario)
        ) {
          newSelectedHorarios = [...newSelectedHorarios, horario]
        } else {
          newSelectedHorarios = [horario]
        }
      } else {
        newSelectedHorarios = [horario]
      }
    }

    onHorarioSelecionado({
      dia: dataSelecionada?.dia || 0,
      mes: dataSelecionada?.mes || 0,
      ano: dataSelecionada?.ano || 0,
      horario: horario.horario,
      recursoId: idrecurso,
    })
  }

  const isInactive = (horario: AgendaNew): boolean => {
    if (selectedHorarios.length === 0) return false
    if (selectedHorarios.length === 1) {
      const primeiroHorario = selectedHorarios[0]
      const proximoHorarioIndex =
        allAppointments.findIndex(
          (h) => h.horario === primeiroHorario.horario,
        ) + 1
      const anteriorHorarioIndex =
        allAppointments.findIndex(
          (h) => h.horario === primeiroHorario.horario,
        ) - 1

      return !(
        (proximoHorarioIndex < allAppointments.length &&
          allAppointments[proximoHorarioIndex].horario === horario.horario &&
          horario.Cliente.nome === 'Horário vago') ||
        (anteriorHorarioIndex >= 0 &&
          allAppointments[anteriorHorarioIndex].horario === horario.horario &&
          horario.Cliente.nome === 'Horário vago')
      )
    }
    return true
  }

  return (
    <div className="flex flex-col md:flex-row w-full bg-zinc-100 rounded-md shadow-lg p-1">
      <div className="relative w-full md:w-52 flex justify-center items-center">
        <div className="absolute w-full h-full">
          <Image
            src="/fundogramado/fundogramado.png"
            layout="fill"
            objectFit="cover"
            alt=""
            className="w-full h-full"
          />
        </div>
        <span className="font-alt text-white z-10">Campo {idrecurso}</span>
      </div>

      {loading ? (
        <div>Carregando</div>
      ) : (
        <div className="flex flex-col md:flex-row w-full gap-1 mt-2 md:mt-0 ml-0 md:ml-2 justify-center items-center">
          {allAppointments.map((appointment) => (
            <button
              key={appointment.horario}
              className={`flex-grow flex w-full md:flex-col gap-1 h-20 justify-center items-center rounded-sm font-bold ${getBgColor(
                appointment.Cliente.nome,
                isInactive(appointment),
              )} ${
                appointment.Cliente.nome === 'Horário vago' &&
                !isInactive(appointment)
                  ? 'hover:cursor-pointer hover:scale-105 transition-transform duration-300'
                  : 'cursor-not-allowed'
              }`}
              onClick={() => handleSelectHorario(appointment)}
              disabled={isInactive(appointment)}
            >
              <span>{appointment.horario}</span>
              <span className="md:hidden">|</span>
              <span>R${appointment.TipoServico.valorServico},00</span>
              <span className="md:hidden">|</span>
              {appointment.Cliente.nome === 'Horário vago' ? (
                <div>
                  <span>{appointment.Cliente.nome}</span>
                </div>
              ) : (
                <div>
                  <span>Horário Reservado</span>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
