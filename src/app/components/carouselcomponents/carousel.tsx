'use client'
import Image from 'next/image'
import { useState } from 'react'
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from 'react-icons/bs'

interface CarouselProps {
  slides: string[]
}

const CarouselUnidades: React.FC<CarouselProps> = ({ slides }) => {
  const [current, setCurrent] = useState<number>(0)

  const previousSlide = (): void => {
    if (current === 0) setCurrent(slides.length - 1)
    else setCurrent(current - 1)
  }

  const nextSlide = (): void => {
    if (current === slides.length - 1) setCurrent(0)
    else setCurrent(current + 1)
  }

  return (
    <div className="overflow-hidden relative h-full w-full">
      <div
        className={`flex transition ease-out duration-40`}
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((s, index) => (
          <div key={index} className="relative h-screen w-full flex-shrink-0">
            <Image
              src={s}
              layout="fill"
              objectFit="contain"
              quality={100}
              alt={`slide-${index}`}
            />
          </div>
        ))}
      </div>

      <div className="absolute top-0 h-full w-full justify-between items-center flex text-white px-10 text-3xl">
        <button onClick={previousSlide}>
          <BsFillArrowLeftCircleFill className=" text-zinc-500 hover:text-zinc-950" />
        </button>
        <button onClick={nextSlide}>
          <BsFillArrowRightCircleFill className=" text-zinc-500 hover:text-zinc-950" />
        </button>
      </div>

      <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
        {slides.map((_, i) => (
          <div
            onClick={() => {
              setCurrent(i)
            }}
            key={'circle' + i}
            className={`rounded-full w-5 h-5 cursor-pointer  ${
              i === current ? 'bg-black' : 'bg-gray-500'
            }`}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default Carousel
