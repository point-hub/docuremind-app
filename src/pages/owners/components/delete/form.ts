import { ref } from 'vue'

export interface IFormError {
  [key: string]: string[]
  password: string[]
  reason: string[]
}

export function useForm() {
  const defaultFormError: IFormError = {
    password: [],
    reason: []
  }

  const errors = ref<IFormError>(defaultFormError)

  return { errors }
}
