import { useState } from 'react'
import { BarLoader } from 'react-spinners'
import { DeletarReserva } from '@/api/cliente/deletarreserva'

export default function ButtonCancelarAgendamentoClient({
  idagenda,
  onCancel,
  onAppointmentCancelled,
}: {
  idagenda: string
  onCancel: () => void
  onAppointmentCancelled: () => void
}) {
  const [isCancelling, setIsCancelling] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [messageerro, setMessageerro] = useState('')
  const [cancelSuccess, setCancelSuccess] = useState(false)

  async function handleCancelarAgendamento() {
    try {
      setIsCancelling(true)
      const cancel = await DeletarReserva({ idagenda })
      if (cancel.status === 200) {
        setCancelSuccess(true)
        onAppointmentCancelled() // Chamando a função para atualizar a lista de agendamentos
        setMessageerro('')
        onCancel() // Chamando a função para fechar o modal
      } else {
        // Exibe mensagem de erro baseada no status e na mensagem retornada pelo servidor
        setCancelSuccess(false)
        setMessageerro(cancel.message)
      }
      setIsCancelling(false)
      return cancel
    } catch (error) {
      setCancelSuccess(false)
      console.error('Erro ao cancelar agendamento:', error)
      setIsCancelling(false)
    }
  }

  return (
    <div>
      {showConfirmation ? (
        <div className=" flex-row">
          <div>
            <span>Deseja mesmo cancelar este agendamento?</span>
          </div>
          <div className="flex  items-center justify-between">
            <button
              className="w-32 bg-red-300 rounded-md  hover:bg-red-600 hover:scale-105 duration-300"
              onClick={handleCancelarAgendamento}
            >
              Sim
            </button>

            <button
              className="w-32 bg-blue-300 rounded-md hover:bg-blue-600 hover:scale-105 duration-300"
              onClick={() => setShowConfirmation(false)}
            >
              Não
            </button>
          </div>
        </div>
      ) : (
        <button
          className="font-semibold w-80 bg-red-500 rounded-md hover:scale-110 hover:bg-red-600 duration-500"
          onClick={() => setShowConfirmation(true)}
        >
          <span>Cancelar</span>
        </button>
      )}
      {isCancelling && (
        <div className="flex justify-center items-center p-2">
          <BarLoader color="#A1D7E2" loading={true} />
        </div>
      )}
      {cancelSuccess && (
        <div className="flex flex-1 h-56">
          <button onClick={() => setCancelSuccess(false)}>Fechar</button>
        </div>
      )}
      {messageerro && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
          role="alert"
        >
          <strong className="font-bold">{messageerro}</strong>
        </div>
      )}
    </div>
  )
}
