import { api } from '../api'

export async function DeletarReserva({ idagenda }: { idagenda: string }) {
  try {
    const response = await api.delete(`/agendaservicoclient/${idagenda}`)

    return {
      status: response.status,
      data: response.data,
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      // Se houver resposta de erro do servidor, retorna apenas o status e a mensagem de erro
      return {
        status: error.response.status,
        message: error.response.data.message,
      }
    } else {
      // Erro durante a requisição, retorna status 500 e uma mensagem genérica
      return {
        status: 500,
        message: 'Erro ao criar usuário.',
      }
    }
  }
}
