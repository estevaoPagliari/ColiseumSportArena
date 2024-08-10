'use client'
import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { api } from '@/api/api'
import { alterarhorario } from '@/api/horario/horario'

// Definindo a interface para os dados do formulário
interface FormData {
  horarioAbertura: string
  horarioFechamento: string
  horarioAberturasabado: string
  horarioFechamentosabado: string
  estabelecimentoId: number
}

export default function ConfigAdmin({ id }: { id: string }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>()

  const [isLoading, setIsLoading] = useState(false)
  const [messageError, setMessageError] = useState('')
  const [isEditing, setIsEditing] = useState(false) // Estado para controlar o modo de edição

  // Função para buscar horários e preencher o formulário
  useEffect(() => {
    async function fetchHorario() {
      try {
        const response = await api.get(`horariofuncionamento/${id}`)
        const data = response.data
        console.log(response.data)
        setValue('horarioAbertura', data[0]?.horarioAbertura)
        setValue('horarioFechamento', data[0]?.horarioFechamento)
        setValue('horarioAberturasabado', data[0]?.horarioAberturasabado)
        setValue('horarioFechamentosabado', data[0]?.horarioFechamentosabado)
      } catch (error) {
        console.error('Erro ao buscar horários:', error)
        setMessageError('Erro ao buscar horários.')
      }
    }
    fetchHorario()
  }, [id, setValue])

  async function onSubmit(data: FormData): Promise<void> {
    setIsLoading(true)
    setMessageError('')
    const idNumber = parseInt(id, 10)
    try {
      const response = await alterarhorario(
        idNumber,
        data.horarioAbertura,
        data.horarioFechamento,
        data.horarioAberturasabado,
        data.horarioFechamentosabado,
      )
      if (response && response.status === 200) {
        setMessageError('Horário atualizado com sucesso!')
        window.location.reload() // Recarregar a página
      } else {
        window.location.reload()
      }
    } catch (error) {
      console.error(error)
      setMessageError('Ocorreu um erro ao atualizar o horário.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-2xl">
        <div className="flex flex-col justify-center items-center mb-6">
          <div className="text-2xl font-alt">Alteração de Horário</div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 font-sans"
        >
          <div className="flex flex-row gap-2 items-center shadow-md">
            <span className="text-xl text-zinc-500 font-alt ml-2">
              Horário de Abertura
            </span>
          </div>
          <input
            type="time"
            placeholder="Digite o horário de abertura"
            className="w-full p-2 font-medium rounded-sm"
            {...register('horarioAbertura', { required: 'Campo obrigatório' })}
            disabled={!isEditing} // Desabilita o campo se não estiver editando
          />
          {errors.horarioAbertura && (
            <span className="text-red-500">
              {errors.horarioAbertura?.message}
            </span>
          )}

          <div className="flex flex-row gap-2 items-center shadow-md">
            <span className="text-xl text-zinc-500 font-alt ml-2">
              Horário de Fechamento
            </span>
          </div>
          <input
            type="time"
            placeholder="Digite o horário de fechamento"
            className="w-full p-2 font-medium rounded-sm"
            {...register('horarioFechamento', {
              required: 'Campo obrigatório',
            })}
            disabled={!isEditing} // Desabilita o campo se não estiver editando
          />
          {errors.horarioFechamento && (
            <span className="text-red-500">
              {errors.horarioFechamento?.message}
            </span>
          )}

          <div className="flex flex-row gap-2 items-center shadow-md">
            <span className="text-xl text-zinc-500 font-alt ml-2">
              Horário de Abertura Sábado
            </span>
          </div>
          <input
            type="time"
            placeholder="Digite o horário de abertura no sábado"
            className="w-full p-2 font-medium rounded-sm"
            {...register('horarioAberturasabado', {
              required: 'Campo obrigatório',
            })}
            disabled={!isEditing} // Desabilita o campo se não estiver editando
          />
          {errors.horarioAberturasabado && (
            <span className="text-red-500">
              {errors.horarioAberturasabado?.message}
            </span>
          )}

          <div className="flex flex-row gap-2 items-center shadow-md">
            <span className="text-xl text-zinc-500 font-alt ml-2">
              Horário de Fechamento Sábado
            </span>
          </div>
          <input
            type="time"
            placeholder="Digite o horário de fechamento no sábado"
            className="w-full p-2 font-medium rounded-sm"
            {...register('horarioFechamentosabado', {
              required: 'Campo obrigatório',
            })}
            disabled={!isEditing} // Desabilita o campo se não estiver editando
          />
          {errors.horarioFechamentosabado && (
            <span className="text-red-500">
              {errors.horarioFechamentosabado?.message}
            </span>
          )}

          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)} // Alterna entre editar e visualizar
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            {isEditing ? 'Cancelar Edição' : 'Editar'}
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded-md mt-2"
            disabled={isLoading}
          >
            {isLoading ? 'Atualizando...' : 'Atualizar'}
          </button>
          {messageError && (
            <div className="text-red-500 bg-red-100 font-medium mt-2">
              {messageError}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
