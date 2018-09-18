import axios from './axios'

export const fetchEvents = async () => {
  const { data } = await axios.get('/events')
  return data
}