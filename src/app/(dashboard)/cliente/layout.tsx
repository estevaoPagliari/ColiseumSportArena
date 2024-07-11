import { ReactNode } from 'react'
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamjuree,
} from 'next/font/google'

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
    <div className={`${roboto.variable} ${baiJamjuree.variable}  text-black `}>
      <main className="">{children}</main>
    </div>
  )
}
