import axios from '@/axios'

export function useBorrowRejectDocumentApi() {
  const send = async (_id: string, borrow_id: string) => {
    const response = await axios.post(`/v1/documents/${_id}/borrow-reject/${borrow_id}`)
    if (response.status === 200) {
      return {
        matched_count: response.data.matched_count,
        modified_count: response.data.modified_count
      }
    }
  }

  return { send }
}
