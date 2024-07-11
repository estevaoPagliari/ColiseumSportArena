import { userEstabelecimento } from './InterUserEstabelecimento'
import { Agenda } from './InterAgenda'

export interface Recurso {
  id: number // Int
  nome: string // String
  estabelecimentoId: number // Int
  Estabelecimento: userEstabelecimento[] // Relacionamento com UserEstabelecimento
  Agenda: Agenda[] // Array de Agenda
}
