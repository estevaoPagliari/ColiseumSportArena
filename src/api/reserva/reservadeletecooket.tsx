import { setCookie } from 'nookies'

export function DeleteData() {
  console.log('teste')
  const data = ''
  setCookie(null, 'selectedHorarios', data, {
    maxAge: 0, // 1 dia em segundos
    path: '/', // caminho do cookie (no caso, o caminho raiz)
  })
}
