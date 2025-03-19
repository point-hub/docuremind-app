import { apiRequest } from '@/utils/api'

import type { IForm } from '../form'

export const signinApiRequest = async (data: IForm) => {
  return await apiRequest.post('/v1/auth/signin', {
    username: data.username,
    password: data.password,
    remember_me: data.remember_me
  })
}
