'use client'
import React, { useState, useEffect, useMemo } from 'react'
import {
  alterarhalitado,
  buscarclientetotal,
} from '@/api/cliente/buscarcliente'
import { userCliente } from '@/api/interface/interUserCliente'

type SortDirection = 'ascending' | 'descending'

export function ListClientComponents() {
  const [cliente, setCliente] = useState<userCliente[]>([])
  const [sortConfig, setSortConfig] = useState<{
    key: string
    direction: SortDirection
  } | null>(null)
  const [selectedOption, setSelectedOption] = useState<string>('Nome')
  const [searchTerm, setSearchTerm] = useState<string>('')

  async function BuscarCliente() {
    try {
      const response = await buscarclientetotal()
      setCliente(response)
    } catch (error) {
      console.error('Erro ao buscar clientes:', error)
    }
  }

  async function AlterarStatus(cpf: string, habilitado: boolean) {
    try {
      const newStatus = !habilitado // Inverte o status
      await alterarhalitado(cpf, newStatus)
      BuscarCliente() // Atualiza a lista após a alteração
    } catch (error) {
      console.error('Erro ao alterar status:', error)
    }
  }

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

  const sortedData = useMemo(() => {
    const sortableData = [...cliente]
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof userCliente]
        const bValue = b[sortConfig.key as keyof userCliente]
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
  }, [cliente, sortConfig])

  useEffect(() => {
    BuscarCliente()
  }, [])

  const handleSearch = () => {
    const filteredData = cliente.filter((item) => {
      const value = item[selectedOption as keyof userCliente]
      if (typeof value === 'string') {
        return value.toLowerCase().includes(searchTerm.toLowerCase())
      }
      return false
    })
    setCliente(filteredData)
  }

  const handleRestore = () => {
    BuscarCliente()
    setSearchTerm('')
  }

  return (
    <div className="flex flex-col m-auto p-3 shadow-lg bg-zinc-200">
      <div className="flex flex-col md:flex-row justify-start items-center mb-4 gap-2">
        <select
          className="flex flex-1 w-full md:w-auto px-2 py-1 mr-2 border border-gray-300 rounded"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="nome">Nome</option>
          <option value="cpf">CPF</option>
          <option value="telefone">Telefone</option>
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
                onClick={() => requestSort('nome')}
              >
                Nome
              </th>
              <th
                className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                onClick={() => requestSort('cpf')}
              >
                CPF
              </th>
              <th
                className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                onClick={() => requestSort('telefone')}
              >
                Telefone
              </th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-2 text-center">
                  Nenhum resultado encontrado.
                </td>
              </tr>
            ) : (
              sortedData.map((item) => (
                <tr key={item.cpf}>
                  <td className="px-2 py-4 whitespace-nowrap">{item.nome}</td>
                  <td className="px-2 py-4 whitespace-nowrap">{item.cpf}</td>
                  <td className="px-2 py-4 whitespace-nowrap">
                    {item.telefone}
                  </td>
                  <td className="px-2 py-4 whitespace-nowrap">
                    <button
                      className={`px-4 py-2 text-white rounded ${
                        item.habilitado ? 'bg-red-500' : 'bg-green-500'
                      }`}
                      onClick={() => AlterarStatus(item.cpf, item.habilitado)}
                    >
                      {item.habilitado ? 'Desabilitar' : 'Habilitar'}
                    </button>
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
