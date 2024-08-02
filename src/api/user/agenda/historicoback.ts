import { api } from '@/api/api'

export async function BuscarHistorico() {
  try {
    const response = await api.post('/agendaservicopost', {})
    return response.data
  } catch (error) {
    console.error('Status do erro:', error)
    return false
  }
}

export async function BuscarHistoricoCliente({ id }: { id: number }) {
  try {
    const response = await api.post('/agendaservicopostcliente', {
      id,
    })
    return response.data
  } catch (error) {
    console.error('Status do erro:', error)
    return false
  }
}
