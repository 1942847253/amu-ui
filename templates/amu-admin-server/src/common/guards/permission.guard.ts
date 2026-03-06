import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AccessControlService } from '../../access-control/access-control.service'
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator'
import type { AuthenticatedRequest } from '../interfaces/authenticated-request'

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly accessControlService: AccessControlService
  ) {}

  canActivate(context: ExecutionContext) {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true
    }

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>()
    const currentUser = request.authUser
    if (!currentUser) {
      return false
    }

    const passed = requiredPermissions.every((permission) => this.accessControlService.hasPermission(currentUser.permissions, permission))
    if (!passed) {
      throw new ForbiddenException('当前账号缺少接口访问权限')
    }

    return true
  }
}
