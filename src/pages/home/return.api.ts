import axios from '@/axios'

export function useReturnDocumentApi() {
  const send = async (_id: string) => {
    const response = await axios.post(`/v1/documents/${_id}/return`)
    if (response.status === 200) {
      return {
        matched_count: response.data.matched_count,
        modified_count: response.data.modified_count
      }
    }
  }

  return { send }
}
