import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthService } from '../../auth/auth.service'
import { IS_PUBLIC_KEY } from '../decorators/public.decorator'
import type { AuthenticatedRequest } from '../interfaces/authenticated-request'
import { AccessControlService } from '../../access-control/access-control.service'

@Injectable()
export class PublicGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
    private readonly accessControlService: AccessControlService
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if (isPublic) {
      return true
    }

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>()
    const authorizationHeader = request.headers.authorization
    const accessToken = authorizationHeader?.replace(/^Bearer\s+/i, '')

    if (!accessToken) {
      throw new UnauthorizedException('缺少访问令牌')
    }

    const payload = await this.authService.verifyAccessToken(accessToken)
    request.accessToken = accessToken
    request.authUser = await this.accessControlService.getAuthorizedContext(payload.sub)
    return true
  }
}
