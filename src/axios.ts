import axios from 'axios'

import api from '@/config/api'

const instance = axios.create({
  baseURL: api.baseURL,
  timeout: api.timeout
})

instance.defaults.headers.common['Cache-Control'] = `no-cache`
instance.defaults.withCredentials = true

instance.interceptors.request.use(
  (config) => {
    if (import.meta.env.DEV) {
      console.log('Request: ', config.url, config)
    }
    return config
  },
  function (error) {
    if (import.meta.env.DEV) {
      console.log('Response Error: ', error.response)
    }
    return Promise.reject(error.response)
  }
)

export default instance
