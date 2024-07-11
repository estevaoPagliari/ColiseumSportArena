import { api } from '@/api/api'
export async function BuscarHorario(userId: string) {
  try {
    const response = await api.get(`/horariofuncionamento/${userId}`)
    return (await response).data
  } catch (error) {
    console.error('Erro na solicitação GET:', error)
  }
}
