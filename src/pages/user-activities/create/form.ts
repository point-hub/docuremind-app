import { ref, watch } from 'vue'

export interface IForm {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
  username: string
  name: string
  email: string
  role: string
  password: string
}

export interface IFormError {
  [key: string]: string[]
  username: string[]
  name: string[]
  email: string[]
  role: string[]
  password: string[]
}

export function useForm() {
  const defaultForm: IForm = {
    username: '',
    name: '',
    email: '',
    role: '',
    password: ''
  }

  const defaultFormError: IFormError = {
    username: [],
    name: [],
    email: [],
    role: [],
    password: []
  }

  const data = ref<IForm>(defaultForm)

  const errors = ref<IFormError>(defaultFormError)

  watch(
    () => {
      const array = []
      for (const key in data.value) {
        if (Object.prototype.hasOwnProperty.call(data.value, key)) {
          array.push(data.value[key])
        }
      }
      return array
    },
    (newValue, oldValue) => {
      for (let index = 0; index < newValue.length; index++) {
        if (newValue[index] !== oldValue[index]) {
          Object.keys(errors.value).forEach((key, i) => {
            if (index === i) {
              errors.value[key] = []
            }
          })
        }
      }
    }
  )

  const reset = () => {
    data.value = defaultForm
    errors.value = defaultFormError
  }

  return { data, errors, reset }
}
