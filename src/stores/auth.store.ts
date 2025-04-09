import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface IAuth {
  _id?: string
  email?: string
  name?: string
  role?: string
}

export const useAuthStore = defineStore('auth-store', () => {
  const _id = ref('')
  const name = ref('')
  const email = ref('')
  const role = ref('')

  const update = (auth: IAuth) => {
    if (auth._id) _id.value = auth._id
    if (auth.email) email.value = auth.email
    if (auth.name) name.value = auth.name
    if (auth.role) role.value = auth.role
  }

  return {
    _id,
    email,
    name,
    role,
    update
  }
})
