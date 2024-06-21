import { Horario } from '../selecaodia/dia'

interface CarrinhoDeComprasProps {
  selectedHorarios: Horario[]
  onRemove: (horario: Horario) => void
}

export function CarrinhoDeCompras({
  selectedHorarios,
  onRemove,
}: CarrinhoDeComprasProps) {
  return (
    <div
      className={`fixed bottom-0 right-0 w-full md:w-1/3 p-4 bg-white border-t border-gray-200 shadow-lg transition-transform transform ${selectedHorarios.length > 0 ? 'translate-y-0' : 'translate-y-full'}`}
    >
      <h3 className="font-bold">Horários Selecionados</h3>
      {selectedHorarios.length === 0 ? (
        <p>Nenhum horário selecionado</p>
      ) : (
        selectedHorarios.map((horario, index) => (
          <div key={index} className="mt-2 flex justify-between items-center">
            <div>
              <p>{`Horário: ${horario.horario}`}</p>
              <p>{`Disponibilidade: ${horario.disponibilidade}`}</p>
            </div>
            <button onClick={() => onRemove(horario)} className="text-red-500">
              Remover
            </button>
          </div>
        ))
      )}
      {selectedHorarios.length > 0 && (
        <button className="mt-4 p-2 bg-blue-600 text-white rounded-md w-full">
          Solicitar Reserva
        </button>
      )}
    </div>
  )
}
