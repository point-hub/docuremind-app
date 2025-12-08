import axios from '@/axios'

interface ISearch {
  all: string
  user_id: string
  name: string
}

export function useGetActivitiesApi() {
  const send = async (search: ISearch, page: number) => {
    try {
      const response = await axios.get('/v1/user-activities', {
        params: {
          filter: {
            search: search.all,
            user_id: search.user_id,
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
