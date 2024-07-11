/* eslint-disable react/jsx-no-comment-textnodes */
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

export default function AgendaClient() {
  const [selectedHorarios, setSelectedHorarios] = useState<
    HorarioSelecionado[]
  >([])
  const [horarioSelecionado, setHorarioSelecionado] =
    useState<HorarioSelecionado | null>(null)
  const [selectedDate, setSelectedDate] = useState<{
    dia: number
    mes: number
    ano: number
  } | null>(null)

  const handleDateSelected = (date: {
    dia: number
    mes: number
    ano: number
  }) => {
    setSelectedDate(date)
    setSelectedHorarios([]) // Limpa os horários selecionados ao mudar a data
    setHorarioSelecionado(null) // Reseta o horário selecionado ao mudar a data
  }

  const handleHorarioSelecionado = (horario: HorarioSelecionado) => {
    setHorarioSelecionado(horario)
    setSelectedHorarios([...selectedHorarios, horario]) // Adiciona o horário selecionado à lista
  }

  const handleRemove = (horario: HorarioSelecionado) => {
    const novosHorarios = selectedHorarios.filter(
      (h) => h.horario !== horario.horario,
    )
    console.log(horarioSelecionado)
    setSelectedHorarios(novosHorarios)
  }

  useEffect(() => {
    const limparHorariosSelecionados = () => {
      setSelectedHorarios([])
    }

    limparHorariosSelecionados() // Chama a função ao montar o componente
  }, [])

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
        />
        <NewDiaClient
          id={'1'}
          dataSelecionada={selectedDate}
          idrecurso={2}
          onHorarioSelecionado={handleHorarioSelecionado}
          selectedHorarios={selectedHorarios}
        />
      </div>

      <NewCarrinhoDeCompras
        selectedHorarios={selectedHorarios}
        onRemove={handleRemove}
      />
    </div>
  )
}
