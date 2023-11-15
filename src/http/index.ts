import axios from 'axios'

const API_URL = 'http://localhost:10000/api/v1'

const $host = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

const $api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`
  return config
})

$api.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true
      try {
        const response = await axios.get('http://localhost:10001/connect/token', {
          withCredentials: true,
        })
        localStorage.setItem('token', response.data.access_token)
        return $api.request(originalRequest)
      } catch (e) {
        console.log('НЕ АВТОРИЗОВАН')
      }
    }
    throw error
  }
)

export { $api, $host }
