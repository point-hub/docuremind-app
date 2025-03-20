import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface IAuth {
  _id?: string
  name?: string
}

export const useAuthStore = defineStore('auth-store', () => {
  const _id = ref()
  const name = ref()
  const permission = ref()

  const update = (auth: IAuth) => {
    if (auth._id) _id.value = auth._id
    if (auth.name) name.value = auth.name
  }

  return {
    _id,
    name,
    permission,
    update
  }
})
