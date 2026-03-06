import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLES_KEY } from '../decorators/roles.decorator'
import type { AuthenticatedRequest } from '../interfaces/authenticated-request'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if (!requiredRoles || requiredRoles.length === 0) {
      return true
    }

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>()
    const currentUser = request.authUser
    if (!currentUser) {
      return false
    }

    const passed = requiredRoles.some((requiredRole) => currentUser.roles.some((role) => role.code === requiredRole))
    if (!passed) {
      throw new ForbiddenException('当前账号缺少角色访问权限')
    }

    return true
  }
}
