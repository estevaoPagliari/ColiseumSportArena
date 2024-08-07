import { api } from '../api'

export async function buscarcliente(id: string) {
  try {
    const response = await api.get(`/usercliente/${id}`)
    return response.data
  } catch (error) {
    console.error('Status do erro:', error)
    return false
  }
}

export async function alterarsenha(id: string, senha: string) {
  try {
    const response = await api.patch(`/usercliente/${id}`, { senha })
    return response.data
  } catch (error) {
    console.error('Status do erro:', error)
    return false
  }
}

export async function buscarclientetotal() {
  try {
    const response = await api.get('/usercliente')
    return response.data
  } catch (error) {
    console.error('Status do erro:', error)
    return false
  }
}

export async function alterarhalitado(cpf: string, habilitado: boolean) {
  try {
    const response = await api.patch(`/userclientehablitada/${cpf}`, {
      habilitado,
    })
    return response.data
  } catch (error) {
    console.error('Status do erro:', error)
    return false
  }
}
