import { computed, ref } from 'vue'

import { useEmailValidation } from './validation'

export interface IForm {
  email: string
  password: string
  confirm_password: string
  accept_terms: boolean
}

export interface IFormError {
  email: string[]
  password: string[]
  confirm_password: string[]
  accept_terms: string[]
}

export function useForm() {
  const emailValidation = useEmailValidation()

  const defaultData: IForm = {
    email: '',
    password: '',
    confirm_password: '',
    accept_terms: false
  }

  const defaultErrors: IFormError = {
    email: [],
    password: [],
    confirm_password: [],
    accept_terms: []
  }

  const data = ref<IForm>({ ...defaultData })

  const errors = ref<IFormError>({ ...defaultErrors })

  const reset = () => {
    data.value = { ...defaultData }
    errors.value = { ...defaultErrors }
  }

  const isPasswordConfirmed = computed(() => {
    return (
      data.value.password.length > 0 &&
      data.value.confirm_password.length > 0 &&
      errors.value.password.length === 0
    )
  })

  const confirmPasswordValidation = () => {
    errors.value.confirm_password = []
    if (data.value.confirm_password.length === 0) {
      return
    }
    if (data.value.password !== data.value.confirm_password) {
      errors.value.confirm_password.push('Password do not match')
    }
  }

  const passwordValidation = () => {
    const errorPassword = []
    confirmPasswordValidation()
    if (data.value.password.length === 0) {
      return
    }
    if (data.value.password.length < 8) {
      errorPassword.push('Use at least 8 characters')
    }
    if (!emailValidation.containsUppercase(data.value.password)) {
      errorPassword.push('Contain at least one uppercase letter')
    }
    if (!emailValidation.containsLowercase(data.value.password)) {
      errorPassword.push('Contain at least one lowercase letter')
    }
    if (!emailValidation.containsNumber(data.value.password)) {
      errorPassword.push('Contain at least one numeric character')
    }
    if (!emailValidation.containsSpecialChars(data.value.password)) {
      errorPassword.push('Contain at least one special character')
    }
    errors.value.password = errorPassword
  }

  return {
    data,
    errors,
    reset,
    isPasswordConfirmed,
    confirmPasswordValidation,
    passwordValidation
  }
}
