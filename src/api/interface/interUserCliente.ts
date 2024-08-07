import { endereco } from './InterEndereco'
import { Agenda } from './InterAgenda'
export interface userCliente {
  id: number // Int
  nome: string // String
  email: string // String
  senha: string // String
  cpf: string // Int
  telefone: number // Int
  habilitado: boolean
  createdAt: Date // DateTime
  updatedAt: Date // DateTime
  Endereco: endereco[] // Array de Endereco
  Agenda: Agenda[] // Array de Agenda
}
