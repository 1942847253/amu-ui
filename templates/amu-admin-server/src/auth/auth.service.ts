import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { randomUUID } from 'node:crypto'
import { AccessControlService } from '../access-control/access-control.service'
import { PrismaService } from '../database/prisma.service'

interface TokenPayload {
  sub: string
  sid: string
  jti: string
  type: 'access' | 'refresh'
  username: string
}

@Injectable()
export class AuthService {
  private readonly accessSecret = process.env.AMU_ADMIN_ACCESS_SECRET || 'amu-admin-access-secret'
  private readonly refreshSecret = process.env.AMU_ADMIN_REFRESH_SECRET || 'amu-admin-refresh-secret'

  constructor(
    private readonly jwtService: JwtService,
    private readonly accessControlService: AccessControlService,
    private readonly prisma: PrismaService
  ) {}

  async login(username: string, password: string) {
    const user = await this.accessControlService.validateUser(username, password)
    return this.issueTokenPair(user.id, user.username)
  }

  async refresh(refreshToken: string) {
    const payload = await this.verifyRefreshToken(refreshToken)
    const session = await this.prisma.authSession.findUnique({
      where: { id: payload.sid }
    })

    if (!session || session.refreshTokenId !== payload.jti || session.expiresAt <= new Date()) {
      throw new UnauthorizedException('刷新令牌已失效')
    }

    await this.prisma.authSession.delete({ where: { id: session.id } })
    const user = await this.accessControlService.getUserById(payload.sub)
    return this.issueTokenPair(user.id, user.username)
  }

  async logout(accessToken: string) {
    const payload = await this.verifyAccessToken(accessToken)
    await this.prisma.authSession.deleteMany({ where: { id: payload.sid } })
    return { success: true }
  }

  async verifyAccessToken(token: string) {
    const payload = await this.verifyToken(token, this.accessSecret, 'access')
    if (payload.type !== 'access') {
      throw new UnauthorizedException('无效的访问令牌')
    }
    return payload
  }

  async verifyRefreshToken(token: string) {
    const payload = await this.verifyToken(token, this.refreshSecret, 'refresh')
    if (payload.type !== 'refresh') {
      throw new UnauthorizedException('无效的刷新令牌')
    }
    return payload
  }

  async getProfile(userId: string) {
    const currentUser = await this.accessControlService.getAuthorizedContext(userId)
    return {
      currentUser,
      menus: await this.accessControlService.filterMenus(currentUser.permissions)
    }
  }

  private async verifyToken(token: string, secret: string, tokenType: 'access' | 'refresh') {
    if (!token?.trim()) {
      throw new UnauthorizedException(tokenType === 'access' ? '缺少访问令牌' : '缺少刷新令牌')
    }

    try {
      return await this.jwtService.verifyAsync<TokenPayload>(token, { secret })
    } catch {
      throw new UnauthorizedException(tokenType === 'access' ? '无效的访问令牌' : '无效的刷新令牌')
    }
  }

  private async issueTokenPair(userId: string, username: string) {
    const sessionId = randomUUID()
    const refreshTokenId = randomUUID()
    const accessPayload: TokenPayload = {
      sub: userId,
      sid: sessionId,
      jti: randomUUID(),
      type: 'access',
      username
    }
    const refreshPayload: TokenPayload = {
      sub: userId,
      sid: sessionId,
      jti: refreshTokenId,
      type: 'refresh',
      username
    }

    const accessToken = await this.jwtService.signAsync(accessPayload, {
      secret: this.accessSecret,
      expiresIn: '15m'
    })
    const refreshToken = await this.jwtService.signAsync(refreshPayload, {
      secret: this.refreshSecret,
      expiresIn: '7d'
    })

    await this.prisma.authSession.create({
      data: {
        id: sessionId,
        userId,
        refreshTokenId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    })

    const currentUser = await this.accessControlService.getAuthorizedContext(userId)

    return {
      accessToken,
      refreshToken,
      expiresIn: 15 * 60,
      currentUser,
      menus: await this.accessControlService.filterMenus(currentUser.permissions)
    }
  }
}
