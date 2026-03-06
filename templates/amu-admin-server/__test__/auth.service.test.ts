import { describe, expect, it } from 'vitest'
import { JwtService } from '@nestjs/jwt'
import { UnauthorizedException } from '@nestjs/common'
import { AuthService } from '../src/auth/auth.service'

describe('auth service', () => {
  const accessControlService = {
    validateUser: async (username: string) => ({ id: `user-${username}`, username }),
    getUserById: async (userId: string) => ({ id: userId, username: userId.replace(/^user-/, ''), status: 'ACTIVE' }),
    getAuthorizedContext: async (userId: string) => ({
      id: userId,
      username: userId.replace(/^user-/, ''),
      role: 'admin',
      displayName: '系统管理员',
      email: 'admin@amu-ui.com',
      department: '平台架构中心',
      departmentId: 'platform',
      title: 'Platform Owner',
      avatarSeed: 'seed',
      roles: [],
      permissions: ['*'],
      dataScope: 'ALL'
    }),
    filterMenus: async () => [{ key: '/dashboard', title: '仪表盘', icon: 'IconBarChart' }]
  }

  const authSessionStore = new Map<string, { id: string; userId: string; refreshTokenId: string; expiresAt: Date }>()
  const prisma = {
    authSession: {
      create: async ({ data }: { data: { id: string; userId: string; refreshTokenId: string; expiresAt: Date } }) => {
        authSessionStore.set(data.id, data)
        return data
      },
      findUnique: async ({ where }: { where: { id: string } }) => authSessionStore.get(where.id) ?? null,
      delete: async ({ where }: { where: { id: string } }) => authSessionStore.delete(where.id),
      deleteMany: async ({ where }: { where: { id: string } }) => authSessionStore.delete(where.id)
    }
  }

  const authService = new AuthService(new JwtService(), accessControlService as never, prisma as never)

  it('登录后返回令牌和菜单', async () => {
    const result = await authService.login('admin', '123456')

    expect(result.accessToken).toBeTruthy()
    expect(result.refreshToken).toBeTruthy()
    expect(result.currentUser.username).toBe('admin')
    expect(result.menus.length).toBeGreaterThan(0)
  })

  it('refresh token 可以轮换出新的访问令牌', async () => {
    const session = await authService.login('operator', '123456')
    const refreshed = await authService.refresh(session.refreshToken)

    expect(refreshed.accessToken).toBeTruthy()
    expect(refreshed.refreshToken).toBeTruthy()
    expect(refreshed.currentUser.username).toBe('operator')
  })

  it('缺失 refresh token 时返回 401 而不是 JWT 库异常', async () => {
    await expect(authService.refresh('')).rejects.toThrow(UnauthorizedException)
  })

  it('格式错误的 access token 返回 401', async () => {
    await expect(authService.verifyAccessToken('invalid-access-token')).rejects.toThrow(UnauthorizedException)
  })
})
