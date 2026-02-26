export type UserRole = 'admin' | 'operator' | 'auditor'

export interface UserProfile {
  username: string
  role: UserRole
}
