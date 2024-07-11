import { tipoServico } from './InterTipoServico'
import { Agenda } from './InterAgenda'
import { endereco } from './InterEndereco'
import { Recurso } from './InterRecurso'
import { HorarioFuncionamento } from './InterHorarioFuncionamento'
export interface userEstabelecimento {
  id: number // Int
  nome: string // String
  email: string // String
  senha: string // String
  cpf: number // Int
  telefone: number // Int
  createdAt: Date // DateTime
  updatedAt: Date // DateTime
  Endereco: endereco[] // Array de Endereco
  TipoServico: tipoServico[] // Array de TipoServico
  Recursos: Recurso[] // Array de Recurso
  Agenda: Agenda[] // Array de Agenda
  HorarioFuncionamento: HorarioFuncionamento[] // Array de HorarioFuncionamento
}
