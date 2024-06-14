'use client'
import React, { useState } from 'react'
import { format, addDays } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Menu, Transition } from '@headlessui/react'

export default function Week() {
  const today: Date = new Date()
  const nextSixDays: Date[] = Array.from({ length: 6 }, (_, i) =>
    addDays(today, i),
  )
  const [selectedDay, setSelectedDay] = useState<Date>(nextSixDays[0])

  const handleSelectDay = (day: Date) => {
    setSelectedDay(day)
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="hidden text-xl md:text-4xl font-alt">Agendamento</h1>
      <div className="grid grid-row-1">
        <div className="hidden md:flex w-screen gap-4  justify-center p-2">
          {nextSixDays.map((day, index) => (
            <button
              className="w-52 p-4 border rounded-lg shadow-lg bg-white text-center hover:cursor-pointer hover:scale-105 transition-transform duration-300"
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
              <Menu.Items className="absolute w-full mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
