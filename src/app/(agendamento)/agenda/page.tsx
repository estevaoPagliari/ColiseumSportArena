/* eslint-disable react/jsx-no-comment-textnodes */
'use client'
import { useState } from 'react'
import Week from '@/app/components/week'
import { CarrinhoDeCompras } from '@/app/components/carrinhodecompra/carrinhodecompra'
import { SelecaoDia } from '@/app/components/selecaodia/dia'

interface Horario {
  horario: string
  valor: string
  disponibilidade: string
}

const horarios: Horario[] = [
  { horario: '17:00', valor: 'R$200', disponibilidade: 'Vago' },
  { horario: '18:00', valor: 'R$200', disponibilidade: 'Vago' },
  { horario: '19:00', valor: 'R$200', disponibilidade: 'Vago' },
  { horario: '20:00', valor: 'R$200', disponibilidade: 'Alugado' },
  { horario: '21:00', valor: 'R$200', disponibilidade: 'Vago' },
]

const horarios2: Horario[] = [
  { horario: '17:00', valor: 'R$200', disponibilidade: 'Alugado' },
  { horario: '18:00', valor: 'R$200', disponibilidade: 'Vago' },
  { horario: '19:00', valor: 'R$200', disponibilidade: 'Alugado' },
  { horario: '20:00', valor: 'R$200', disponibilidade: 'Alugado' },
  { horario: '21:00', valor: 'R$200', disponibilidade: 'Vago' },
]

export default function Agenda() {
  const [selectedHorarios, setSelectedHorarios] = useState<Horario[]>([])

  const handleSelect = (horarios: Horario[]) => {
    setSelectedHorarios(horarios)
  }

  const handleRemove = (horario: Horario) => {
    const novosHorarios = selectedHorarios.filter(
      (h) => h.horario !== horario.horario,
    )
    setSelectedHorarios(novosHorarios)
  }

  return (
    <div className="pt-16">
      <div className="relative">
        <Week />
      </div>

      <div className="grid grid-rows-2 p-6 gap-5">
        <SelecaoDia
          horarios={horarios}
          onSelect={handleSelect}
          selectedHorarios={selectedHorarios}
        />
        <SelecaoDia
          horarios={horarios2}
          onSelect={handleSelect}
          selectedHorarios={selectedHorarios}
        />
      </div>

      <CarrinhoDeCompras
        selectedHorarios={selectedHorarios}
        onRemove={handleRemove}
      />
    </div>
  )
}
