import axios from '@/axios'
import { useAuthStore } from '@/stores/auth.store'

interface ISearch {
  all: string
  name: string
}

export function useGetDocumentsApi() {
  const authStore = useAuthStore()
  const send = async (search: ISearch, page: number) => {
    console.log('authStore', authStore.email)
    try {
      const response = await axios.get('/v1/documents', {
        params: {
          filter: {
            search: search.all,
            borrow_history: true,
            requested_by: authStore._id
          },
          page: page
        }
      })

      return {
        data: response.data.data,
        pagination: response.data.pagination
      }
    } catch (error) {
      console.log(error)
    }
  }

  return { send }
}
