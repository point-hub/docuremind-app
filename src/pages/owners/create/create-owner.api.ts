import axios from '@/axios'

import type { IForm, IFormError } from './form'

export function useCreateOwnerApi() {
  const send = async (data: IForm, errors: IFormError) => {
    const response = await axios.post('/v1/owners', data)
    if (response.status === 201) {
      return {
        inserted_id: response.data.inserted_id
      }
    }
  }

  return { send }
}
