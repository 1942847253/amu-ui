import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { UserProfile, UserRole } from '../types/auth'
import { readStorage, readStorageJson, readStorageNumber, removeStorage, writeStorage } from '../utils/storage'
import { createTokenPair } from '../utils/token'

const ACCESS_TOKEN_KEY = 'amu-admin-access-token'
const REFRESH_TOKEN_KEY = 'amu-admin-refresh-token'
const ACCESS_EXPIRES_AT_KEY = 'amu-admin-access-expires-at'
const USER_KEY = 'amu-admin-user'
const PERMISSION_KEY = 'amu-admin-permissions'

const rolePermissionMap: Record<UserRole, string[]> = {
  admin: ['*'],
  operator: ['dashboard:view', 'system:user:view'],
  auditor: ['dashboard:view']
}

const isUserRole = (value: unknown): value is UserRole => {
  return value === 'admin' || value === 'operator' || value === 'auditor'
}

const isUserProfile = (value: unknown): value is UserProfile => {
  if (!value || typeof value !== 'object') return false

  const candidate = value as { username?: unknown; role?: unknown }
  return typeof candidate.username === 'string' && candidate.username.length > 0 && isUserRole(candidate.role)
}

const isStringArray = (value: unknown): value is string[] => {
  return Array.isArray(value) && value.every((item) => typeof item === 'string')
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string>(readStorage(ACCESS_TOKEN_KEY))
  const refreshTokenValue = ref<string>(readStorage(REFRESH_TOKEN_KEY))
  const accessTokenExpiresAt = ref<number>(readStorageNumber(ACCESS_EXPIRES_AT_KEY, 0))
  const user = ref<UserProfile | null>(readStorageJson<UserProfile | null>(USER_KEY, (value): value is UserProfile | null => value === null || isUserProfile(value), null))
  const permissions = ref<string[]>(readStorageJson<string[]>(PERMISSION_KEY, isStringArray, []))

  if (user.value && permissions.value.length === 0) {
    permissions.value = rolePermissionMap[user.value.role]
    writeStorage(PERMISSION_KEY, JSON.stringify(permissions.value))
  }

  const isAuthenticated = computed(() => Boolean(token.value && refreshTokenValue.value && user.value))

  const shouldRefreshSoon = (windowMs = 60 * 1000) => {
    if (!token.value || !accessTokenExpiresAt.value) return false
    return accessTokenExpiresAt.value - Date.now() <= windowMs
  }

  const hasPermission = (required?: string | string[]) => {
    if (!required) return true
    if (permissions.value.includes('*')) return true
    const requiredList = Array.isArray(required) ? required : [required]
    return requiredList.every((item) => permissions.value.includes(item))
  }

  const login = (username: string, password: string) => {
    if (!username || !password) return false

    const role: UserRole = username === 'admin' ? 'admin' : username === 'audit' ? 'auditor' : 'operator'
    const profile: UserProfile = { username, role }

    const nextTokenPair = createTokenPair(role)

    setAuthTokens(nextTokenPair.accessToken, nextTokenPair.refreshToken, nextTokenPair.expiresAt)
    user.value = profile
    permissions.value = rolePermissionMap[role]

    writeStorage(USER_KEY, JSON.stringify(profile))
    writeStorage(PERMISSION_KEY, JSON.stringify(permissions.value))

    return true
  }

  const setToken = (nextToken: string, expiresAt = Date.now() + 5 * 60 * 1000) => {
    token.value = nextToken
    accessTokenExpiresAt.value = expiresAt
    writeStorage(ACCESS_TOKEN_KEY, nextToken)
    writeStorage(ACCESS_EXPIRES_AT_KEY, String(expiresAt))
  }

  const setRefreshToken = (nextRefreshToken: string) => {
    refreshTokenValue.value = nextRefreshToken
    writeStorage(REFRESH_TOKEN_KEY, nextRefreshToken)
  }

  const setAuthTokens = (nextAccessToken: string, nextRefreshToken: string, expiresAt: number) => {
    setToken(nextAccessToken, expiresAt)
    setRefreshToken(nextRefreshToken)
  }

  const applyRefreshResult = (nextAccessToken: string, nextRefreshToken: string, expiresAt: number) => {
    setAuthTokens(nextAccessToken, nextRefreshToken, expiresAt)
  }

  const logout = () => {
    token.value = ''
    refreshTokenValue.value = ''
    accessTokenExpiresAt.value = 0
    user.value = null
    permissions.value = []
    removeStorage(ACCESS_TOKEN_KEY)
    removeStorage(REFRESH_TOKEN_KEY)
    removeStorage(ACCESS_EXPIRES_AT_KEY)
    removeStorage(USER_KEY)
    removeStorage(PERMISSION_KEY)
  }

  if ((token.value || refreshTokenValue.value) && !user.value) {
    logout()
  }

  return {
    token,
    refreshTokenValue,
    accessTokenExpiresAt,
    user,
    permissions,
    isAuthenticated,
    shouldRefreshSoon,
    hasPermission,
    login,
    setToken,
    setRefreshToken,
    setAuthTokens,
    applyRefreshResult,
    logout
  }
})
