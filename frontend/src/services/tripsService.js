import api from './api'

export async function fetchTrips(filter) {
  const response = await api.get('/trips', { params: filter })
  return response.data.data || { trips: [], meta: {} }
}

export async function fetchTrip(id) {
  const response = await api.get(`/trips/${id}`)
  return response.data.data
}

export async function createTrip(payload) {
  const response = await api.post('/trips', payload)
  return response.data.data
}
