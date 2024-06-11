import Carousel from '@/app/components/carousel'
import CarouselUnidade from '@/app/components/carouselunidade'
import Image from 'next/image'

export default function Home() {
  const slides = [
    '/COL0001_Mascote_02.png',
    '/COL0001_Mascote_CMYK_01 OUTRA.jpg',
    '/Coliseum Sport Arena_LM12.png',
  ]
  return (
    <div>
      <main className="">
        <section id="home" className="pt-16 bg-white ">
          <Carousel slides={slides} />
        </section>

        <section id="nossa-unidade" className="pt-16 bg-zinc-900 ">
          <div className="grid grid-cols-1  md:grid-cols-2 md:h-screen text-white">
            <div className="p-2">
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
            </div>
            <div className="h-80 md:h-[500px] p-2">
              <CarouselUnidade slides={slides} />
            </div>
          </div>
        </section>

        <section id="agendamento" className="pt-16 bg-yellow-300 ">
          <div className="flex flex-col justify-center md:h-screen items-center focus:cursor-pointer">
            <div className="text-center">
              <h1 className="text-4xl font-alt">Agendamento</h1>
              <p className="mt-4">
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
          </div>
        </section>

        <section id="contato" className="pt-16 bg-zinc-100 ">
          <div className="md:h-screen">
            <h1 className="text-4xl font-bold">Contato</h1>
            <p className="mt-4">Informações de contato.</p>
          </div>
        </section>
      </main>
    </div>
  )
}
