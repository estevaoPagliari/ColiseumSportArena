import { api } from '../api'
export async function EnviarMsgCliente(clienteId: number | null, cSid: string) {
  try {
    const response = await api.post('/twilioid', {
      clienteId,
      cSid,
    })
    return response.data
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error)
    throw new Error('Erro ao enviar mensagem.')
  }
}
