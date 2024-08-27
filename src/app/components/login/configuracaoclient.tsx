'use client'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { alterarsenha, buscarcliente } from '@/api/cliente/buscarcliente'
import { useRouter } from 'next/navigation'

// Definindo o schema de validação
const schema = yup.object({
  email: yup.string().email('Email Inválido').required('Campo obrigatório'),
  nome: yup.string().required('Campo obrigatório'),
  senha: yup
    .string()
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
    .required('Campo obrigatório'),
  confirmacaoSenha: yup
    .string()
    .oneOf([yup.ref('senha')], 'As senhas devem corresponder')
    .required('Campo obrigatório'),
  cpf: yup
    .string()
    .matches(/^\d{11}$/, 'CPF deve conter exatamente 11 dígitos numéricos')
    .required('Campo obrigatório'),
  telefone: yup
    .string()
    .matches(
      /^\d{10,11}$/,
      'Telefone deve conter exatamente 10 ou 11 dígitos numéricos',
    )
    .required('Campo obrigatório'),
  habilitado: yup.boolean().required('Campo obrigatório'),
  endereco: yup.object({
    estado: yup.string().required('Campo obrigatório'),
    cidade: yup.string().required('Campo obrigatório'),
    rua: yup.string().required('Campo obrigatório'),
    numero: yup.string().required('Campo obrigatório'),
    complemento: yup.string().optional(),
    cep: yup
      .string()
      .matches(/^\d{8}$/, 'CEP deve conter exatamente 8 dígitos numéricos')
      .required('Campo obrigatório'),
  }),
})

// Definindo a interface para os dados do formulário
interface FormData {
  email: string
  nome: string
  senha: string
  confirmacaoSenha: string
  cpf: string
  telefone: string
  habilitado: boolean
  endereco: {
    estado: string
    cidade: string
    rua: string
    numero: string
    complemento?: string
    cep: string
  }
}

export default function ConfiguracaoClientFrom({ id }: { id: string }) {
  const { control, setValue, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(schema),
  })
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [messageerro, setMessageerro] = useState('')

  // Função para buscar cliente e preencher o formulário
  useEffect(() => {
    async function BuscarCliente() {
      try {
        const response = await buscarcliente(id)
        if (response) {
          setValue('email', response.email)
          setValue('nome', response.nome)
          setValue('cpf', response.cpf.toString())
          setValue('telefone', response.telefone.toString())
          setValue('habilitado', response.habilitado) // Corrigido aqui
          if (response.Endereco && response.Endereco.length > 0) {
            setValue('endereco.estado', response.Endereco[0]?.estado || '')
            setValue('endereco.cidade', response.Endereco[0]?.cidade || '')
            setValue('endereco.rua', response.Endereco[0]?.rua || '')
            setValue('endereco.numero', response.Endereco[0]?.numero || '')
            setValue(
              'endereco.complemento',
              response.Endereco[0]?.complemento || '',
            )
            setValue('endereco.cep', response.Endereco[0]?.cep.toString() || '')
          }
        }
      } catch (error) {
        console.error('Erro ao buscar cliente:', error)
        // Lidar com o erro de busca do cliente aqui
      }
    }
    BuscarCliente()
  }, [id, setValue])

  async function handleCEPChange(cepValue: string) {
    try {
      const response = await axios.get(
        `https://viacep.com.br/ws/${cepValue}/json/`,
      )
      const address = response.data
      if (address) {
        // Atualiza os valores dos campos de endereço com os dados retornados
        setValue('endereco.estado', address.uf)
        setValue('endereco.cidade', address.localidade)
        setValue('endereco.rua', address.logradouro)
        setValue('endereco.numero', '') // Limpa o número, se necessário
        setValue('endereco.complemento', address.complemento || '') // Preenche o complemento, se disponível
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error)
      // Lidar com o erro de busca do CEP aqui
      setMessageerro('Erro ao buscar endereço pelo CEP.')
    }
  }

  async function handleCreateUser(data: FormData): Promise<void> {
    setIsLoading(true)
    setMessageerro('')
    try {
      // Lógica para criar ou atualizar o usuário usando os dados do formulário
      console.log(data)

      // Se necessário, você pode adicionar aqui uma requisição para uma API ou outras operações assíncronas
      const { senha } = data
      const response = await alterarsenha(id, senha)

      if (response.status === 200) {
        // Exibir uma mensagem de sucesso
        setMessageerro('Senha alterada com sucesso!')

        // Redirecionar após 2 segundos
        setTimeout(() => {
          router.push('/cliente')
        }, 3000)
      } else {
        // Tratar erros de resposta
        setMessageerro(response.message)
      }
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error)
      setMessageerro('Ocorreu um erro ao atualizar a senha.')
    } finally {
      setIsLoading(false) // Independente do sucesso ou falha, o carregamento será encerrado
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-2xl">
        {/* Header */}
        <div className="flex flex-col justify-center items-center mb-6">
          <Image
            src="/LogoMenor.png"
            width={150}
            height={150}
            quality={100}
            alt="Logo"
          />
          <div className="text-2xl font-alt">Alteração de Conta</div>
        </div>

        <div className="flex flex-col gap-2 font-sans">
          <div className="flex flex-row gap-2 items-center">
            <span className="text-xs text-zinc-300 font-sans">
              * Não pode ser alterado
            </span>
          </div>
          <div className="flex flex-row gap-2 items-center shadow-md">
            <span className="text-xl text-zinc-500 font-alt ml-2">E-mail</span>
            <span className="text-xs text-zinc-300 font-alt">*</span>
          </div>

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                type="email"
                placeholder="Digite seu email"
                className="w-full p-2 font-medium rounded-sm"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                readOnly
              />
            )}
          />

          <div className="flex flex-row gap-2 items-center shadow-md">
            <span className="text-xl text-zinc-500 font-alt ml-2">Nome</span>
            <span className="text-xs text-zinc-300 font-sans">*</span>
          </div>
          <Controller
            control={control}
            name="nome"
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                type="text"
                placeholder="Digite seu nome"
                className="w-full p-2 font-medium rounded-sm"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                readOnly
              />
            )}
          />
          <div className="flex flex-row gap-2 items-center shadow-md">
            <span className="text-xl text-zinc-500 font-alt ml-2">CPF</span>
            <span className="text-xs text-zinc-300 font-sans">*</span>
          </div>

          <Controller
            control={control}
            name="cpf"
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                type="text"
                placeholder="Digite seu CPF"
                className="w-full p-2 font-medium rounded-sm"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                readOnly
              />
            )}
          />

          <div className="flex flex-row gap-2 items-center shadow-md">
            <span className="text-xl text-zinc-500 font-alt ml-2">
              Telefone
            </span>
            <span className="text-xs text-zinc-300 font-sans">*</span>
          </div>

          <Controller
            control={control}
            name="telefone"
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                type="text"
                placeholder="Digite seu telefone"
                className="w-full p-2 font-medium rounded-sm"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                readOnly
              />
            )}
          />

          <div className="flex flex-row gap-2 items-center shadow-md">
            <span className="text-xl text-zinc-500 font-alt ml-2">Estado</span>
            <span className="text-xs text-zinc-300 font-sans">*</span>
          </div>

          <Controller
            control={control}
            name="endereco.estado"
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                type="text"
                placeholder="Digite o estado"
                className="w-full p-2 font-medium rounded-sm"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                readOnly
              />
            )}
          />

          <div className="flex flex-row gap-2 items-center shadow-md">
            <span className="text-xl text-zinc-500 font-alt ml-2">Cidade</span>
            <span className="text-xs text-zinc-300 font-sans">*</span>
          </div>

          <Controller
            control={control}
            name="endereco.cidade"
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                type="text"
                placeholder="Digite a cidade"
                className="w-full p-2 font-medium rounded-sm"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                readOnly
              />
            )}
          />

          <div className="flex flex-row gap-2 items-center shadow-md">
            <span className="text-xl text-zinc-500 font-alt ml-2">Rua</span>
            <span className="text-xs text-zinc-300 font-sans">*</span>
          </div>

          <Controller
            control={control}
            name="endereco.rua"
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                type="text"
                placeholder="Digite a rua"
                className="w-full p-2 font-medium rounded-sm"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                readOnly
              />
            )}
          />

          <div className="flex flex-row gap-2 items-center shadow-md">
            <span className="text-xl text-zinc-500 font-alt ml-2">Número</span>
            <span className="text-xs text-zinc-300 font-sans">*</span>
          </div>

          <Controller
            control={control}
            name="endereco.numero"
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                type="text"
                placeholder="Digite o número"
                className="w-full p-2 font-medium rounded-sm"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                readOnly
              />
            )}
          />

          <div className="flex flex-row gap-2 items-center shadow-md">
            <span className="text-xl text-zinc-500 font-alt ml-2">
              Complemento
            </span>
          </div>

          <Controller
            control={control}
            name="endereco.complemento"
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                type="text"
                placeholder="Digite o complemento (opcional)"
                className="w-full p-2 font-medium rounded-sm"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                readOnly
              />
            )}
          />

          <div className="flex flex-row gap-2 items-center shadow-md">
            <span className="text-xl text-zinc-500 font-alt ml-2">CEP</span>
            <span className="text-xs text-zinc-300 font-sans">*</span>
          </div>

          <Controller
            control={control}
            name="endereco.cep"
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                type="text"
                placeholder="Digite o CEP"
                className="w-full p-2 font-medium rounded-sm"
                onChange={(e) => {
                  onChange(e)
                  handleCEPChange(e.target.value) // Adicionando chamada para busca do CEP
                }}
                onBlur={onBlur}
                value={value}
                readOnly
              />
            )}
          />

          <div className="flex flex-row gap-2 items-center shadow-md">
            <span className="text-xl text-zinc-500 font-alt ml-2">Senha</span>
            <span className="text-xs text-zinc-300 font-sans">*</span>
          </div>

          <Controller
            control={control}
            name="senha"
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                type="password"
                placeholder="Digite sua senha"
                className="w-full p-2 font-medium rounded-sm"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />

          <div className="flex flex-row gap-2 items-center shadow-md">
            <span className="text-xl text-zinc-500 font-alt ml-2">
              Confirmar Senha
            </span>
            <span className="text-xs text-zinc-300 font-sans">*</span>
          </div>

          <Controller
            control={control}
            name="confirmacaoSenha"
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                type="password"
                placeholder="Confirme sua senha"
                className="w-full p-2 font-medium rounded-sm"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />

          <div className="flex flex-row gap-2 items-center shadow-md">
            <span className="text-xl text-zinc-500 font-alt ml-2">
              Habilitado
            </span>
          </div>

          <Controller
            control={control}
            name="habilitado"
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                type="checkbox"
                className="w-full p-2"
                onChange={onChange}
                onBlur={onBlur}
                checked={value}
                readOnly
              />
            )}
          />

          {messageerro && (
            <div className="text-red-500 font-sans">{messageerro}</div>
          )}

          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            onClick={handleSubmit(handleCreateUser)}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Salvar'}
          </button>
        </div>
      </div>
    </div>
  )
}
