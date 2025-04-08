import { AxiosError } from 'axios'

import axios from '@/axios'

import type { IForm, IFormError } from './form'

export function useBorrowDocumentApi() {
  const send = async (_id: string, data: IForm, errors: IFormError) => {
    try {
      const response = await axios.post(`/v1/documents/${_id}/borrow`, data)
      if (response.status === 200) {
        return {
          matched_count: response.data.matched_count,
          modified_count: response.data.modified_count
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const listErrors: string[] = []
        const formErrors = error?.response?.data?.errors
        if (formErrors) {
          for (const key in formErrors) {
            errors[key] = formErrors[key]
            listErrors.push(formErrors[key])
          }
        }
      }
    }
  }

  return { send }
}
