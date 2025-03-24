import axios from '@/axios'

export function useGetVaultsApi() {
  const send = async (search: string, page: number) => {
    try {
      const response = await axios.get('/v1/vaults', {
        params: {
          filter: {
            label: search
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
