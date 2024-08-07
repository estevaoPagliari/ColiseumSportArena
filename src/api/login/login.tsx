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

export async function RecuperarSenha(email: string) {
  try {
    const response = await api.post('/recuperarsenha', {
      email,
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
        message: 'Erro ao criar usuário.',
      }
    }
  }
}
