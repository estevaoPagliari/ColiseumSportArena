'use client'
'use client'
import { BuscarHistoricoCliente } from '@/api/user/agenda/historicoback'
import React, { useEffect, useState } from 'react'
import { AgendaNew } from '@/api/interface/InterAgenda'

export function HistoricoComponenteCliente({ id }: { id: string }) {
  const [data, setData] = useState<AgendaNew[]>([])

  async function fetchHistoricoCliente() {
    try {
      const idnew = parseInt(id, 10) // 10 é a base decimal
      const response = await BuscarHistoricoCliente({ id: idnew })
      setData(response)
    } catch (error) {
      console.error('Erro ao buscar histórico:', error)
    }
  }

  useEffect(() => {
    fetchHistoricoCliente()
  }, [])

  return (
    <div className="flex flex-col m-auto p-3 shadow-lg bg-zinc-200">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 font-sans">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Horário
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Recurso
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome Cliente
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-2 text-center">
                  Nenhum resultado encontrado.
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id}>
                  <td className="px-2 py-4 whitespace-nowrap">
                    {item.horario}
                  </td>
                  <td className="px-2 py-4 whitespace-nowrap">
                    {item.Recurso?.nome}
                  </td>
                  <td className="px-2 py-4 whitespace-nowrap">{`${item.dia}/${item.mes}/${item.ano}`}</td>
                  <td className="px-2 py-4 whitespace-nowrap">
                    {item.Cliente?.nome}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
