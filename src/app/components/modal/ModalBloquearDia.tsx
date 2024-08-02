import ButtonBloquearDia from '../button/buttonblockagendadia'

interface ModalInter {
  isVisible: boolean
  dia: number | null
  mes: number | null
  ano: number | null
  estabelecimentoId: string
  tiposervico: number
  recursoId1: number
  recursoId2: number
  clienteid: number

  onClose: () => void
  onAppointmentCancelled: () => void
}

export function ModalBloquearDia({
  isVisible,
  onClose,
  dia,
  mes,
  ano,
  estabelecimentoId,
  tiposervico,
  recursoId2,
  recursoId1,
  clienteid,
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
            <span className="text-xl font-alt">Atenção</span>
          </div>
          <div className="flex flex-col w-full md:justify-center items-center md:items-start ">
            <span>
              Data: {dia}/{mes}/{ano}
            </span>

            <ButtonBloquearDia
              dia={dia}
              mes={mes}
              ano={ano}
              estabelecimentoId={estabelecimentoId}
              tipoServicoId={tiposervico}
              clienteId={clienteid}
              recursoId={recursoId1}
              recursoId2={recursoId2}
              onCancel={onClose}
              onAppointmentCancelled={onAppointmentCancelled}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
