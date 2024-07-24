import Image from 'next/image'
import Link from 'next/link'

export function FooterComponents() {
  return (
    <div className="p-3 bg-gray-800 text-white">
      <div className="grid grid-cols-1 md:grid-cols-9 gap-3">
        <div className="flex col-span-1 md:col-span-3 justify-center items-center">
          <Image
            src={'/Coliseum Sport Arena_LM12.png'}
            alt={'Coliseum Sport Arena Logo'}
            width={200}
            height={200}
            quality={50}
            className="w-32 h-32 md:w-48 md:h-48"
          />
        </div>
        <div className="col-span-1 md:col-span-6">
          <div className="flex flex-col text-white space-y-3">
            <div className="border-b border-gray-100">
              <span className="font-alt">Informações</span>
            </div>
            <div className="text-sm space-y-2 gap-2">
              <div className="flex flex-1 gap-2">
                <span>Cidade: PORTO FERREIRA</span>
                <span>Endereço: VIA SYRIO IGNATIOS nº: 1894</span>
                <span>Bairro: Chacaras Aeroporto </span>
                <span>Número: 1894</span>
                <span>CEP: 13 662 086</span>
              </div>
              <div>
                <span>CNPJ: 27.623.067/0001-39 </span>
              </div>
              <div className="space-y-1">
                <span>Telefone: (19)-998539697 </span>
                <span>E-mail: sportarenacoliseum@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center text-black bg-zinc-100 p-2 mt-3">
        <Link href={''}>
          <Image
            className="p-2"
            src={'/devnex.png'}
            alt={'Devnex Logo'}
            width={50}
            height={50}
            quality={30}
          />
        </Link>
      </div>
    </div>
  )
}
