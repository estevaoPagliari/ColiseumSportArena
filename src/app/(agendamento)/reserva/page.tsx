import { getUser } from '@/lib/auth'
import { MenuCliente } from '@/app/components/menu/menucliente'
import { ReservarPage } from '@/app/components/reserva/reserva'
import { getReserva } from '@/api/reserva/reservacookie'

export default async function Reserva() {
  const { sub, name } = getUser()
  console.log('getUser executado', { sub, name }) // Log para verificar a execução de getUser

  const reservas = getReserva()
  console.log('getReserva executado', reservas) // Log para verificar a execução de getReserva

  return (
    <div>
      <div className="">
        <MenuCliente nameuser={name} />
      </div>
      <div className="pt-16">
        {(await reservas).map((reserva, index) => (
          <ReservarPage
            key={index}
            horarioSelecionado={reserva}
            idclient={sub}
          />
        ))}
      </div>
    </div>
  )
}
