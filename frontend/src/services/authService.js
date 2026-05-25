import api from './api'

export async function loginUser({ email, password }) {
  const response = await api.post('/auth/login', { email, password })
  return response.data
}

export async function registerUser({ name, email, phone, password }) {
  const response = await api.post('/auth/register', {
    name,
    email,
    phone,
    password
  })
  return response.data
}

export async function verifyEmail({ email, code }) {
  const response = await api.post('/auth/verify-email', { email, code })
  return response.data
}

export async function resendVerificationCode({ email }) {
  const response = await api.post('/auth/verify-email/resend', { email })
  return response.data
}
