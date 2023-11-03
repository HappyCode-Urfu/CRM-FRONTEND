import axios from 'axios'

const API_URL = 'http://localhost:4000'

const $api = axios.create({
  baseURL: API_URL,
})

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
  return config
})

export default $api
