import { HistoricoComponenteAdmin } from '@/app/components/historico/historicoadmin'
import { MenuAdmin } from '@/app/components/menu/menuadmin'
import { getAdmin } from '@/lib/auth'

export default function Historico() {
  const { name } = getAdmin()
  return (
    <div>
      <MenuAdmin nameuser={name} />
      <div className="pt-16">
        <HistoricoComponenteAdmin />
      </div>
    </div>
  )
}
