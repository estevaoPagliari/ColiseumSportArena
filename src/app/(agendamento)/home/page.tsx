import Carousel from '@/app/components/carousel'
import CarouselUnidade from '@/app/components/carouselunidade'
import Image from 'next/image'
import ContactForm from '../../components/contato'
import Link from 'next/link'
import { FooterComponents } from '@/app/components/footer/footer'

export default function HomePage() {
  const slides = [
    '/COL0001_Mascote_02.png',
    '/COL0001_Mascote_CMYK_01 OUTRA.jpg',
    '/Coliseum Sport Arena_LM12.png',
    '/9000164-bandeira-de-bola-com-campo-de-futebol-verde-vetor.jpg',
  ]

  const slide2 = [
    '/fotos/aee0624d-db05-4ba0-9360-06ffd3f4f970.jpg',
    '/fotos/e2f38e57-13f1-4c81-a127-b540020a55fd.jpg',
    '/fotos/IMG_8199.jpg',
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
              <p className="mt-4 text-justify font-sans">
                Conheça o Coliseum Sport Arena, onde diversão, esporte e
                confraternização se encontram em um só lugar! Oferecemos a
                estrutura ideal para você, seus amigos e sua família
                aproveitarem momentos inesquecíveis. Conheça nossas instalações
                e prepare-se para viver experiências únicas!
              </p>
              <h3 className="text-4xl font-alt">O que oferecemos:</h3>
              <p className="mt-4 text-justify font-sans">
                ⚽ Dois Campos de Futebol: Nossos campos são perfeitos para
                jogos entre amigos, torneios e eventos esportivos. Com grama
                sintética de alta qualidade, você desfrutará de partidas
                emocionantes e confortáveis, seja dia ou noite.
              </p>
              <p className="mt-4 text-justify font-sans">
                🏖️ Quadra de Beach Tênis na Areia: Sinta a vibração do esporte
                de praia em nossa quadra de areia. Ideal para praticar o beach
                tênis com os amigos, melhorar suas habilidades e se divertir sob
                o sol
              </p>
              <p className="mt-4 text-justify font-sans">
                🔥 Área de Churrasqueira: Após uma partida acirrada ou
                simplesmente para um encontro social, nossa área de
                churrasqueira é o lugar perfeito para relaxar e saborear um
                delicioso churrasco. Com espaço amplo e confortável, você terá
                momentos agradáveis e descontraídos.
              </p>
            </div>
            <div className="h-64  md:h-[500px] md:w-full md:mt-2  border-2 border-zinc-50 rounded-md">
              <CarouselUnidade slides={slide2} />
            </div>
          </div>
        </section>

        <section id="agendamento" className="pt-16 bg-yellow-300 ">
          <div className="flex flex-col h-screen  md:h-screen items-center focus:cursor-pointer">
            <div className="">
              <h1 className="text-4xl font-alt text-center">Agendamento</h1>
              <p className="mt-4 text-justify px-4 font-sans ">
                Agende Online no Coliseum Sport Arena: Rápido, Fácil e Prático!
                Quer garantir o seu espaço no melhor centro esportivo da região?
                No Coliseum Sport Arena agora, você pode reservar nossos campos
                de futebol, a quadra de beach tênis ou a área de churrasqueira
                diretamente pelo nosso site!
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

        <section id="footer" className="pt-5 bg-zinc-900 ">
          <div className="h-auto px-2">
            <div>
              <FooterComponents />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
