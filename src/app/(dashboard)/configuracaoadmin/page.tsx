import ConfigAdmin from '@/app/components/configadmin/configadmin'
import { MenuAdmin } from '@/app/components/menu/menuadmin'
import { getAdmin } from '@/lib/auth'

export default function ClientConfig() {
  const { sub, name } = getAdmin()
  return (
    <div className="">
      <MenuAdmin nameuser={name} />
      <div className="grid grid-col-10 pt-16">
        <div className="col-span-2">
          <ConfigAdmin id={sub} />
        </div>
      </div>
    </div>
  )
}
