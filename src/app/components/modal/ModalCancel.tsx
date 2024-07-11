import ButtonCancelarAgendamentoClient from '../button/buttondeleteagendaclient'

interface ModalInter {
  isVisible: boolean
  idagenda: string
  dia: number | null
  mes: number | null
  ano: number | null
  tempoServico: string
  nomeRecurso: string
  horario: string
  onClose: () => void
  onAppointmentCancelled: () => void
}

export function ModalCancel({
  isVisible,
  onClose,
  idagenda,
  dia,
  mes,
  ano,
  horario,
  tempoServico,
  nomeRecurso,
  onAppointmentCancelled,
}: ModalInter) {
  if (!isVisible) {
    return null
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-1"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-white text-black p-2 rounded-md shadow-lg w-full max-w-2xl sm:w-11/12 md:w-96">
        <button className="text-black text-xl self-end" onClick={onClose}>
          X
        </button>

        <div className="flex w-auto flex-col bg-zinc-100/85 gap-4 items-center justify-between font-sans p-4">
          <div className="flex flex-col w-full md:justify-start md:items-start ">
            <span className="text-xl font-alt">Reserva:</span>
          </div>
          <div className="flex flex-col w-full md:justify-start md:items-start ">
            <span>
              Data: {dia}/{mes}/{ano}
            </span>
            <span>Horário: {horario}</span>
            <span>Recurso: {nomeRecurso}</span>
            <span>Tempo de Serviço: {tempoServico}</span>
          </div>
          <ButtonCancelarAgendamentoClient
            idagenda={idagenda}
            onCancel={onClose}
            onAppointmentCancelled={onAppointmentCancelled}
          />
          <span className="text-sm">
            *Atenção: a reserva so pode ser cancelada com 2 dias de antecedência{' '}
          </span>
        </div>
      </div>
    </div>
  )
}
