import Carousel from '@/app/components/carousel'
import CarouselUnidade from '@/app/components/carouselunidade'
import Image from 'next/image'
import ContactForm from '../../components/contato'
import Link from 'next/link'

export default function HomePage() {
  const slides = [
    '/COL0001_Mascote_02.png',
    '/COL0001_Mascote_CMYK_01 OUTRA.jpg',
    '/Coliseum Sport Arena_LM12.png',
    '/9000164-bandeira-de-bola-com-campo-de-futebol-verde-vetor.jpg',
  ]
  return (
    <div>
      <main className="">
        <section id="home" className="pt-16 bg-white ">
          <Carousel slides={slides} />
        </section>

        <section id="nossa-unidade" className="pt-16 bg-zinc-900 ">
          <div className="grid pb-4 grid-cols-1 md:grid-cols-2 md:h-screen text-white">
            <div className="px-4">
              <h1 className="text-4xl font-alt">Nossa Unidade</h1>
              <p className="mt-4 text-justify">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
              <p className="mt-4 text-justify">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting.
              </p>
              <p className="mt-4 text-justify">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting.
              </p>
              <p className="mt-4 text-justify">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting.
              </p>
            </div>
            <div className="h-80  md:h-[500px] md:w-full md:mt-2  border-2 border-zinc-50 rounded-md">
              <CarouselUnidade slides={slides} />
            </div>
          </div>
        </section>

        <section id="agendamento" className="pt-16 bg-yellow-300 ">
          <div className="flex flex-col h-screen  md:h-screen items-center focus:cursor-pointer">
            <div className="">
              <h1 className="text-4xl font-alt text-center">Agendamento</h1>
              <p className="mt-4 text-justify px-4">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book.
              </p>
            </div>
            <Image
              src={'/Schedule-amico 1.png'}
              width={500}
              height={500}
              quality={100}
              alt={''}
            />
            <Link
              href="/agenda"
              className="bg-black flex w-80 rounded-lg justify-center items-center p-3 mt-10 text-white hover:cursor-pointer hover:scale-125 transition-transform duration-300"
            >
              <span className=" font-alt text-xl">AGENDAR AQUI </span>
            </Link>
          </div>
        </section>

        <section id="contato" className="pt-16 bg-zinc-100 ">
          <div className="h-screen px-2">
            <h1 className="text-4xl font-bold">Contato</h1>
            <p className="mt-4">Informações de contato.</p>
            <div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
