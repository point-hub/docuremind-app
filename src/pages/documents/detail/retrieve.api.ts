import { format } from 'date-fns'

import axios from '@/axios'

export function useGetDocumentApi() {
  const send = async (_id: string) => {
    try {
      const response = await axios.get(`/v1/documents/${_id}`)

      return {
        _id: response.data._id,
        cover_url: response.data.cover_url,
        cover_mime: response.data.cover_mime,
        document_files: response.data.document_files,
        code: response.data.code,
        name: response.data.name,
        type: response.data.type,
        owner: response.data.owner,
        vault: response.data.vault,
        rack: response.data.rack,
        issued_date: response.data.issued_date,
        expired_date: response.data.expired_date,
        status: response.data.status,
        notes: response.data.notes,
        created_at: response.data.created_at
          ? format(response.data.created_at, 'yyyy-MM-dd HH:mm')
          : '',
        updated_at: response.data.updated_at
          ? format(response.data.updated_at, 'yyyy-MM-dd HH:mm')
          : '',
        created_by: response.data.created_by?.label,
        updated_by: response.data.updated_by?.label
      }
    } catch (error) {
      console.log(error)
    }
  }

  return { send }
}
