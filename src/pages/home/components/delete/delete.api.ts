import axios from '@/axios'

import type { IFormError } from './form'

export function useDeleteDocumentApi() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const send = async (_id: string, errors: IFormError) => {
    const response = await axios.post(`/v1/documents/${_id}/delete`)
    if (response.status === 200) {
      return response
    }
  }

  return { send }
}
