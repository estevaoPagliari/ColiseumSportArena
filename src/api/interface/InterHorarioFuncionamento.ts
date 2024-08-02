import { userEstabelecimento } from './InterUserEstabelecimento'

export interface HorarioFuncionamento {
  id: number // Int
  horarioAbertura: string // String
  horarioAlmocoInicio: string // String
  horarioAlmocoFim: string // String
  horarioFechamento: string // String
  horarioAberturasabado: string // Correspondente ao String no Prisma
  horarioAlmocosabado: string // Correspondente ao String no Prisma
  horarioFechamentosabado: string // Correspondente ao String no Prisma
  estabelecimentoId: number // Int
  Estabelecimento: userEstabelecimento[] // Relacionamento com UserEstabelecimento
}
