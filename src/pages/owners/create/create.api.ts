import axios from '@/axios'

import type { IForm } from './form'

export function useCreateOwnerApi() {
  const send = async (data: IForm) => {
    const response = await axios.post('/v1/owners', data)
    if (response.status === 201) {
      return {
        inserted_id: response.data.inserted_id
      }
    }
  }

  return { send }
}
