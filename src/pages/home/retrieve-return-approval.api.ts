import axios from '@/axios'

interface ISearch {
  all: string
  name: string
}

export function useGetDocumentsApi() {
  const send = async (search: ISearch, page: number) => {
    try {
      const response = await axios.get('/v1/documents', {
        params: {
          filter: {
            search: search.all,
            return_approval: true
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
