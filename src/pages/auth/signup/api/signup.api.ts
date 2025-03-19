import { apiRequest } from '@/utils/api'

import type { IForm } from '../form'

export const signupApiRequest = async (data: IForm) => {
  return await apiRequest.post('/v1/auth/signup', {
    email: data.email,
    password: data.password
  })
}
