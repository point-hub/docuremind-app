import axios from '@/axios'

interface ISearch {
  all: string
  code: string
  name: string
  owner: string
  vault: string
  rack: string
  is_expired: string
}

export function useGetDocumentsApi() {
  const send = async (search: ISearch, page: number) => {
    try {
      const response = await axios.get('/v1/documents', {
        params: {
          filter: {
            search: search.all,
            code: search.code,
            name: search.name,
            owner: search.owner,
            vault: search.vault,
            rack: search.rack,
            is_expired: search.is_expired
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
