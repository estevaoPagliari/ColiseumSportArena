import { useState } from 'react'
import { CriarAgendamento } from '@/api/user/agenda/agenda'
import { BarLoader } from 'react-spinners'

export default function ButtonBloquearData({
  dia,
  mes,
  ano,
  horario,
  idrecurso,
  onCancel,
  onAppointmentCancelled,
}: {
  dia: number | null
  mes: number | null
  ano: number | null
  horario: string
  idrecurso: number | null
  onCancel: () => void
  onAppointmentCancelled: () => void
}) {
  const [isCancelling, setIsCancelling] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [cancelSuccess, setCancelSuccess] = useState(false)

  async function BloquearDia() {
    try {
      setIsCancelling(true)
      const response = await CriarAgendamento(
        dia,
        mes,
        ano,
        horario,
        1,
        1,
        1,
        idrecurso,
      )

      setCancelSuccess(true)
      onAppointmentCancelled() // Chamando a função para atualizar a lista de agendamentos
      onCancel() // Chamando a função para fechar o modal

      setIsCancelling(false)
      return response
    } catch (error) {
      console.error('Erro ao cancelar agendamento:', error)
      setIsCancelling(false)
    }
  }

  return (
    <div>
      {showConfirmation ? (
        <div className=" flex-row">
          <div>
            <span>Deseja inativar dia?</span>
          </div>
          <div className="flex  items-center justify-between">
            <button
              className="w-32 bg-red-300 rounded-md  hover:bg-red-600 hover:scale-105 duration-300"
              onClick={BloquearDia}
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
          className="flex flex-col text-center sm:text-left bg-red-600 rounded-md"
          onClick={() => setShowConfirmation(true)}
        >
          <span className="p-2 font-sans text-2xl">Inativar Dia</span>
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
    </div>
  )
}
