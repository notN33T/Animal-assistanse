import { useState, useCallback, useEffect } from 'react'


const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [admin, setAdmin] = useState(false)
  const login = useCallback((jwtToken, isAdmin) => {
    setToken(jwtToken)
    setAdmin(isAdmin)
    localStorage.setItem(storageName, JSON.stringify({
      token: jwtToken,
      isAdmin: isAdmin,
    }))
  }, [])


  const logout = useCallback(() => {
    setToken(null)
    setAdmin(false)
    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))

    if (data && data.token && data.isAdmin) {
      login(data.token, data.isAdmin) // <-- There some problem
    }
  }, [login])


  return { login, logout, token, admin }
} 