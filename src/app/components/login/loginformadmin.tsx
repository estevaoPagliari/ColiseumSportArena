'use client'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { handleOAuthCode } from '@/api/login/login'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const schema = yup.object({
  email: yup.string().email('Email Invalido').required('Campo obrigatório'),
  senha: yup
    .string()
    .min(8, 'A senha deve ter no minimo 8 caracteres')
    .required('Campo obrigatório'),
})

export default function LoginComponentsAdmin() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  interface FormData {
    email: string
    senha: string
  }

  async function handleCreateUser(data: FormData): Promise<void> {
    setIsLoading(true)

    const { email, senha } = data

    const IsAuthenticated = await handleOAuthCode(email, senha)
    if (IsAuthenticated) {
      router.push('/admin')
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-yellow-500 rounded-lg shadow-2xl sm:p-8 md:w-3/4 lg:w-2/3 xl:w-1/2">
        {/* Header */}
        <div className="flex flex-col justify-center items-center mb-6 ">
          <Image
            src="/LogoMenor.png"
            width={150}
            height={150}
            quality={100}
            alt="Picture of the author"
          />
          <div className="text-2xl font-alt ">Login Admin</div>
        </div>

        <div className="flex flex-col gap-4">
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
          {errors.email && (
            <span className="text-red-500">{errors.email?.message}</span>
          )}

          <Controller
            control={control}
            name="senha"
            render={({ field: { onChange, onBlur, value } }) => (
              <input
                type="password"
                placeholder="Senha"
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

          <button
            className="h-10 font-alt text-white transition bg-black rounded-md hover:bg-slate-600"
            onClick={handleSubmit(handleCreateUser)}
            disabled={isLoading}
          >
            {isLoading ? 'Carregando...' : 'Entrar Usuario'}
          </button>

          <Link href={'/registrar'} className="mt-4 text-center font-alt">
            Registra-se
          </Link>
        </div>
      </div>
    </div>
  )
}
