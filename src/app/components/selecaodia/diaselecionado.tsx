interface Horario {
  horario: string
  valor: string
  disponibilidade: string
}

interface DiaSelecionadoProps {
  selectedHorarios: Horario[]
}

export function DiaSelecionado({ selectedHorarios }: DiaSelecionadoProps) {
  return (
    <div className="mt-10 p-4 bg-gray-200 rounded-md shadow-lg text-center">
      <h2 className="text-lg font-bold">Horários Selecionados</h2>
      {selectedHorarios.map((horario, index) => (
        <div key={index}>
          <p>{`Horário: ${horario.horario}`}</p>
          <p>{`Disponibilidade: ${horario.disponibilidade}`}</p>
        </div>
      ))}
    </div>
  )
}
