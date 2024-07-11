import { AdminPage } from '@/app/components/adminpage/adminpage'

import { MenuAdmin } from '@/app/components/menu/menuadmin'

import { getAdmin } from '@/lib/auth'

export default function AdminDashboard() {
  const { sub, name } = getAdmin()
  return (
    <div className="">
      <MenuAdmin nameuser={name} />
      <AdminPage id={sub} />
    </div>
  )
}
