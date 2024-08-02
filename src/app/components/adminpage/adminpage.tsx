'use client'
import { useEffect, useState } from 'react'
import { Calendario } from '../calendario/CalendarioMenu'
import { DiaAdmin } from '../selecaodia/diaadmin'

export function AdminPage({ id }: { id: string }) {
  const [dataSelecionada, setDataSelecionada] = useState<{
    dia: number
    mes: number
    ano: number
    semana: string
  } | null>(null)

  const handleDataSelecionada = (data: {
    dia: number
    mes: number
    ano: number
    semana: string
  }) => {
    setDataSelecionada(data)
  }

  useEffect(() => {
    const dataAtual = new Date()
    const diaSemana = dataAtual.toLocaleDateString('pt-BR', { weekday: 'long' })
    const diaAtual = dataAtual.getDate()
    const mesAtual = dataAtual.getMonth() + 1
    const anoAtual = dataAtual.getFullYear()
    setDataSelecionada({
      dia: diaAtual,
      mes: mesAtual,
      ano: anoAtual,
      semana: diaSemana,
    })
  }, [])
  return (
    <div className="grid md:grid-cols-6 pt-16">
      <div className="md:col-span-2 ">
        <Calendario onDataSelecionada={handleDataSelecionada} />
      </div>
      <div className="md:col-span-4 mt-5">
        <DiaAdmin id={id} dataSelecionada={dataSelecionada} />
      </div>
    </div>
  )
}
