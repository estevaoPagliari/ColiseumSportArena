import Week from '@/app/components/week'
import Image from 'next/image'

const horarios = [
  { horario: '17:00', valor: 'R$200', disponibilidade: 'Vago' },
  { horario: '18:00', valor: 'R$200', disponibilidade: 'Alugado' },
  { horario: '19:00', valor: 'R$200', disponibilidade: 'Vago' },
  { horario: '20:00', valor: 'R$200', disponibilidade: 'Alugado' },
  { horario: '21:00', valor: 'R$200', disponibilidade: 'Vago' },
]

const horarios2 = [
  { horario: '17:00', valor: 'R$200', disponibilidade: 'Alugado' },
  { horario: '18:00', valor: 'R$200', disponibilidade: 'Vago' },
  { horario: '19:00', valor: 'R$200', disponibilidade: 'Alugado' },
  { horario: '20:00', valor: 'R$200', disponibilidade: 'Alugado' },
  { horario: '21:00', valor: 'R$200', disponibilidade: 'Vago' },
]

const getBgColor = (disponibilidade: string) => {
  return disponibilidade === 'Vago' ? 'bg-green-500' : 'bg-red-500'
}

export default function Agenda() {
  return (
    <div className="pt-16">
      <Week />
      <div className="grid grid-rows-2 p-6 gap-5">
        <div className="flex flex-row w-full bg-zinc-100 rounded-md shadow-lg p-1">
          <div className="relative w-52 flex justify-center items-center">
            <div className="absolute  w-full h-full">
              <Image
                src="/fundogramado/fundogramado.png"
                layout="fill"
                objectFit="cover"
                alt=""
                className="absolute w-full h-full"
              />
            </div>
            <span className="font-alt text-white z-10">Campo 1</span>
          </div>

          <div className="flex flex-row w-full gap-2 ml-2">
            {horarios.map((hora) => (
              <div
                key={hora.horario}
                className={`flex flex-col w-full justify-center items-center rounded-sm font-sans font-bold hover:cursor-pointer  hover:scale-105 transition-transform duration-300 ${getBgColor(hora.disponibilidade)}`}
              >
                <span>{hora.horario}</span>

                <span>{hora.disponibilidade}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-row w-full bg-zinc-100 rounded-md shadow-lg p-1">
          <div className="relative w-52 flex justify-center items-center">
            <div className="absolute  w-full h-full">
              <Image
                src="/fundogramado/fundogramado.png"
                layout="fill"
                objectFit="cover"
                alt=""
                className="absolute w-full h-full"
              />
            </div>
            <span className="font-alt text-white z-10">Campo 2</span>
          </div>

          <div className="flex flex-row w-full gap-2 ml-2">
            {horarios2.map((hora) => (
              <div
                key={hora.horario}
                className={`flex flex-col w-full h-20 justify-center items-center rounded-sm font-sans hover:cursor-pointer  hover:scale-105 transition-transform duration-300 ${getBgColor(hora.disponibilidade)}`}
              >
                <span>{hora.horario}</span>

                <span>{hora.disponibilidade}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
