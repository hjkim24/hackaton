export interface User {
  id: string
  age: number
  gender: string
  college: string
  major: string
  username: string
  admissionYear: number
  nickname: string
  name: string
  mbti: string
  avatar?: string
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}
