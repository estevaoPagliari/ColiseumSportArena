import ConfiguracaoClientFrom from '@/app/components/login/configuracaoclient'
import { MenuCliente } from '@/app/components/menu/menucliente'
import { getUser } from '@/lib/auth'

export default function ClientConfig() {
  const { sub, name } = getUser()
  return (
    <div className="">
      <MenuCliente nameuser={name} />
      <div className="grid grid-col-10 pt-16">
        <div className="col-span-2">
          {sub}
          <ConfiguracaoClientFrom id={sub} />
        </div>
      </div>
    </div>
  )
}
