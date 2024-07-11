import { userEstabelecimento } from './InterUserEstabelecimento'
import { userCliente } from './interUserCliente'
export interface endereco {
  id: number // Int
  estado: string // String
  cidade: string // String
  rua: string // String
  numero: string // String
  complemento?: string // String opcional
  cep: string // String
  usuarioEmpresaId?: number // Int opcional
  clienteId?: number // Int opcional
  UsuarioEmpresa?: userEstabelecimento[] // Relacionamento com UserEstabelecimento
  Cliente?: userCliente // Relacionamento com UserCliente
}
