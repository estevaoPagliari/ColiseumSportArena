import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://nexagendaserve-production.up.railway.app',
  // baseURL: 'http://192.168.1.100:8080',
  // baseURL: 'http://192.168.3.24:8080',
})
