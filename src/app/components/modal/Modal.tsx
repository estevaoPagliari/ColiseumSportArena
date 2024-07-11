import Link from 'next/link'
import ButtonCancelarAgendamento from '../button/buttoncancelagendaadmin'
import ButtonBloquearData from '../button/buttonblockagenda'

interface ModalInter {
  isVisible: boolean
  nome: string
  servico: string
  dia: number | null
  mes: number | null
  ano: number | null
  tempoServico: string
  telefone: number
  horario: string
  email: string
  nomeRecurso: string
  idrecurso: number
  idagenda: string
  onClose: () => void
  onAppointmentCancelled: () => void
}

export function Modal({
  isVisible,
  onClose,
  nome,
  servico,
  dia,
  mes,
  ano,
  tempoServico,
  horario,
  telefone,
  email,
  idagenda,
  idrecurso,
  nomeRecurso,
  onAppointmentCancelled,
}: ModalInter) {
  if (!isVisible) {
    return null
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-white text-black p-6 rounded-md shadow-lg w-full max-w-2xl sm:w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2">
        <button className="text-black text-xl self-end" onClick={onClose}>
          Fechar
        </button>
        <div className="mt-2">
          <div className="flex flex-col sm:flex-row bg-zinc-100/85 gap-4 items-center justify-between font-alt text-2xl p-4">
            <span>
              Data: {dia}/{mes}/{ano}
            </span>
            <p>Horário: {horario}</p>
          </div>

          {nome === 'Horário vago' ? (
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
              <div className="flex flex-row text-center sm:text-left">
                <div className="p-2 font-sans text-2xl">
                  <span>Horário Vago</span>
                </div>
              </div>
              <div className="flex flex-row text-center sm:text-left bg-blue-600 rounded-md">
                <div className="p-2 font-sans text-2xl ">
                  <Link href="/">Agendar</Link>
                </div>
              </div>
              <ButtonBloquearData
                dia={dia}
                ano={ano}
                horario={horario}
                idrecurso={idrecurso}
                mes={mes}
                onCancel={onClose}
                onAppointmentCancelled={onAppointmentCancelled}
              />
            </div>
          ) : (
            <div className="mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
                <div className="p-2 ">
                  <div className="flex justify-start items-center p-2">
                    Nome Cliente: {nome}
                  </div>
                  <div className="flex justify-start items-center p-2">
                    Telefone: {telefone}
                  </div>
                  <div className="flex justify-start items-center p-2">
                    Email: {email}
                  </div>
                </div>
                <div className="p-2">
                  <div className="flex justify-start items-center p-2">
                    Serviço: {servico}
                  </div>
                  <div className="flex justify-start items-center p-2">
                    Tempo de Serviço: {tempoServico} minutos
                  </div>
                  <div className="flex justify-start items-center p-2">
                    Recurso: {nomeRecurso}
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center gap-5 mt-4">
                <ButtonCancelarAgendamento
                  idagenda={idagenda}
                  onCancel={onClose}
                  onAppointmentCancelled={onAppointmentCancelled}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
