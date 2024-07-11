'use client'
import { useEffect, useState } from 'react'
import { Calendario } from '../calendario/CalendarioMenu'
import { DiaAdmin } from '../selecaodia/diaadmin'

export function AdminPage({ id }: { id: string }) {
  const [dataSelecionada, setDataSelecionada] = useState<{
    dia: number
    mes: number
    ano: number
  } | null>(null)

  const handleDataSelecionada = (data: {
    dia: number
    mes: number
    ano: number
  }) => {
    setDataSelecionada(data)
  }

  useEffect(() => {
    const diaAtual = new Date().getDate()
    const mesAtual = new Date().getMonth() + 1
    const anoAtual = new Date().getFullYear()
    setDataSelecionada({ dia: diaAtual, mes: mesAtual, ano: anoAtual })
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
