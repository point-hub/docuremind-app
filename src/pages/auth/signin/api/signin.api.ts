import { useAuthStore } from '@/stores/auth.store'
import { apiRequest } from '@/utils/api'

import type { IForm } from '../form'

export const signinApiRequest = async (data: IForm) => {
  const response = await apiRequest.post('/v1/auth/signin', {
    username: data.username,
    password: data.password,
    remember_me: data.remember_me
  })

  const authStore = useAuthStore()
  authStore.update({
    name: response.data.username,
    email: response.data.email
  })

  return response
}
