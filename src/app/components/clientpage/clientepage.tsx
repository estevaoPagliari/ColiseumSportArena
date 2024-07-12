'use client'
import { buscaragendacliente } from '@/api/cliente/buscaragenda'
import { AgendaNew } from '@/api/interface/InterAgenda'
import { useEffect, useState } from 'react'
import { ModalCancel } from '../modal/ModalCancel'
import { BarLoader } from 'react-spinners'

export function ClientPage({ id }: { id: string }) {
  const [agenda, setAgenda] = useState<AgendaNew[]>([])
  const [loading, setLoading] = useState(true)

  async function BuscarAgendaCliente() {
    try {
      const response = await buscaragendacliente({ id })
      setAgenda(response)
    } catch (error) {
      console.error('Erro ao buscar agenda do cliente:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    BuscarAgendaCliente()
  }, [])

  async function ReloadPage() {
    await BuscarAgendaCliente()
  }

  const [isModalVisible, setModalVisible] = useState<Array<boolean>>(
    agenda.map(() => false),
  )

  const handleOpenModal = (index: number) => {
    setModalVisible((prev) => {
      const newState = [...prev]
      newState[index] = true
      return newState
    })
  }
  const handleCloseModal = (index: number) => {
    setModalVisible((prev) => {
      const newState = [...prev]
      newState[index] = false
      return newState
    })
  }

  return (
    <div className="flex flex-1 w-full p-2">
      <div className="flex flex-col shadow-md md:w-[450px] bg-zinc-100 p-4 h-96 overflow-x-auto justify-start items-center rounded-md">
        <div className="flex py-1 font-alt">
          <h1>Reserva Atuais</h1>
        </div>
        {loading ? (
          <div className="flex flex-1 justify-center items-center h-full">
            <BarLoader color="#A1D7E2" loading={true} />
          </div>
        ) : (
          agenda.map((agenda, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 font-sans p-1 rounded-sm bg-zinc-200/50 shadow-sm mt-1 "
            >
              <div className="flex flex-row gap-2">
                <div className="flex flex-col">
                  <span>
                    Data: {agenda.dia}/{agenda.mes}/{agenda.ano}
                  </span>
                  <span>Horário: {agenda.horario}</span>
                </div>
                <div className="flex flex-col">
                  <span>Recurso: {agenda.Recurso.nome}</span>
                  <span>Tempo: {agenda.TipoServico.tempoServico}m</span>
                </div>
                <div className="flex flex-row bg-red-600 justify-center items-center rounded-md font-alt px-1">
                  <button onClick={() => handleOpenModal(index)}>
                    Cancelar Reserva
                  </button>
                  <ModalCancel
                    isVisible={isModalVisible[index]}
                    onClose={() => handleCloseModal(index)}
                    idagenda={agenda.id}
                    dia={agenda.dia}
                    mes={agenda.mes}
                    ano={agenda.ano}
                    nomeRecurso={agenda.Recurso.nome}
                    tempoServico={agenda.TipoServico.tempoServico}
                    horario={agenda.horario}
                    onAppointmentCancelled={() => ReloadPage()}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
