import { api } from '../api'
export async function CriarAgendamentoNormal(
  dia: number | null, // Validar se é um email válido
  mes: number | null,
  ano: number | null,
  horario: string,
  clienteId: number | null,
  recursoId: number | null,
) {
  try {
    console.log('teste')

    const response = await api.post('/agendaservico', {
      dia,
      mes,
      ano,
      horario,
      estabelecimentoId: 1,
      tipoServicoId: 1,
      clienteId,
      recursoId,
    })
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
        message: 'Erro ao criar agenda',
      }
    }
  }
}
