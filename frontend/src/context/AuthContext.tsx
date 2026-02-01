import { createContext, useState, useContext} from 'react'
import type { ReactNode } from 'react'
import type {LoginCredentials, RegisterCredentials } from '../types/Auth'
import type { User } from '../types/User'
import { loginUser, registerUser } from '../api/authApi'

interface AuthContextType {
  user: User | null
  token: string | null
  login: (data: LoginCredentials) => Promise<void>
  register: (data: RegisterCredentials) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function getToken(): string | null {
  return localStorage.getItem('token')
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(getToken())

  async function login(data: LoginCredentials) {
    const res = await loginUser(data)
    setUser(res.user)
    setToken(res.token)
    localStorage.setItem('token', res.token)
  }

  async function register(data: RegisterCredentials) {
    const res = await registerUser(data)
    setUser(res.user)
    setToken(res.token)
    localStorage.setItem('token', res.token)
  }

  function logout() {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}