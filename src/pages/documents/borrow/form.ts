import { ref } from 'vue'

export interface IForm {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export interface IFormError {
  [key: string]: string[]
  name: string[]
}

export function useForm() {
  const defaultForm: IForm = {
    name: ''
  }

  const defaultFormError: IFormError = {
    name: []
  }

  const data = ref<IForm>(defaultForm)

  const errors = ref<IFormError>(defaultFormError)

  const reset = () => {
    data.value = defaultForm
    errors.value = defaultFormError
  }

  return { data, errors, reset }
}
