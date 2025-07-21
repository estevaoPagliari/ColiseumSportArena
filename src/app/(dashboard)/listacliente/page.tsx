import { ListClientComponents } from '@/app/components/listclient/listclient'
import { MenuAdmin } from '@/app/components/menu/menuadmin'
import { getAdmin } from '@/lib/auth'

export default async function ListaCliente() {
  const { name } = await getAdmin()
  return (
    <div>
      <MenuAdmin nameuser={name} />
      <div className="pt-16">
        <ListClientComponents />
      </div>
    </div>
  )
}
