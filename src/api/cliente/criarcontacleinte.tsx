import { api } from '../api'

interface FormData {
  email: string
  nome: string
  senha: string
  confirmacaoSenha: string
  cpf: string
  telefone: string
  endereco: {
    estado: string
    cidade: string
    rua: string
    numero: string
    complemento?: string
    cep: string
  }
}

export async function criarcontacliente(data: FormData) {
  try {
    const { email, nome, senha, cpf, telefone, endereco } = data

    const response = await api.post('/usercliente', {
      email,
      nome,
      senha,
      cpf,
      telefone,
      endereco,
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
