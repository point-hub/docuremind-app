import { ref, watch } from 'vue'

export interface IForm {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
  code: string
  name: string
  address: string
  phone: string
  notes: string
}

export interface IFormError {
  [key: string]: string[]
  code: string[]
  name: string[]
  address: string[]
  phone: string[]
  notes: string[]
}

export function useForm() {
  const defaultForm: IForm = {
    code: '',
    name: '',
    address: '',
    phone: '',
    notes: ''
  }

  const defaultFormError: IFormError = {
    code: [],
    name: [],
    address: [],
    phone: [],
    notes: []
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
