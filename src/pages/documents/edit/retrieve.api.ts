import axios from '@/axios'

export function useGetDocumentApi() {
  const send = async (_id: string) => {
    try {
      const response = await axios.get(`/v1/documents/${_id}`)

      return {
        _id: response.data._id,
        name: response.data.name
      }
    } catch (error) {
      console.log(error)
    }
  }

  return { send }
}
