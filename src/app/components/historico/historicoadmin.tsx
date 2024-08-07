'use client'
import { BuscarHistorico } from '@/api/user/agenda/historicoback'
import React, { useEffect, useMemo, useState } from 'react'
import { AgendaNew } from '@/api/interface/InterAgenda'

type SortDirection = 'ascending' | 'descending'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getNestedValue(obj: any, path: string) {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj)
}

export function HistoricoComponenteAdmin({ id }: { id: string }) {
  const [data, setData] = useState<AgendaNew[]>([])
  const [originalData, setOriginalData] = useState<AgendaNew[]>([])
  const [sortConfig, setSortConfig] = useState<{
    key: string
    direction: SortDirection
  } | null>(null)
  const [selectedOption, setSelectedOption] = useState<string>('horario')
  const [searchTerm, setSearchTerm] = useState<string>('')

  async function BuscarHistoricoAdmin() {
    try {
      const response = await BuscarHistorico()
      setData(response)
      console.log(id)
      setOriginalData(response)
    } catch (error) {
      console.error('Erro ao buscar histórico:', error)
    }
  }

  const sortedData = useMemo(() => {
    const sortableData = [...data]
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        const aValue = getNestedValue(a, sortConfig.key)
        const bValue = getNestedValue(b, sortConfig.key)
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
    }
    return sortableData
  }, [data, sortConfig])

  const requestSort = (key: string) => {
    let direction: SortDirection = 'ascending'
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const handleSearch = () => {
    const filteredData = originalData.filter((item) => {
      const value = getNestedValue(item, selectedOption)
      if (typeof value === 'string') {
        return value.toLowerCase().includes(searchTerm.toLowerCase())
      }
      return false
    })
    setData(filteredData)
  }

  const handleRestore = () => {
    setData(originalData)
    setSearchTerm('')
  }

  useEffect(() => {
    BuscarHistoricoAdmin()
  }, [])

  return (
    <div className="flex flex-col m-auto p-3 shadow-lg bg-zinc-200">
      <div className="flex flex-col md:flex-row justify-start items-center mb-4 gap-2">
        <select
          className="flex flex-1 w-full md:w-auto px-2 py-1 mr-2 border border-gray-300 rounded"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="horario">Horário</option>
          <option value="Recurso.nome">Recurso</option>
          <option value="dia">Dia</option>
          <option value="mes">Mês</option>
          <option value="ano">Ano</option>
          <option value="Cliente.nome">Nome Cliente</option>
        </select>
        <input
          type="text"
          className="px-2 py-1 mr-2 border border-gray-300 rounded w-full"
          placeholder="Digite sua pesquisa"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="flex flex-1 px-4 py-2 mr-2 w-full text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={handleSearch}
        >
          Procurar
        </button>
        <button
          className="flex flex-1 w-full px-4 py-2 mr-2 text-white bg-gray-500 rounded hover:bg-gray-600"
          onClick={handleRestore}
        >
          Restaurar Tabela
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 font-sans">
          <thead className="bg-gray-50">
            <tr>
              <th
                className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('horario')}
              >
                Horário
              </th>
              <th
                className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('Recurso.nome')}
              >
                Recurso
              </th>
              <th
                className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('dia')}
              >
                Data
              </th>
              <th
                className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('Cliente.nome')}
              >
                Nome Cliente
              </th>
              <th
                className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort('Cliente.cpf')}
              >
                CPF
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-2 text-center">
                  Nenhum resultado encontrado.
                </td>
              </tr>
            ) : (
              sortedData.map((item) => (
                <tr key={item.id}>
                  <td className="px-2 py-4 whitespace-nowrap">
                    {item.horario}
                  </td>
                  <td className="px-2 py-4 whitespace-nowrap">
                    {getNestedValue(item, 'Recurso.nome')}
                  </td>
                  <td className="px-2 py-4 whitespace-nowrap">{`${item.dia}/${item.mes}/${item.ano}`}</td>
                  <td className="px-2 py-4 whitespace-nowrap">
                    {getNestedValue(item, 'Cliente.nome')}
                  </td>
                  <td className="px-2 py-4 whitespace-nowrap">
                    {getNestedValue(item, 'Cliente.cpf')}
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
