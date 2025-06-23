import { atom } from 'jotai'

interface User {
  id: string
  username: string
  email: string
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
}

// Initialize auth state from localStorage if available
const getInitialState = (): AuthState => {
  if (typeof window === 'undefined') {
    return { isAuthenticated: false, user: null }
  }
  
  const token = localStorage.getItem('token')
  const userStr = localStorage.getItem('user')
  
  if (token && userStr) {
    try {
      const user = JSON.parse(userStr)
      return { isAuthenticated: true, user }
    } catch (error) {
      console.error('Failed to parse user from localStorage', error)
    }
  }
  
  return { isAuthenticated: false, user: null }
}

export const authAtom = atom<AuthState>(getInitialState())
