import { useState, useEffect } from 'react'
import Image from 'next/image'

export interface Horario {
  horario: string
  valor: string
  disponibilidade: string
}

interface SelecaoDiaProps {
  horarios: Horario[]
  onSelect: (horarios: Horario[]) => void
  selectedHorarios: Horario[]
}

const getBgColor = (disponibilidade: string, isInactive: boolean): string => {
  if (isInactive) return 'bg-gray-300'
  return disponibilidade === 'Vago' ? 'bg-green-500' : 'bg-red-500'
}

export function SelecaoDia({
  horarios,
  onSelect,
  selectedHorarios,
}: SelecaoDiaProps) {
  const [internalSelectedHorarios, setInternalSelectedHorarios] = useState<
    Horario[]
  >([])

  useEffect(() => {
    setInternalSelectedHorarios(selectedHorarios)
  }, [selectedHorarios])

  const handleHorarioClick = (hora: Horario) => {
    if (hora.disponibilidade === 'Vago') {
      if (internalSelectedHorarios.length === 0) {
        setInternalSelectedHorarios([hora])
        onSelect([hora])
      } else if (internalSelectedHorarios.length === 1) {
        const primeiroHorario = internalSelectedHorarios[0]
        const proximoHorarioIndex =
          horarios.findIndex((h) => h.horario === primeiroHorario.horario) + 1
        const anteriorHorarioIndex =
          horarios.findIndex((h) => h.horario === primeiroHorario.horario) - 1

        if (
          (proximoHorarioIndex < horarios.length &&
            horarios[proximoHorarioIndex].horario === hora.horario) ||
          (anteriorHorarioIndex >= 0 &&
            horarios[anteriorHorarioIndex].horario === hora.horario)
        ) {
          const novosHorarios = [primeiroHorario, hora]
          setInternalSelectedHorarios(novosHorarios)
          onSelect(novosHorarios)
        } else {
          setInternalSelectedHorarios([hora])
          onSelect([hora])
        }
      } else {
        setInternalSelectedHorarios([hora])
        onSelect([hora])
      }
    }
  }

  const isInactive = (hora: Horario): boolean => {
    if (internalSelectedHorarios.length === 0) return false
    if (internalSelectedHorarios.length === 1) {
      const primeiroHorario = internalSelectedHorarios[0]
      const proximoHorarioIndex =
        horarios.findIndex((h) => h.horario === primeiroHorario.horario) + 1
      const anteriorHorarioIndex =
        horarios.findIndex((h) => h.horario === primeiroHorario.horario) - 1

      return !(
        (proximoHorarioIndex < horarios.length &&
          horarios[proximoHorarioIndex].horario === hora.horario &&
          hora.disponibilidade === 'Vago') ||
        (anteriorHorarioIndex >= 0 &&
          horarios[anteriorHorarioIndex].horario === hora.horario &&
          hora.disponibilidade === 'Vago')
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
        <span className="font-alt text-white z-10">Campo</span>
      </div>

      <div className="flex flex-wrap md:flex-row w-full gap-1 mt-2 md:mt-0 ml-0 md:ml-2 justify-center items-center">
        {horarios.map((hora) => (
          <div
            key={hora.horario}
            className={`flex flex-col w-full md:w-[200px] h-20 justify-center items-center rounded-sm font-bold ${
              hora.disponibilidade === 'Vago' && !isInactive(hora)
                ? 'hover:cursor-pointer hover:scale-105 transition-transform duration-300'
                : 'cursor-not-allowed'
            } ${getBgColor(hora.disponibilidade, isInactive(hora))}`}
            onClick={() => handleHorarioClick(hora)}
          >
            <span>{hora.horario}</span>
            <span>{hora.valor}</span>
            <span>{hora.disponibilidade}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
