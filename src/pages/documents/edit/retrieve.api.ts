import axios from '@/axios'

export function useGetDocumentApi() {
  const send = async (_id: string) => {
    try {
      const response = await axios.get(`/v1/documents/${_id}`)

      return {
        _id: response.data._id,
        code: response.data.code,
        name: response.data.name,
        type: response.data.type,
        owner: response.data.owner,
        vault: response.data.vault,
        rack: response.data.rack,
        issued_date: response.data.issued_date,
        expired_date: response.data.expired_date,
        status: response.data.status,
        notes: response.data.notes
      }
    } catch (error) {
      console.log(error)
    }
  }

  return { send }
}
