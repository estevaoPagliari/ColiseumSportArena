import { api } from '../api'
import { setCookie } from 'nookies'

export async function handleOAuthCode(email: string, senha: string) {
  try {
    const response = await api.post('/login', {
      email,
      senha,
    })

    const { token } = response.data

    setCookie(null, 'tokenadmin', token, {
      maxAge: 60 * 60 * 24, // 1 dia em segundos
      path: '/', // caminho do cookie (no caso, o caminho raiz)
    })

    return true
  } catch (error) {
    console.error('Status do erro:', error)
    return false
  }
}

export async function handleOAuthCodeClient(email: string, senha: string) {
  try {
    const response = await api.post('/loginclient', {
      email,
      senha,
    })

    const { token } = response.data

    setCookie(null, 'tokenclient', token, {
      maxAge: 60 * 60 * 24, // 1 dia em segundos
      path: '/', // caminho do cookie (no caso, o caminho raiz)
    })

    return true
  } catch (error) {
    console.error('Status do erro:', error)
    return false
  }
}
