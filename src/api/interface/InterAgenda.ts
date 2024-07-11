import { tipoServico } from './InterTipoServico'
import { userEstabelecimento } from './InterUserEstabelecimento'
import { userCliente } from './interUserCliente'
import { Recurso } from './InterRecurso'
export interface Agenda {
  id: number // Int
  dia: number // Int
  mes: number // Int
  ano: number // Int
  horario: string // String
  tipoServicoId: number // Int
  estabelecimentoId: number // Int
  clienteId: number // Int
  recursoId: number // Int
  TipoServico: tipoServico[] // Relacionamento com TipoServico
  Estabelecimento: userEstabelecimento[] // Relacionamento com UserEstabelecimento
  Cliente: userCliente[] // Relacionamento com UserCliente
  Recurso: Recurso[] // Relacionamento com Recurso
}

export interface AgendaNew {
  id: string
  dia: number
  mes: number
  ano: number
  horario: string
  tipoServicoId: number
  estabelecimentoId: number
  clienteId: number
  recursoId: number
  TipoServico: {
    id: number
    nome: string
    tempoServico: string
    valorServico: number
    UserEstabelecimentoId: number
  }
  Estabelecimento: {
    id: number
    nome: string
    email: string
    senha: string
    cpf: number
    telefone: number
    createdAt: string
    updatedAt: string
  }
  Recurso: {
    id: number
    nome: string
    estabelecimentoId: number
  }
  Cliente: {
    id: number
    nome: string
    email: string
    senha: string
    cpf: number
    telefone: number
    createdAt: string
    updatedAt: string
  }
}
