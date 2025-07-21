import { cookies } from 'next/headers'
import { jwtDecode } from 'jwt-decode'
interface User {
  sub: string
  name: string
}

export async function getUser(): Promise<User> {
  const token = (await cookies()).get('tokenclient')?.value

  if (!token) {
    throw new Error('Erro Token')
  }

  const user: User = jwtDecode(token)

  return user
}

export async function getAdmin(): Promise<User> {
  const tokenadmin = (await cookies()).get('tokenadmin')?.value

  if (!tokenadmin) {
    throw new Error('Erro Token')
  }

  const user: User = jwtDecode(tokenadmin)

  return user
}
