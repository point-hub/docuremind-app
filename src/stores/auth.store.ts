import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface IAuth {
  _id?: string
  name?: string
  role?: string
}

export const useAuthStore = defineStore('auth-store', () => {
  const _id = ref('')
  const name = ref('')
  const role = ref('')

  const update = (auth: IAuth) => {
    if (auth._id) _id.value = auth._id
    if (auth.name) name.value = auth.name
    if (auth.role) role.value = auth.role
  }

  return {
    _id,
    name,
    role,
    update
  }
})
