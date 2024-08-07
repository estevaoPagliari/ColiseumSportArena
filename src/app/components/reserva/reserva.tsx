'use client'
import { useState } from 'react'
import { CriarAgendamentoNormal } from '@/api/cliente/criar-agendamento'
import { HorarioSelecionado } from '@/api/reserva/reservacookie'
import { DeleteData } from '@/api/reserva/reservadeletecooket'
import { useRouter } from 'next/navigation'

export function ReservarPage({
  horarioSelecionado,
  idclient,
}: {
  horarioSelecionado: HorarioSelecionado
  idclient: string
}) {
  const [cadastroSucesso, setCadastroSucesso] = useState(false)
  const [erroCadastro, setErroCadastro] = useState('')
  const [isAgendando, setIsAgendando] = useState(false)
  const router = useRouter()

  async function criarAgendamento() {
    setIsAgendando(true)
    try {
      const { dia, mes, ano, horario, recursoId } = horarioSelecionado
      const newid = parseInt(idclient)
      console.log(horarioSelecionado, newid)
      const retorno = await CriarAgendamentoNormal(
        dia,
        mes,
        ano,
        horario,
        newid,
        recursoId,
      )

      if (retorno.status === 201) {
        console.log('Usuário criado com sucesso:', retorno.data)
        setCadastroSucesso(true)
        setErroCadastro('') // Limpa qualquer mensagem de erro existente
      } else {
        // Exibe mensagem de erro baseada no status e na mensagem retornada pelo servidor
        setCadastroSucesso(false)
        setErroCadastro(retorno.message)
      }

      // Após 3 segundos, redirecionar para a página /cliente
    } catch (error) {
      // Verificar se o erro é do tipo esperado
      setCadastroSucesso(false)
      console.error('Erro ao criar usuário:', error)
      setErroCadastro('Erro ao criar usuário. Por favor, tente novamente.')
    } finally {
      setIsAgendando(false)
    }
  }

  const logout = () => {
    DeleteData()
  }
  function voltarPage() {
    router.push('/cliente')
  }

  return (
    <div className="flex flex-col justify-center items-center pt-16">
      <span className="font-alt">Reserva Selecionada</span>
      {horarioSelecionado ? (
        <div className="flex flex-col w-96 justify-center gap-2 rounded-md shadow-md p-4 font-sans">
          <span>
            Data: {horarioSelecionado.dia} / {horarioSelecionado.mes} /{' '}
            {horarioSelecionado.ano}
          </span>
          <span>Horário: {horarioSelecionado.horario}</span>
          <span className="flex flex-row">
            {' '}
            Campo:
            {horarioSelecionado.recursoId === 1 ? (
              <div>
                <span> La Bomboneira</span>
              </div>
            ) : (
              <div>
                <span>Arena da Baixada</span>
              </div>
            )}
          </span>

          {cadastroSucesso && (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4"
              role="alert"
            >
              <strong className="font-bold">
                Cadastro realizado com sucesso!
                <button
                  className="flex flex-1 bg-green-700 justify-center items-center font-alt rounded-md mt-2 text-black px-2"
                  onClick={() => {
                    voltarPage()
                  }}
                >
                  Aperte aqui para voltar
                </button>
              </strong>
            </div>
          )}
          {erroCadastro && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
              role="alert"
            >
              <strong className="font-bold">{erroCadastro}</strong>
              <button
                className="flex flex-1 bg-red-700 justify-center items-center font-alt rounded-md mt-2 text-black px-2"
                onClick={() => {
                  voltarPage()
                }}
              >
                Aperte aqui para voltar
              </button>
            </div>
          )}
          <button
            className="flex flex-1 bg-blue-500 justify-center items-center font-alt rounded-xl mt-2"
            onClick={() => {
              criarAgendamento()
              logout()
            }}
          >
            {isAgendando ? 'Agendando...' : 'Confirmar'}
          </button>
        </div>
      ) : (
        <div className="flex bg-blue-500 w-80 h-80 text-center pt-16">
          <p>Você não tem nenhum agendamento para confirmar.</p>
        </div>
      )}
    </div>
  )
}
