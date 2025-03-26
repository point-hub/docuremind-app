import { ref } from 'vue'

export interface IForm {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export function useForm() {
  const defaultForm: IForm = {}

  const data = ref<IForm>(defaultForm)

  return { data }
}
