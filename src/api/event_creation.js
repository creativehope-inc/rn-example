import axios from './axios'

export const createEvent = async (values) => {
  await axios.post('/events', values)
}