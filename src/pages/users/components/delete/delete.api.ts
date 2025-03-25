import axios from '@/axios'

import type { IFormError } from './form'

export function useDeleteUserApi() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const send = async (_id: string, errors: IFormError) => {
    const response = await axios.delete(`/v1/users/${_id}`)
    if (response.status === 200) {
      return response
    }
  }

  return { send }
}
