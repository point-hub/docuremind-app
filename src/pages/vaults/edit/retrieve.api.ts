import axios from '@/axios'

export function useGetVaultApi() {
  const send = async (_id: string) => {
    try {
      const response = await axios.get(`/v1/vaults/${_id}`)

      return {
        _id: response.data._id,
        code: response.data.code,
        name: response.data.name,
        racks: response.data.racks
      }
    } catch (error) {
      console.log(error)
    }
  }

  return { send }
}
