import { cookies } from 'next/headers' // Certifique-se de que isso seja importado corretamente

export interface HorarioSelecionado {
  dia: number
  mes: number
  ano: number
  horario: string
  recursoId: number
}

export function getReserva(): HorarioSelecionado[] {
  const dados = cookies().get('selectedHorarios')?.value

  if (!dados) {
    console.error('Erro: dados não encontrados') // Log de erro caso os dados não sejam encontrados
    return [] // Retorna um array vazio caso os dados não sejam encontrados
  } else {
    console.log('Dados encontrados:', dados) // Log dos dados encontrados
  }

  const reservas: HorarioSelecionado[] = JSON.parse(dados)
  console.log('Reservas parseadas:', reservas) // Log dos dados parseados

  return reservas
}
