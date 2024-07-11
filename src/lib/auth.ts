import { cookies } from 'next/headers'
import { jwtDecode } from 'jwt-decode'
interface User {
  sub: string
  name: string
}

export function getUser(): User {
  const token = cookies().get('tokenclient')?.value

  if (!token) {
    throw new Error('Erro Token')
  }

  const user: User = jwtDecode(token)

  return user
}

export function getAdmin(): User {
  const tokenadmin = cookies().get('tokenadmin')?.value

  if (!tokenadmin) {
    throw new Error('Erro Token')
  }

  const user: User = jwtDecode(tokenadmin)

  return user
}
