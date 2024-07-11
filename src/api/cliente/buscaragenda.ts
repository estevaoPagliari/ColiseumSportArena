import { api } from '../api'

export async function buscaragendacliente({ id }: { id: string }) {
  try {
    const response = await api.post('/buscarreservasativas', {
      id,
    })
    return response.data
  } catch (error) {
    console.error('Status do erro:', error)
    return false
  }
}
