'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

interface HorarioSelecionado {
  dia: number
  mes: number
  ano: number
  horario: string
  recursoId: number
}

interface CarrinhoDeComprasProps {
  selectedHorarios: HorarioSelecionado[]
  onRemove: (horario: HorarioSelecionado) => void
}

export function CarrinhoDeCompras({
  selectedHorarios,
  onRemove,
}: CarrinhoDeComprasProps) {
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // console.log(selectedHorarios)
    setMounted(true)
    if (selectedHorarios.length > 0) {
      setIsOpen(true)
    }
  }, [selectedHorarios])

  const handleSolicitarReserva = () => {
    if (!mounted) return

    const token = true // ou a forma como você está armazenando o token

    const expires = new Date()
    expires.setTime(expires.getTime() + 60 * 60 * 1000) // 5 minutos em milissegundos
    Cookies.set('selectedHorarios', JSON.stringify(selectedHorarios), {
      expires,
    })
    if (token) {
      // Armazena os horários selecionados no localStorage
      // Redireciona para a página de login
      router.push('/reserva')
    } else {
      // Prossegue para a página de reserva
      router.push('/login')
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-16 right-0 p-4 bg-blue-600 text-white rounded-full md:w-40 font-sans"
      >
        {isOpen ? 'Fechar Carrinho' : 'Abrir Carrinho'}
      </button>

      <div
        className={`fixed bottom-0 right-0 w-full rounded-xl md:w-1/3 p-4 bg-white border-t border-gray-200 shadow-lg transition-transform transform ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <h3 className="font-alt text-xl">Horários Selecionados</h3>
        {selectedHorarios.length === 0 ? (
          <p>Nenhum horário selecionado</p>
        ) : (
          selectedHorarios.map((horario, index) => (
            <div
              key={index}
              className="mt-2 flex justify-between items-center font-sans"
            >
              <div>
                <p>{`Horário: ${horario.horario}`}</p>
              </div>
              <button
                onClick={() => onRemove(horario)}
                className="text-black text-lg rounded bg-red-600 p-2 font-semibold hover:bg-red-500"
              >
                Remover
              </button>
            </div>
          ))
        )}
        {selectedHorarios.length > 0 && (
          <button
            onClick={handleSolicitarReserva}
            className="mt-4 p-2 bg-blue-600 text-white rounded-md w-full font-sans"
          >
            Solicitar Reserva
          </button>
        )}
      </div>
    </>
  )
}
