import axios from '@/axios'

interface ISearch {
  all: string
  name: string
}

export function useGetOwnersApi() {
  const send = async (search: ISearch, page: number) => {
    try {
      const response = await axios.get('/v1/owners', {
        params: {
          filter: {
            search: search.all,
            name: search.name
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
