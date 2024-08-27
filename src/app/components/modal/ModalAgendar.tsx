'use client'
import { buscarclientegeral } from '@/api/cliente/buscarcliente'
import { useEffect, useState } from 'react'
import { userCliente } from '@/api/interface/interUserCliente'
import { CriarAgendamentoNormal } from '@/api/cliente/criar-agendamento'

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

export function ModalAgendar({
  isVisible,
  onClose,
  dia,
  mes,
  ano,
  horario,
  idrecurso,
  onAppointmentCancelled,
}: ModalInter) {
  if (!isVisible) {
    return null
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [clientlist, setClientList] = useState<userCliente[]>([])
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectedClient, setSelectedClient] = useState<number | null>(null)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [cadastroSucesso, setCadastroSucesso] = useState(false)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [erroCadastro, setErroCadastro] = useState('')
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isAgendando, setIsAgendando] = useState(false)

  async function buscarclient() {
    try {
      const usuario = await buscarclientegeral()
      setClientList(usuario)
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error)
    }
  }

  async function criarAgendamento() {
    if (selectedClient === null) {
      setErroCadastro('Por favor, selecione um cliente.')
      return
    }

    setIsAgendando(true)
    try {
      const retorno = await CriarAgendamentoNormal(
        dia,
        mes,
        ano,
        horario,
        selectedClient, // Usando o cliente selecionado
        idrecurso,
      )

      if (retorno.status === 201) {
        console.log('Usuário criado com sucesso:', retorno.data)
        setCadastroSucesso(true)
        setErroCadastro('') // Limpa qualquer mensagem de erro existente
        onAppointmentCancelled() // Chamando a função para atualizar a lista de agendamentos
        onClose() // Chamando a função para fechar o modal
      } else {
        setCadastroSucesso(false)
        setErroCadastro(retorno.message)
      }
    } catch (error) {
      setCadastroSucesso(false)
      console.error('Erro ao criar usuário:', error)
      setErroCadastro('Erro ao criar usuário. Por favor, tente novamente.')
    } finally {
      setIsAgendando(false)
    }
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    buscarclient()
  }, [])

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

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
            <div className="flex flex-row text-center sm:text-left">
              <div className="p-2 font-sans text-xl">
                <span>Horário Vago</span>
              </div>
            </div>
            <div className="flex flex-row text-center sm:text-left rounded-md">
              <button className="font-sans ">
                <span>Cliente</span>
                <select
                  className="ml-2 p-2 border rounded-md"
                  value={selectedClient || ''}
                  onChange={(e) => setSelectedClient(Number(e.target.value))}
                >
                  <option value="">Selecione um cliente</option>
                  {clientlist.map((cliente) => (
                    <option key={cliente.id} value={cliente.id}>
                      {cliente.nome}
                    </option>
                  ))}
                </select>
              </button>
            </div>
          </div>
          <div>
            <button
              onClick={criarAgendamento}
              className="flex flex-col sm:flex-row justify-center items-center w-full gap-4 mt-4 bg-green-500 text-xl"
              disabled={isAgendando}
            >
              {isAgendando ? 'Agendando...' : 'Confirmar'}
            </button>
          </div>

          {erroCadastro && (
            <div className="text-red-500 mt-4 text-center bg-red-100">
              {erroCadastro}
            </div>
          )}

          {cadastroSucesso && (
            <div className="text-green-500 mt-4 text-center bg-green-100">
              Agendamento realizado com sucesso!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
