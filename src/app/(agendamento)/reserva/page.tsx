import { getUser } from '@/lib/auth'
import { MenuCliente } from '@/app/components/menu/menucliente'
import { ReservarPage } from '@/app/components/reserva/reserva'
import { getReserva } from '@/api/reserva/reservacookie'

export default async function Reserva() {
  const { sub, name } = await getUser() // <--- correção aqui
  console.log('getUser executado', { sub, name })

  const reservas = await getReserva() // <--- aguarde também aqui
  console.log('getReserva executado', reservas)

  return (
    <div>
      <div className="">
        <MenuCliente nameuser={name} />
      </div>
      <div className="pt-16">
        {reservas.map((reserva, index) => (
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
