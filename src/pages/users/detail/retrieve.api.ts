import axios from '@/axios'

export function useGetUserApi() {
  const send = async (_id: string) => {
    try {
      const response = await axios.get(`/v1/users/${_id}`)

      return {
        _id: response.data._id,
        username: response.data.username,
        email: response.data.email,
        name: response.data.name,
        role: response.data.role
      }
    } catch (error) {
      console.log(error)
    }
  }

  return { send }
}
