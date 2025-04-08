import axios from '@/axios'
import { useAuthStore } from '@/stores/auth.store'

export function useGetDocumentApi() {
  const send = async (_id: string) => {
    try {
      const response = await axios.get(`/v1/documents/${_id}`)

      const authStore = useAuthStore()

      return {
        _id: response.data._id,
        user: authStore.name,
        document: `[${response.data.code}] ${response.data.name}`,
        required_date: response.data.required_date,
        return_due_date: response.data.return_due_date,
        reason_for_borrowing: response.data.reason_for_borrowing
      }
    } catch (error) {
      console.log(error)
    }
  }

  return { send }
}
