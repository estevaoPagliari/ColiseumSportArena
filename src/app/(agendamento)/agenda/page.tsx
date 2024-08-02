'use client'
import { useEffect, useState } from 'react'
import Week from '@/app/components/week'
import { NewCarrinhoDeCompras } from '@/app/components/carrinhodecompra/newcarrinhodecompra'
import { NewDiaClient } from '@/app/components/selecaodia/newdiaclient'

export interface HorarioSelecionado {
  dia: number
  mes: number
  ano: number
  horario: string
  recursoId: number
}

export default function Agenda() {
  const [selectedHorarios, setSelectedHorarios] = useState<
    HorarioSelecionado[]
  >([])
  const [horarioSelecionado, setHorarioSelecionado] =
    useState<HorarioSelecionado | null>(null)
  const [selectedDate, setSelectedDate] = useState<{
    dia: number
    mes: number
    ano: number
    semana: string
  } | null>(null)
  const [activeResourceId, setActiveResourceId] = useState<number | null>(0)

  const handleDateSelected = (date: {
    dia: number
    mes: number
    ano: number
    semana: string
  }) => {
    setSelectedDate(date)
    setSelectedHorarios([]) // Limpa os horários selecionados ao mudar a data
    setHorarioSelecionado(null) // Reseta o horário selecionado ao mudar a data
  }

  const handleHorarioSelecionado = (horario: HorarioSelecionado) => {
    console.log(horario.recursoId)
    setHorarioSelecionado(horario)
    setSelectedHorarios([...selectedHorarios, horario]) // Adiciona o horário selecionado à lista
    setActiveResourceId(horario.recursoId) // Ativa o recurso associado
  }

  const handleRemove = (horario: HorarioSelecionado) => {
    const novosHorarios = selectedHorarios.filter(
      (h) => h.horario !== horario.horario,
    )
    setSelectedHorarios(novosHorarios)
    setActiveResourceId(null) // Desativa o recurso ao remover um item
  }

  useEffect(() => {
    const limparHorariosSelecionados = () => {
      setSelectedHorarios([])
      setActiveResourceId(null) // Garante que nenhum recurso esteja ativo ao montar o componente
    }

    limparHorariosSelecionados() // Chama a função ao montar o componente
  }, [])

  useEffect(() => {
    setActiveResourceId(0) // Garante que nenhum recurso esteja ativo ao montar o componente
  }, [])

  console.log(horarioSelecionado)
  console.log('teste', activeResourceId)

  return (
    <div className="pt-16">
      <div className="relative">
        <Week onDateSelected={handleDateSelected} />
      </div>

      <div className="grid grid-rows-2 p-6 gap-5">
        <NewDiaClient
          id={'1'}
          dataSelecionada={selectedDate}
          idrecurso={1}
          onHorarioSelecionado={handleHorarioSelecionado}
          selectedHorarios={selectedHorarios}
          isActive={activeResourceId !== 2} // Controle de ativação
        />
        <NewDiaClient
          id={'1'}
          dataSelecionada={selectedDate}
          idrecurso={2}
          onHorarioSelecionado={handleHorarioSelecionado}
          selectedHorarios={selectedHorarios}
          isActive={activeResourceId !== 1} // Controle de ativação
        />
      </div>

      <NewCarrinhoDeCompras
        selectedHorarios={selectedHorarios}
        onRemove={handleRemove}
      />
    </div>
  )
}
