import axios from '@/axios'

export function useReturnApproveDocumentApi() {
  const send = async (_id: string, return_id: string) => {
    const response = await axios.post(`/v1/documents/${_id}/return-approve/${return_id}`)
    if (response.status === 200) {
      return {
        matched_count: response.data.matched_count,
        modified_count: response.data.modified_count
      }
    }
  }

  return { send }
}
