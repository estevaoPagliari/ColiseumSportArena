import { userEstabelecimento } from './InterUserEstabelecimento'

export interface HorarioFuncionamento {
  id: number // Int
  horarioAbertura: string // String
  horarioAlmocoInicio: string // String
  horarioAlmocoFim: string // String
  horarioFechamento: string // String
  estabelecimentoId: number // Int
  Estabelecimento: userEstabelecimento[] // Relacionamento com UserEstabelecimento
}
