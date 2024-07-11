import { ReactNode } from 'react'
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamjuree,
} from 'next/font/google'

import { MenuCliente } from '@/app/components/menu/menucliente'
import { getUser } from '@/lib/auth'
const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
})
const baiJamjuree = BaiJamjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-Bai-Jamjuree',
})

export default function AgendamentoLayout({
  children,
}: {
  children: ReactNode
}) {
  const { sub, name } = getUser()
  console.log('getUser executado', { sub, name }) // Log para verificar a execução de getUser
  return (
    <div
      className={`${roboto.variable} ${baiJamjuree.variable} bg-gray-200 text-black `}
    >
      <MenuCliente nameuser={name} />
      <main className="">{children}</main>
    </div>
  )
}
