import { setCookie } from 'nookies'

export function Logout() {
  const token = ''
  setCookie(null, 'tokenclient', token, {
    maxAge: 0, // 1 dia em segundos
    path: '/', // caminho do cookie (no caso, o caminho raiz)
  })
}

export function LogoutAdmin() {
  const token = ''
  setCookie(null, 'tokenadmin', token, {
    maxAge: 0, // 1 dia em segundos
    path: '/', // caminho do cookie (no caso, o caminho raiz)
  })
}
