'use client'
import React, { useState, useEffect } from 'react'
import { format, addDays } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Menu, Transition } from '@headlessui/react'

interface WeekProps {
  onDateSelected: (date: {
    dia: number
    mes: number
    semana: string
    ano: number
  }) => void
}

export default function Week({ onDateSelected }: WeekProps) {
  const today: Date = new Date()

  const nextSixDays: Date[] = Array.from({ length: 21 }, (_, i) =>
    addDays(today, i),
  )
  const [selectedDay, setSelectedDay] = useState<Date>(today)

  useEffect(() => {
    const diaSemana = today.toLocaleDateString('pt-BR', { weekday: 'long' })
    setSelectedDay(today)
    onDateSelected({
      dia: today.getDate(),
      mes: today.getMonth() + 1, // Meses em JavaScript são baseados em zero, por isso adicionamos 1
      semana: diaSemana,
      ano: today.getFullYear(),
    })
  }, [])

  const handleSelectDay = (day: Date) => {
    const diaSemana = day.toLocaleDateString('pt-BR', { weekday: 'long' })
    setSelectedDay(day)
    const selectedDate = {
      dia: day.getDate(),
      mes: day.getMonth() + 1,
      semana: diaSemana,
      ano: day.getFullYear(),
    }
    onDateSelected(selectedDate)
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="hidden text-xl md:text-4xl font-alt">Agendamento</h1>
      <div className="grid grid-row-1">
        <div className="hidden md:flex w-screen h-auto gap-4 justify-center p-2 flex-wrap">
          {nextSixDays.map((day, index) => (
            <button
              className={`w-52 p-4 border rounded-lg shadow-lg text-center hover:cursor-pointer hover:scale-105 transition-transform duration-300 ${
                selectedDay.getTime() === day.getTime()
                  ? 'bg-white text-black'
                  : 'bg-white'
              }`}
              onClick={() => handleSelectDay(day)}
              key={index}
            >
              <div className="text-lg font-alt">
                {format(day, 'dd/MM/yyyy')}
              </div>
              <div className="text-sm font-sans text-gray-500">
                {format(day, 'EEEE', { locale: ptBR })}
              </div>
            </button>
          ))}
        </div>
        <div className="md:hidden w-full">
          <Menu as="div" className="relative p-2">
            <h2 className="text-xl text-center font-alt">
              Agendamento - Selecionar Dia
            </h2>
            <Menu.Button className="w-80 p-4 border rounded-lg shadow-lg bg-white text-center text-lg font-semibold">
              {format(selectedDay, 'dd/MM/yyyy')} -{' '}
              {format(selectedDay, 'EEEE', { locale: ptBR })}
            </Menu.Button>
            <Transition
              as={React.Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="relative z-10 w-full mt-2 origin-top-right font-sans bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {nextSixDays.map((day, index) => (
                  <Menu.Item key={index}>
                    {({ active }) => (
                      <button
                        onClick={() => handleSelectDay(day)}
                        className={`${
                          active ? 'bg-gray-100' : ''
                        } w-full px-4 py-2 text-sm text-left text-gray-700`}
                      >
                        {format(day, 'dd/MM/yyyy')} -{' '}
                        {format(day, 'EEEE', { locale: ptBR })}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  )
}
