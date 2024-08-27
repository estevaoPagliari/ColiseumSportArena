'use client'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Image from 'next/image'
import { useState } from 'react'
import { criarcontacliente } from '@/api/cliente/criarcontacleinte'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios' // Importe o Axios

// Definindo o schema de validação
const schema = yup.object({
  email: yup.string().email('Email Inválido').required('Campo obrigatório'),

  nome01: yup.string().required('Campo obrigatório'),

  sobrenome: yup.string().required('Campo obrigatório'),

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
  nome01: string
  sobrenome: string
  senha: string
  confirmacaoSenha: string
  cpf: string
  telefone: string
  endereco: {
    estado: string
    cidade: string
    rua: string
    numero: string
    complemento?: string
    cep: string
  }
}

export default function RegistrarFrom() {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const router = useRouter()

  async function handleCreateUserClient(data: FormData): Promise<void> {
    try {
      const response = await criarcontacliente(data)

      if (response.status === 201) {
        console.log('Usuário criado com sucesso:', response.data)
        setSuccessMessage('Cadastro realizado com sucesso!')
        setErrorMessage('') // Limpa qualquer mensagem de erro existente
      } else {
        // Exibe mensagem de erro baseada no status e na mensagem retornada pelo servidor
        setErrorMessage(response.message)
      }
    } catch (error) {
      // Erro durante a chamada da função criarcontacliente
      console.error('Erro ao criar usuário:', error)
      setErrorMessage('Erro ao criar usuário. Por favor, tente novamente.')
    }
  }

  function handleCloseSuccessMessage() {
    setSuccessMessage('')
  }

  // Função para redirecionar para página de login
  function redirectToLogin() {
    router.push('/home')
  }

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
      setValue('endereco.complemento', address.complemento) // Preenche o complemento, se disponível
    } catch (error) {
      console.error('Erro ao buscar CEP:', error)
      // Lida com o erro de busca do CEP aqui
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-yellow-500 rounded-lg shadow-2xl sm:p-8 md:w-3/4 lg:w-2/3 xl:w-1/2">
        {/* Header */}
        <div className="flex flex-col justify-center items-center mb-6">
          <Image
            src="/LogoMenor.png"
            width={150}
            height={150}
            quality={100}
            alt="Picture of the author"
          />
          <div className="text-2xl font-alt">Bem vindo! </div>
          <div className="text-xl font-alt">Crie sua conta</div>
        </div>

        <div className="flex flex-col gap-1 font-sans">
          <span className="font-alt text-sm">Email</span>
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
              />
            )}
          />
          <span className="text-xs font-sans">*E-mail deve ser único</span>
          {errors.email && (
            <span className="text-red-500">{errors.email?.message}</span>
          )}

          <span className="font-alt text-sm">Nome</span>
          <Controller
            control={control}
            name="nome01"
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                type="text"
                placeholder="Digite seu nome"
                className="w-full p-2 font-medium rounded-sm"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          {errors.nome01 && (
            <span className="text-red-500">{errors.nome01?.message}</span>
          )}

          <span className="font-alt text-sm">Sobrenome</span>
          <Controller
            control={control}
            name="sobrenome"
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                type="text"
                placeholder="Digite seu sobrenome"
                className="w-full p-2 font-medium rounded-sm"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          {errors.sobrenome && (
            <span className="text-red-500">{errors.sobrenome?.message}</span>
          )}

          <span className="font-alt text-sm">Senha</span>
          <div className="relative">
            <Controller
              control={control}
              name="senha"
              render={({ field: { onChange, onBlur, value } }) => (
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Senha"
                  className="w-full p-2 font-medium rounded-sm"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center px-4 text-sm leading-5 text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? '👁' : '👁'}
            </button>
          </div>
          {errors.senha && (
            <span className="text-red-500">{errors.senha?.message}</span>
          )}

          <div className="relative">
            <span className="font-alt text-sm">Confirmar Senha</span>
            <Controller
              control={control}
              name="confirmacaoSenha"
              render={({ field: { onChange, onBlur, value } }) => (
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirme a senha"
                  className="w-full p-2 font-medium rounded-sm"
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center px-4 text-sm leading-5 text-gray-600"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? '👁' : '👁'}
            </button>
          </div>
          {errors.confirmacaoSenha && (
            <span className="text-red-500">
              {errors.confirmacaoSenha?.message}
            </span>
          )}

          <span className="font-alt text-sm">Cpf</span>
          <Controller
            control={control}
            name="cpf"
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                type="text"
                placeholder="CPF"
                className="w-full p-2 font-medium rounded-sm"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          <span className="text-xs font-sans">
            *Digite seu cpf sem traços e pontos
          </span>
          {errors.cpf && (
            <span className="text-red-500">{errors.cpf?.message}</span>
          )}

          <span className="font-alt text-sm">Telefone</span>
          <Controller
            control={control}
            name="telefone"
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                type="text"
                placeholder="Telefone"
                className="w-full p-2 font-medium rounded-sm"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          <span className="text-xs font-sans">
            *Digite seu telefone com o DDD sem traços ou pontos
          </span>
          {errors.telefone && (
            <span className="text-red-500">{errors.telefone?.message}</span>
          )}

          <span className="font-alt text-sm">CEP</span>
          <Controller
            control={control}
            name="endereco.cep"
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                type="text"
                placeholder="CEP"
                className="w-full p-2 font-medium rounded-sm"
                onChange={(e) => {
                  onChange(e.target.value)
                  handleCEPChange(e.target.value) // Chama a função para buscar e preencher o endereço
                }}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          <span className="text-xs font-sans">
            *Digite seu CEP sem traços ou pontos
          </span>
          {errors.endereco?.cep && (
            <span className="text-red-500">{errors.endereco.cep?.message}</span>
          )}
          <span className="font-alt text-sm">Estado</span>
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
              />
            )}
          />
          {errors.endereco?.estado && (
            <span className="text-red-500">
              {errors.endereco.estado?.message}
            </span>
          )}

          <span className="font-alt text-sm">Cidade</span>
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
              />
            )}
          />
          {errors.endereco?.cidade && (
            <span className="text-red-500">
              {errors.endereco.cidade?.message}
            </span>
          )}

          <span className="font-alt text-sm">Rua</span>
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
              />
            )}
          />
          {errors.endereco?.rua && (
            <span className="text-red-500">{errors.endereco.rua?.message}</span>
          )}
          <span className="font-alt text-sm">Número</span>
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
              />
            )}
          />
          {errors.endereco?.numero && (
            <span className="text-red-500">
              {errors.endereco.numero?.message}
            </span>
          )}
          <span className="font-alt text-sm">Complemento</span>
          <Controller
            control={control}
            name="endereco.complemento"
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                type="text"
                placeholder="Complemento (opcional)"
                className="w-full p-2 font-medium rounded-sm"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />

          <button
            className="h-10 font-semibold text-white transition bg-black rounded-md hover:bg-slate-600"
            onClick={handleSubmit(handleCreateUserClient)}
          >
            Registrar
          </button>
          <Link
            href={'/login'}
            className="flex w-full h-5 font-semibold text-white transition justify-center items-center bg-black rounded-md hover:bg-slate-600"
          >
            <span className="">Voltar</span>
          </Link>
          {/* Exibe mensagem de sucesso */}
          {successMessage && (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4 font-sans"
              role="alert"
            >
              <strong className="font-bold">Sucesso!</strong>
              <span className="block sm:inline"> {successMessage}</span>
              {/* Botão para voltar à página de login */}

              {/* Botão para fechar mensagem de sucesso */}
              <span
                className="absolute top-0 bottom-0 right-0 px-4 py-3 text-xl"
                onClick={handleCloseSuccessMessage}
              ></span>
              <div>
                <button onClick={redirectToLogin} className="text-green-500">
                  Voltar para Login
                </button>
              </div>
            </div>
          )}
          {errorMessage && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
              role="alert"
            >
              <strong className="font-bold">Erro!</strong>
              <span className="block sm:inline"> {errorMessage}</span>
              <span
                className="absolute top-0 bottom-0 right-0 px-4 py-3"
                onClick={() => setErrorMessage('')}
              >
                <span className="font-sans text-xl">Fechar</span>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
