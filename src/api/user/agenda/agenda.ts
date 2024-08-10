/* eslint-disable no-unmodified-loop-condition */
import { api } from '@/api/api'

export async function buscaragendadia(id: string, dia: string, mes: string) {
  try {
    const response = await api.get(
      `/agendaservicodiaestabelecimento/${id}/${dia}/${mes}`,
    )
    return (await response).data
  } catch (error) {
    console.error('Erro na solicitação GET:', error)
  }
}

export async function CancelarAgendamento(idagenda: string) {
  try {
    const response = api.delete(`/agendaservico/${idagenda}`)
    return (await response).status
  } catch (error) {
    console.error('Erro na solicitação delete:', error)
  }
}

export async function CriarAgendamento(
  dia: number | null, // Validar se é um email válido
  mes: number | null,
  ano: number | null,
  horario: string,
  estabelecimentoId: number | null,
  tipoServicoId: number | null,
  clienteId: number | null,
  recursoId: number | null,
) {
  try {
    const response = await api.post('/agendaservico', {
      dia,
      mes,
      ano,
      horario,
      estabelecimentoId,
      tipoServicoId,
      clienteId,
      recursoId,
    })

    return response.data
  } catch (error) {
    console.error('Status do erro:', error)
    return false
  }
}

export async function BloquearDia(
  dia: number | null, // Validar se é um email válido
  mes: number | null,
  ano: number | null,
  estabelecimentoId: number | null,
  tipoServicoId: number | null,
  clienteId: number | null,
  recursoId: number | null,
  recursoId2: number | null,
) {
  try {
    const response = await api.post('/bloqueardia', {
      dia,
      mes,
      ano,
      estabelecimentoId,
      tipoServicoId,
      clienteId,
      recursoId,
      recursoId2,
    })

    return response.data
  } catch (error) {
    console.error('Status do erro:', error)
    return false
  }
}
