import { ReactNode } from 'react'
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamjuree,
} from 'next/font/google'
import { Header } from '../../components/header'

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
})
const baiJamjuree = BaiJamjuree({
  subsets: ['latin'],
  weight: '700',
  variable: '--font-Bai-Jamjuree',
})

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${roboto.variable} ${baiJamjuree.variable} bg-gray-200 text-black `}
    >
      <Header />

      <main className="">{children}</main>
    </div>
  )
}
