import { createContext } from 'react'

function noop() { }

export const AuthContext = createContext({
  ready: false,
  token: null,
  login: noop,
  logout: noop,
  isAuthenticated: false,
  admin: false,
  avatar: null,
  userName: null,
})