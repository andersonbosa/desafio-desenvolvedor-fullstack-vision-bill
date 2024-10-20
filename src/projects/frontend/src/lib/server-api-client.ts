import axios from 'axios'

export const apiClientV1 = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1',
  timeout: 10 * 1000
})
