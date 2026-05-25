import React, { createContext, useContext, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('aimtravel_token'))

  const login = (tokenValue) => {
    localStorage.setItem('aimtravel_token', tokenValue)
    setToken(tokenValue)
  }

  const logout = () => {
    localStorage.removeItem('aimtravel_token')
    setToken(null)
  }

  const value = useMemo(
    () => ({ token, isAuthenticated: Boolean(token), login, logout }),
    [token]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
