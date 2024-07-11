'use client'
// Calendario.js
import React, { useEffect, useState } from 'react'
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  addMonths,
  subMonths,
  getDay,
} from 'date-fns'
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from 'react-icons/fa'
interface CalendarioProps {
  onDataSelecionada: (data: { dia: number; mes: number; ano: number }) => void
}

export function Calendario({ onDataSelecionada }: CalendarioProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [dataSelecionada, setDataSelecionada] = useState<{
    dia: number | null
    mes: number | null
    ano: number | null
  }>({ dia: null, mes: null, ano: null })

  useEffect(() => {
    const diaAtual = new Date().getDate()
    const mesAtual = new Date().getMonth() + 1
    const anoAtual = new Date().getFullYear()
    setDataSelecionada({ dia: diaAtual, mes: mesAtual, ano: anoAtual })
  }, [])

  const diasDoMes = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  })

  const diasVazios = new Array(getDay(diasDoMes[0])).fill(null)

  const avancarMes = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }

  const retrocederMes = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }

  const handleNumeroClick = (dia: number) => {
    const mes = currentDate.getMonth() + 1 // Mês é baseado em zero, então adicionamos 1
    const ano = currentDate.getFullYear()
    setDataSelecionada({ dia, mes, ano })
    onDataSelecionada({ dia, mes, ano })
  }

  return (
    <div className="bg-slate-200/40 rounded-xl p-2 justify-center items-center h-[450px]">
      <div className="flex justify-between items-center mb-4">
        <FaRegArrowAltCircleLeft size={30} onClick={retrocederMes} />
        <h2 className="text-2xl font-bold">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <FaRegArrowAltCircleRight size={30} onClick={avancarMes} />
      </div>
      <div className="grid grid-cols-7 gap-4">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((diaSemana) => (
          <div key={diaSemana} className="text-center justify-center p-2">
            {diaSemana}
          </div>
        ))}
        {diasVazios.map((_, index) => (
          <div key={`empty-${index}`} className="text-center p-2 border"></div>
        ))}
        {diasDoMes.map((dia, index) => (
          <div
            key={index}
            className={`text-center p-2 border rounded-md hover:bg-[#A1D7E2] transition duration-300 cursor-pointer font-semibold ${
              dataSelecionada && dataSelecionada.dia === index + 1
                ? 'bg-[#001F3F] text-slate-100 font-bold scale-105'
                : ''
            }`}
            onClick={() => handleNumeroClick(index + 1)}
          >
            {format(dia, 'd')}
          </div>
        ))}
      </div>
    </div>
  )
}
