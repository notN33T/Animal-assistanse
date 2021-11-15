import { useState, useCallback, useEffect } from 'react'


const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [admin, setAdmin] = useState(false)
  const [userName, setUserName] = useState(null)
  const [avatar, setAvatar] = useState(null)
  const [ready, setReady] = useState(false)
  const login = useCallback((jwtToken, isAdmin, userName, avatar) => {
    setToken(jwtToken)
    setAdmin(isAdmin)
    setUserName(userName)
    setAvatar(avatar)
    localStorage.setItem(storageName, JSON.stringify({
      token: jwtToken,
      isAdmin: isAdmin,
      userName: userName,
      avatar: avatar,
    }))
    setReady(true)
  }, [])


  const logout = useCallback(() => {
    setToken(null)
    setAdmin(false)
    setUserName(null)
    setAvatar(null)
    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))

    if (data && data.token) {
      login(data.token, data.isAdmin, data.userName, data.avatar)
    }
    setReady(true)
  }, [login])


  return { login, logout, token, admin, ready, userName, avatar  }
} 