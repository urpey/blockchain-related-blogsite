export interface UserState {
  error?: string
  token?: string
  user: User
}

export type Role = 'editor' | 'user' | 'guest'

export type User = {
  id?: number
  username?: string
  role: Role
}
