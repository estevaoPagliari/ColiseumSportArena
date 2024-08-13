'use client'
import { api } from '@/api/api'
import { AgendaNew } from '@/api/interface/InterAgenda'
import { HorarioFuncionamento } from '@/api/interface/InterHorarioFuncionamento'
import { BuscarHorario } from '@/api/user/horario/buscarhorario'
import { SetStateAction, useEffect, useState } from 'react'
import { Modal } from '../modal/Modal'
import { ModalBloquearDia } from '../modal/ModalBloquearDia'

let openingTime = ''
let closingTime = ''
let lunchStart = ''
let lunchEnd = ''

interface DiaSelecionado {
  dataSelecionada: {
    dia: number
    mes: number
    ano: number
    semana: string
  } | null
}

export function DiaAdmin({
  id,
  dataSelecionada,
}: {
  dataSelecionada: DiaSelecionado['dataSelecionada']
  id: string
}) {
  const [selected, setSelected] = useState(1) // Estado para controlar o item selecionado
  const [appointments, setAppointments] = useState<AgendaNew[]>([])
  const [userHorario, setUserHorario] = useState<HorarioFuncionamento[]>([])
  const [loading, setLoading] = useState(true) // Estado para controlar o carregamento

  const handleSelect = (index: SetStateAction<number>) => {
    setSelected(index) // Atualiza o estado com o índice do item selecionado
  }

  async function fetchUserHorario() {
    try {
      const data = await BuscarHorario(id) // Passe o userId para a função Loaduser
      await setUserHorario(data)
      // await setUserHorario(data)
      // return data
    } catch (error) {
      // Trate erros, se necessário
      console.error('Erro ao carregar dados do usuário:', error)
    }
  }

  const fetchAppointments = async () => {
    try {
      if (dataSelecionada) {
        setLoading(true) // Inicia o carregamento
        const idrecurso = selected
        const { dia, mes } = dataSelecionada
        const response = await api.post('/buscaragendarecurso', {
          id,
          dia,
          mes,
          idrecurso,
        })

        // console.log(response.data)
        setAppointments(response.data)
      }
    } catch (error) {
      console.error('Error fetching appointments:', error)
    } finally {
      setLoading(false) // Finaliza o carregamento
    }
  }

  useEffect(() => {
    fetchUserHorario()
  }, [])

  useEffect(() => {
    if (userHorario[0] !== undefined && dataSelecionada?.semana !== 'sábado') {
      openingTime = userHorario[0].horarioAbertura
      closingTime = userHorario[0].horarioFechamento
      lunchStart = userHorario[0].horarioAlmocoInicio
      lunchEnd = userHorario[0].horarioAlmocoFim
    } else if (
      userHorario[0] !== undefined &&
      dataSelecionada?.semana === 'sábado'
    ) {
      openingTime = userHorario[0].horarioAberturasabado
      closingTime = userHorario[0].horarioFechamentosabado
    }
    console.log('foi executadfo')
  }, [userHorario[0]])

  useEffect(() => {
    if (userHorario[0] !== undefined && dataSelecionada?.semana === 'sábado') {
      openingTime = userHorario[0].horarioAberturasabado
      closingTime = userHorario[0].horarioFechamentosabado
    } else if (
      userHorario[0] !== undefined &&
      dataSelecionada?.semana !== 'sábado'
    ) {
      openingTime = userHorario[0].horarioAbertura
      closingTime = userHorario[0].horarioFechamento
      lunchStart = userHorario[0].horarioAlmocoInicio
      lunchEnd = userHorario[0].horarioAlmocoFim
    }
    fetchAppointments()
  }, [dataSelecionada?.dia])

  useEffect(() => {
    fetchAppointments()
  }, [selected])

  const generateEmptyAppointments = (
    openingTime: string,
    closingTime: string,
    lunchStart: string,
    lunchEnd: string,
    appointments: AgendaNew[],
  ) => {
    const emptyAppointments: AgendaNew[] = []
    let currentTime = openingTime

    // Criar uma lista de todos os horários ocupados
    const occupiedTimes: { startTime: string; endTime: string }[] = []
    appointments.forEach((appointment) => {
      const endTime = incrementTime(
        appointment.horario,
        parseInt(appointment.TipoServico.tempoServico || '0'),
      )
      occupiedTimes.push({ startTime: appointment.horario, endTime })
    })

    // Gerar uma lista de todos os horários possíveis no intervalo de horário de trabalho
    while (currentTime < closingTime) {
      const isDuringLunchBreak =
        currentTime >= lunchStart && currentTime < lunchEnd

      // Verificar se o horário está dentro de um intervalo ocupado
      const isDuringService = occupiedTimes.some(
        (occupiedTime) =>
          currentTime >= occupiedTime.startTime &&
          currentTime < occupiedTime.endTime,
      )

      // Se o horário não estiver ocupado e não estiver durante o intervalo de almoço, adicionar à lista de horários vazios
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
            id: 0,
            nome: 'Nenhum serviço agendado',
            tempoServico: '',
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

  // Função para incrementar o tempo
  const incrementTime = (time: string, minutes: number): string => {
    const [hour, minute] = time.split(':').map(Number)
    const newMinute = (minute + minutes) % 60
    const newHour = hour + Math.floor((minute + minutes) / 60)
    return `${String(newHour).padStart(2, '0')}:${String(newMinute).padStart(
      2,
      '0',
    )}`
  }

  // Gerar os horários vazios
  const emptyAppointments = generateEmptyAppointments(
    openingTime,
    closingTime,
    lunchStart,
    lunchEnd,
    appointments,
  )

  // Concatenar os agendamentos com os horários vazios e ordená-los
  const allAppointments = [...appointments, ...emptyAppointments].sort(
    (a, b) => (a.horario > b.horario ? 1 : -1),
  )

  const [isModalVisible, setModalVisible] = useState<Array<boolean>>(
    allAppointments.map(() => false),
  )

  const [isModalVisibleBlock, setModalVisibleBlock] = useState<boolean>(false)

  const handleOpenModalBlock = () => {
    setModalVisibleBlock(true)
  }
  const handleCloseModalBlock = () => {
    setModalVisibleBlock(false)
  }

  const handleOpenModal = (index: number) => {
    setModalVisible((prev) => {
      const newState = [...prev]
      newState[index] = true
      return newState
    })
  }

  const handleCloseModal = (index: number) => {
    setModalVisible((prev) => {
      const newState = [...prev]
      newState[index] = false
      return newState
    })
  }

  async function onAppointmentCancelled() {
    await fetchAppointments()
  }

  return (
    <div className="flex flex-col m-auto md:w-full p-3 shadow-lg bg-zinc-200">
      <div className="flex flex-col w-auto md:flex-row justify-between items-center gap-2">
        <div className="flex flex-col md:flex-row w-full gap-1">
          <span className="font-alt text-sm md:text-xl">
            Informação do Dia:
          </span>
          <span className="font-alt text-sm md:text-xl">
            {dataSelecionada?.dia} / {dataSelecionada?.mes} /{' '}
            {dataSelecionada?.ano}
          </span>
        </div>

        <div className="flex flex-col md:flex-row w-full gap-1 justify-center items-center">
          <button
            onClick={() => handleOpenModalBlock()}
            className="flex p-2 bg-red-500 rounded-md font-sans text-xl hover:scale-105"
          >
            Desabilitar Dia
          </button>
          <ModalBloquearDia
            isVisible={isModalVisibleBlock}
            onClose={() => handleCloseModalBlock()}
            estabelecimentoId={id}
            dia={dataSelecionada?.dia ?? null}
            mes={dataSelecionada?.mes ?? null}
            ano={dataSelecionada?.ano ?? null}
            tiposervico={1}
            recursoId2={2}
            recursoId1={1}
            clienteid={2}
            DiaSemana={dataSelecionada?.semana ?? null}
            onAppointmentCancelled={() => onAppointmentCancelled()}
          />
        </div>

        <div className="flex flex-col w-40 md:w-full justify-center items-center gap-2 font-sans">
          <div
            className={`flex w-full justify-center items-center rounded-sm cursor-pointer ${
              selected === 1 ? 'bg-green-500' : 'bg-gray-500'
            }`}
            onClick={() => handleSelect(1)}
          >
            La Bombonera
          </div>
          <div
            className={`flex w-full justify-center items-center rounded-sm cursor-pointer ${
              selected === 2 ? 'bg-green-500' : 'bg-gray-500'
            }`}
            onClick={() => handleSelect(2)}
          >
            Arena Da Baixada
          </div>
        </div>
      </div>

      <div className="flex flex-col mt-4 rounded-sm font-sans gap-2">
        {loading ? (
          <div>
            <span>carregando</span>
          </div>
        ) : allAppointments.length > 0 ? (
          <div className="overflow-x-auto w-96 md:w-auto">
            <table className="md:min-w-full divide-y divide-gray-200 ">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Horario
                  </th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Recurso
                  </th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Telefone
                  </th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cpf
                  </th>
                  <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Opções
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {allAppointments.map((appointments, index) => (
                  <tr
                    key={index}
                    className={
                      appointments.Cliente.nome === 'Horário vago'
                        ? 'bg-red-100/50 text-red-700'
                        : appointments.Cliente.nome === 'Horario Inativo'
                          ? 'bg-yellow-100/50 text-yellow-600'
                          : 'bg-green-100/50 text-green-600'
                    }
                  >
                    <td className="px-2 py-4 whitespace-nowrap">
                      {appointments.horario}
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap">
                      {appointments.Recurso.nome}
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap">
                      {appointments.Cliente.nome}
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap">
                      {appointments.Cliente.telefone}
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap">
                      {appointments.Cliente.cpf}
                    </td>
                    <td className="px-2 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleOpenModal(index)}
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                      >
                        Abrir
                      </button>
                      <Modal
                        isVisible={isModalVisible[index]}
                        onClose={() => handleCloseModal(index)}
                        nome={appointments.Cliente.nome}
                        servico={appointments.TipoServico.nome}
                        dia={dataSelecionada?.dia ?? null}
                        mes={dataSelecionada?.mes ?? null}
                        ano={dataSelecionada?.ano ?? null}
                        horario={appointments.horario}
                        tempoServico={appointments.TipoServico.tempoServico}
                        telefone={appointments.Cliente.telefone}
                        email={appointments.Cliente.email}
                        idagenda={appointments.id}
                        idrecurso={selected}
                        onAppointmentCancelled={() => onAppointmentCancelled()}
                        nomeRecurso={appointments.Recurso.nome}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <span>Sem agendamentos para o dia</span>
          </div>
        )}
      </div>
    </div>
  )
}
