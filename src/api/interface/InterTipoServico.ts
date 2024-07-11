import { userEstabelecimento } from './InterUserEstabelecimento'
import { Agenda } from './InterAgenda'

export interface tipoServico {
  id: number // Int
  nome: string // String
  tempoServico: number // Int
  UserEstabelecimentoId: number // Int
  UserEstabelecimento: userEstabelecimento[] // Relacionamento com UserEstabelecimento
  Agenda: Agenda[] // Array de Agenda
}

export interface TipoServicoNew {
  id: number // Int
  nome: string // String
  tempoServico: number // Int
  UserEstabelecimentoId: number // Int
}
