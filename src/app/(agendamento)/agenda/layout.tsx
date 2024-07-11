import { ReactNode } from 'react'
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamjuree,
} from 'next/font/google'
import { MenuAgenda } from '@/app/components/menu/menuagenda'
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
  return (
    <div
      className={`${roboto.variable} ${baiJamjuree.variable} bg-gray-200 text-black `}
    >
      <MenuAgenda />
      <main className="">{children}</main>
    </div>
  )
}
