import { apiRequest } from '@/utils/api'

export const resetPasswordApiRequest = async (data: { code: string; password: string }) => {
  return await apiRequest.post('/v1/auth/reset-password', {
    code: data.code,
    password: data.password
  })
}
