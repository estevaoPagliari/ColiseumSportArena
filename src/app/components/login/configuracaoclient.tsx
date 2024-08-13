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
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [messageerro, setMessageerro] = useState('')

  // Função para buscar cliente e preencher o formulário
  useEffect(() => {
    async function BuscarCliente() {
      const response = await buscarcliente(id)
      if (response) {
        setValue('email', response.email)
        setValue('nome', response.nome)
        setValue('cpf', response.cpf.toString())
        setValue('telefone', response.telefone.toString())
        setValue('habilitado', response.telefone)
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
    BuscarCliente()
  }, [id, setValue])

  async function handleCEPChange(cepValue: string) {
    try {
      const response = await axios.get(
        `https://viacep.com.br/ws/${cepValue}/json/`,
      )
      const address = response.data
      // Atualiza os valores dos campos de endereço com os dados retornados
      setValue('endereco.estado', address.uf)
      setValue('endereco.cidade', address.localidade)
      setValue('endereco.rua', address.logradouro)
      setValue('endereco.numero', '') // Limpa o número, se necessário
      setValue('endereco.complemento', address.complemento || '') // Preenche o complemento, se disponível
    } catch (error) {
      console.error('Erro ao buscar CEP:', error)
      // Lida com o erro de busca do CEP aqui
    }
  }

  async function handleCreateUser(data: FormData): Promise<void> {
    setIsLoading(true)
    setMessageerro('')
    console.log('oi')

    try {
      // console.log(data)
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
      setIsLoading(false)
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
            <span className="text-xl text-zinc-500 font-alt ml-2">
              Nova senha
            </span>
          </div>
          <Controller
            control={control}
            name="senha"
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                type={'password'}
                placeholder="Digite a nova senha"
                className="w-full p-2 font-medium rounded-sm"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          {errors.senha && (
            <span className="text-red-500">{errors.senha?.message}</span>
          )}

          <div className="flex flex-row gap-2 items-center shadow-md">
            <span className="text-xl text-zinc-500 font-alt ml-2">
              Confirmar senha
            </span>
          </div>
          <Controller
            control={control}
            name="confirmacaoSenha"
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                type={'password'}
                placeholder="Confirme a nova senha"
                className="w-full p-2 font-medium rounded-sm"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          {errors.confirmacaoSenha && (
            <span className="text-red-500">
              {errors.confirmacaoSenha?.message}
            </span>
          )}

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
            <span className="text-xl text-zinc-500 font-alt ml-2">
              Endereço
            </span>
            <span className="text-xs text-zinc-300 font-sans">*</span>
          </div>

          <div className="flex flex-col gap-2">
            <Controller
              control={control}
              name="endereco.estado"
              render={({ field: { onChange, onBlur, value } }) => (
                <input
                  type="text"
                  placeholder="Estado"
                  className="w-full p-2 font-medium rounded-sm"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  readOnly
                />
              )}
            />
            <Controller
              control={control}
              name="endereco.cidade"
              render={({ field: { onChange, onBlur, value } }) => (
                <input
                  type="text"
                  placeholder="Cidade"
                  className="w-full p-2 font-medium rounded-sm"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  readOnly
                />
              )}
            />
            <Controller
              control={control}
              name="endereco.rua"
              render={({ field: { onChange, onBlur, value } }) => (
                <input
                  type="text"
                  placeholder="Rua"
                  className="w-full p-2 font-medium rounded-sm"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  readOnly
                />
              )}
            />
            <Controller
              control={control}
              name="endereco.numero"
              render={({ field: { onChange, onBlur, value } }) => (
                <input
                  type="text"
                  placeholder="Número"
                  className="w-full p-2 font-medium rounded-sm"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  readOnly
                />
              )}
            />
            <Controller
              control={control}
              name="endereco.complemento"
              render={({ field: { onChange, onBlur, value } }) => (
                <input
                  type="text"
                  placeholder="Complemento"
                  className="w-full p-2 font-medium rounded-sm"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  readOnly
                />
              )}
            />
            <Controller
              control={control}
              name="endereco.cep"
              render={({ field: { onChange, onBlur, value } }) => (
                <input
                  type="text"
                  placeholder="CEP"
                  className="w-full p-2 font-medium rounded-sm"
                  onChange={(e) => {
                    onChange(e)
                    handleCEPChange(e.target.value)
                  }}
                  onBlur={onBlur}
                  value={value}
                  readOnly
                />
              )}
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit(handleCreateUser)}
            className="bg-blue-500 text-white p-2 rounded-md"
            disabled={isLoading}
          >
            {isLoading ? 'Atualizando...' : 'Alterar'}
          </button>
          {messageerro && (
            <div className="text-green-500 bg-green-100 font-medium mt-2">
              {messageerro}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
