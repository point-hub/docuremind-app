import { AxiosError } from 'axios'
import { inject, type Ref } from 'vue'

import axios from '@/axios'
import type { IToastRef } from '@/main-app.vue'

import type { IForm, IFormError } from './form'

const toastRef = inject<Ref<IToastRef>>('toastRef')

export function useUpdateOwnerApi() {
  const send = async (_id: string, data: IForm, errors: IFormError) => {
    try {
      const response = await axios.patch(`/v1/owners/${_id}`, data)
      if (response.status === 200) {
        toastRef?.value.toast('Update success', { color: 'success' })
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
        toastRef?.value.toast(error.response?.data.message, {
          lists: listErrors.flat(),
          color: 'danger'
        })
      }
    }
  }

  return { send }
}
