import { ClientPage } from '@/app/components/clientpage/clientepage'
import { MenuCliente } from '@/app/components/menu/menucliente'
import { getUser } from '@/lib/auth'

export default function ClientDashboard() {
  const { sub, name } = getUser()
  return (
    <div className="">
      <MenuCliente nameuser={name} />
      <div className="grid grid-col-10 pt-16">
        <div className="col-span-2">
          <ClientPage id={sub} />
        </div>
      </div>
    </div>
  )
}
