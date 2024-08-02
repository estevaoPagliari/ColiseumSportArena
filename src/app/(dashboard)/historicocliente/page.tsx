import { HistoricoComponenteCliente } from '@/app/components/historico/historicocliente'
import { MenuCliente } from '@/app/components/menu/menucliente'
import { getUser } from '@/lib/auth'

export default function HistoricoCliente() {
  const { sub, name } = getUser()
  return (
    <div>
      <MenuCliente nameuser={name} />
      <div className="pt-16">
        <HistoricoComponenteCliente id={sub} />
      </div>
    </div>
  )
}
