import { api } from '../api'

export async function alterarhorario(
  id: number,
  horarioAbertura: string,
  horarioFechamento: string,
  horarioAberturasabado: string,
  horarioFechamentosabado: string,
) {
  try {
    const response = await api.patch('/horariofuncionamentoalterar', {
      id,
      horarioAbertura,
      horarioFechamento,
      horarioAberturasabado,
      horarioFechamentosabado,
    })
    return response.data
  } catch (error) {
    console.error('Status do erro:', error)
    return false
  }
}
