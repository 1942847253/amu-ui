import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { compare, hashSync } from 'bcryptjs'
import { PrismaService } from '../database/prisma.service'
import type { AuthorizedUserContext, DataScope, DepartmentRecord, MenuRecord, PermissionRecord, RoleRecord, UserRecord } from './access-control.types'
import type { UpsertPermissionDto } from './dto/upsert-permission.dto'
import type { UpsertRoleDto } from './dto/upsert-role.dto'
import type { UpsertUserDto } from './dto/upsert-user.dto'

@Injectable()
export class AccessControlService {
  constructor(private readonly prisma: PrismaService) {}

  private get db(): any {
    return this.prisma
  }

  private parseStringArray(value: unknown) {
    if (!Array.isArray(value)) return []
    return value.filter((item): item is string => typeof item === 'string')
  }

  private mapPermissionRecord(permission: any): PermissionRecord {
    return {
      code: permission.code,
      name: permission.name,
      module: permission.module,
      apiScopes: this.parseStringArray(permission.apiScopes)
    }
  }

  private mapRoleRecord(role: any): RoleRecord {
    return {
      id: role.id,
      code: role.code,
      name: role.name,
      description: role.description,
      dataScope: role.dataScope,
      permissionCodes: (role.rolePermissions ?? []).map((entry: any) => entry.permission.code)
    }
  }

  private mapUserCatalogRow(user: any) {
    return {
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      email: user.email,
      title: user.title,
      status: user.status,
      department: user.department?.name || '',
      roleCodes: (user.userRoles ?? []).map((entry: any) => entry.role.code),
      directPermissionCodes: (user.directPermissions ?? []).map((entry: any) => entry.permission.code)
    }
  }

  private resolvePermissionCodesFromRecords(directPermissionCodes: string[], roles: RoleRecord[]) {
    const permissionSet = new Set<string>(directPermissionCodes)
    roles.forEach((role) => {
      role.permissionCodes.forEach((code) => permissionSet.add(code))
    })
    return Array.from(permissionSet)
  }

  private async ensureAdminUserRemains(excludedUserId?: string, client: any = this.prisma) {
    const count = await client.user.count({
      where: {
        status: 'ACTIVE',
        ...(excludedUserId ? { NOT: { id: excludedUserId } } : {}),
        userRoles: {
          some: {
            role: {
              code: 'platform_admin'
            }
          }
        }
      }
    })

    if (count === 0) {
      throw new BadRequestException('系统至少需要保留一个启用中的平台管理员')
    }
  }

  private async ensureDepartmentExists(departmentId: string, client: any = this.prisma) {
    const department = await client.department.findUnique({ where: { id: departmentId } })
    if (!department) {
      throw new BadRequestException('部门不存在')
    }
  }

  private async getRoleEntitiesByCodes(roleCodes: string[], client: any = this.prisma) {
    if (roleCodes.length === 0) return []
    const roles = await client.role.findMany({ where: { code: { in: roleCodes } } })
    if (roles.length !== roleCodes.length) {
      const existingCodes = new Set(roles.map((role: any) => role.code))
      const missingCodes = roleCodes.filter((code) => !existingCodes.has(code))
      throw new BadRequestException(`角色不存在: ${missingCodes.join(', ')}`)
    }
    return roles
  }

  private async getPermissionEntitiesByCodes(permissionCodes: string[], client: any = this.prisma) {
    if (permissionCodes.length === 0) return []
    const permissions = await client.permission.findMany({ where: { code: { in: permissionCodes } } })
    if (permissions.length !== permissionCodes.length) {
      const existingCodes = new Set(permissions.map((permission: any) => permission.code))
      const missingCodes = permissionCodes.filter((code) => !existingCodes.has(code))
      throw new BadRequestException(`权限点不存在: ${missingCodes.join(', ')}`)
    }
    return permissions
  }

  private async writeAuditLog(operator: string, action: string, resource: string, client: any = this.prisma) {
    await client.auditLog.create({
      data: {
        id: `audit-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
        operator,
        action,
        resource,
        result: 'SUCCESS'
      }
    })
  }

  private async buildMenuTree() {
    const menuRows = await this.db.menu.findMany({
      orderBy: [{ sortOrder: 'asc' }, { key: 'asc' }]
    })

    const nodes = new Map<string, MenuRecord & { id: string; parentId?: string | null }>()
    menuRows.forEach((row: any) => {
      const permissionCodes = this.parseStringArray(row.permissionCodes)
      nodes.set(row.id, {
        id: row.id,
        key: row.key,
        title: row.title,
        icon: row.icon,
        parentId: row.parentId,
        permission: permissionCodes.length === 0 ? undefined : permissionCodes.length === 1 ? permissionCodes[0] : permissionCodes,
        children: []
      })
    })

    const roots: Array<MenuRecord & { id: string; parentId?: string | null }> = []
    nodes.forEach((node) => {
      if (!node.parentId) {
        roots.push(node)
        return
      }

      const parent = nodes.get(node.parentId)
      if (parent) {
        parent.children = parent.children ?? []
        parent.children.push(node)
      }
    })

    const strip = (node: MenuRecord & { id: string; parentId?: string | null }): MenuRecord => ({
      key: node.key,
      title: node.title,
      icon: node.icon,
      permission: node.permission,
      children: node.children?.length ? node.children.map((child) => strip(child as MenuRecord & { id: string; parentId?: string | null })) : undefined
    })

    return roots.map((node) => strip(node))
  }

  private async loadUserAuthRecord(userId: string) {
    const user = await this.db.user.findUnique({
      where: { id: userId },
      include: {
        department: true,
        userRoles: {
          include: {
            role: {
              include: {
                rolePermissions: {
                  include: {
                    permission: true
                  }
                }
              }
            }
          }
        },
        directPermissions: {
          include: {
            permission: true
          }
        }
      }
    })

    if (!user) {
      throw new UnauthorizedException('用户不存在')
    }

    return user
  }

  async validateUser(username: string, password: string) {
    const user = await this.db.user.findUnique({
      where: {
        username: username.trim().toLowerCase()
      }
    })

    if (!user || user.status !== 'ACTIVE') {
      throw new UnauthorizedException('账号不存在或已被禁用')
    }

    const passed = await compare(password, user.passwordHash)
    if (!passed) {
      throw new UnauthorizedException('用户名或密码错误')
    }

    return user
  }

  async getUserById(userId: string) {
    const user = await this.db.user.findUnique({ where: { id: userId } })
    if (!user) {
      throw new UnauthorizedException('用户不存在')
    }
    return user
  }

  async getAuthorizedContext(userId: string): Promise<AuthorizedUserContext> {
    const user = await this.loadUserAuthRecord(userId)
    if (user.status !== 'ACTIVE') {
      throw new UnauthorizedException('账号不存在或已被禁用')
    }

    const roles = user.userRoles.map((entry: any) => this.mapRoleRecord(entry.role))
    const permissions = this.resolvePermissionCodesFromRecords(
      user.directPermissions.map((entry: any) => entry.permission.code),
      roles
    )

    return {
      id: user.id,
      username: user.username,
      role: this.resolveUserRole(roles, permissions),
      displayName: user.displayName,
      email: user.email,
      department: user.department?.name || '',
      departmentId: user.departmentId,
      title: user.title,
      avatarSeed: `${user.username}-${user.id}`,
      roles,
      permissions,
      dataScope: this.resolveDataScope(roles)
    }
  }

  private resolveUserRole(roles: RoleRecord[], permissions: string[]): AuthorizedUserContext['role'] {
    if (permissions.includes('*')) return 'admin'
    if (permissions.includes('security:policy:read') || permissions.includes('system:auth:debug')) return 'security'
    if (roles.some((role) => role.name.includes('审计')) || permissions.includes('audit:log:read')) return 'auditor'
    return 'operator'
  }

  resolveDataScope(roles: RoleRecord[]): DataScope {
    if (roles.some((role) => role.dataScope === 'ALL')) return 'ALL'
    if (roles.some((role) => role.dataScope === 'CUSTOM')) return 'CUSTOM'
    if (roles.some((role) => role.dataScope === 'DEPARTMENT_AND_CHILDREN')) return 'DEPARTMENT_AND_CHILDREN'
    if (roles.some((role) => role.dataScope === 'DEPARTMENT')) return 'DEPARTMENT'
    return 'SELF'
  }

  hasPermission(granted: string[], required: string) {
    if (granted.includes('*')) return true
    if (granted.includes(required)) return true
    const requiredParts = required.split(':')
    return granted.some((permission) => {
      if (!permission.endsWith(':*')) return false
      const prefix = permission.slice(0, -2)
      return required.startsWith(`${prefix}:`) || prefix === requiredParts[0]
    })
  }

  hasRole(userRoles: RoleRecord[], requiredRole: string) {
    return userRoles.some((role) => role.code === requiredRole)
  }

  async filterMenus(grantedPermissions: string[], menus?: MenuRecord[]): Promise<MenuRecord[]> {
    const sourceMenus = menus ?? await this.buildMenuTree()
    const filteredMenus: MenuRecord[] = []

    for (const menu of sourceMenus) {
      const nextChildren = menu.children ? await this.filterMenus(grantedPermissions, menu.children) : undefined
      const permissionList = Array.isArray(menu.permission)
        ? menu.permission
        : menu.permission
          ? [menu.permission]
          : []
      const allowed = permissionList.length === 0 || permissionList.every((permission) => this.hasPermission(grantedPermissions, permission))

      if (!allowed && (!nextChildren || nextChildren.length === 0)) {
        continue
      }

      filteredMenus.push({
        ...menu,
        children: nextChildren && nextChildren.length > 0 ? nextChildren : undefined
      })
    }

    return filteredMenus
  }

  async getPermissionCatalog() {
    const permissions = await this.db.permission.findMany({
      orderBy: [{ module: 'asc' }, { code: 'asc' }]
    })
    return permissions.map((permission: any) => this.mapPermissionRecord(permission))
  }

  async getRoleCatalog() {
    const roles = await this.db.role.findMany({
      include: {
        rolePermissions: {
          include: {
            permission: true
          }
        }
      },
      orderBy: [{ code: 'asc' }]
    })
    return roles.map((role: any) => this.mapRoleRecord(role))
  }

  async getDepartmentCatalog(): Promise<DepartmentRecord[]> {
    const departments = await this.db.department.findMany({
      select: {
        id: true,
        name: true,
        parentId: true
      },
      orderBy: [{ name: 'asc' }]
    })

    return departments.map((department: any) => ({
      id: department.id,
      name: department.name,
      parentId: department.parentId ?? undefined
    }))
  }

  async createUser(payload: UpsertUserDto, operator = 'system') {
    const username = payload.username.trim().toLowerCase()
    const email = payload.email.trim().toLowerCase()

    const duplicateUser = await this.db.user.findFirst({
      where: {
        OR: [{ username }, { email }]
      }
    })
    if (duplicateUser) {
      throw new BadRequestException(duplicateUser.username === username ? '用户名已存在' : '邮箱已存在')
    }

    return this.db.$transaction(async (tx: any) => {
      await this.ensureDepartmentExists(payload.departmentId, tx)
      const roles = await this.getRoleEntitiesByCodes(payload.roleCodes, tx)
      await this.getPermissionEntitiesByCodes(payload.directPermissionCodes, tx)

      const userId = `user-${Date.now()}`
      await tx.user.create({
        data: {
          id: userId,
          username,
          displayName: payload.displayName.trim(),
          email,
          departmentId: payload.departmentId,
          title: payload.title.trim(),
          status: payload.status,
          passwordHash: hashSync(payload.password || '123456', 10)
        }
      })

      if (roles.length > 0) {
        await tx.userRole.createMany({
          data: roles.map((role: any) => ({ userId, roleId: role.id }))
        })
      }

      if (payload.directPermissionCodes.length > 0) {
        await tx.userDirectPermission.createMany({
          data: payload.directPermissionCodes.map((permissionCode) => ({ userId, permissionCode }))
        })
      }

      await this.writeAuditLog(operator, '创建用户', `user:${username}`, tx)

      const user = await tx.user.findUnique({
        where: { id: userId },
        include: {
          department: true,
          userRoles: { include: { role: true } },
          directPermissions: { include: { permission: true } }
        }
      })

      return this.mapUserCatalogRow(user)
    })
  }

  async updateUser(userId: string, payload: UpsertUserDto, operator = 'system') {
    const currentUser = await this.db.user.findUnique({
      where: { id: userId },
      include: {
        userRoles: {
          include: {
            role: true
          }
        }
      }
    })
    if (!currentUser) {
      throw new NotFoundException('用户不存在')
    }

    const username = payload.username.trim().toLowerCase()
    const email = payload.email.trim().toLowerCase()
    const duplicateUser = await this.db.user.findFirst({
      where: {
        id: { not: userId },
        OR: [{ username }, { email }]
      }
    })
    if (duplicateUser) {
      throw new BadRequestException(duplicateUser.username === username ? '用户名已存在' : '邮箱已存在')
    }

    const wasAdmin = currentUser.userRoles.some((entry: any) => entry.role.code === 'platform_admin')
    const nextIsAdmin = payload.roleCodes.includes('platform_admin')
    if (wasAdmin && (!nextIsAdmin || payload.status !== 'ACTIVE')) {
      await this.ensureAdminUserRemains(currentUser.id)
    }

    return this.db.$transaction(async (tx: any) => {
      await this.ensureDepartmentExists(payload.departmentId, tx)
      const roles = await this.getRoleEntitiesByCodes(payload.roleCodes, tx)
      await this.getPermissionEntitiesByCodes(payload.directPermissionCodes, tx)

      await tx.user.update({
        where: { id: userId },
        data: {
          username,
          displayName: payload.displayName.trim(),
          email,
          departmentId: payload.departmentId,
          title: payload.title.trim(),
          status: payload.status,
          ...(payload.password ? { passwordHash: hashSync(payload.password, 10) } : {})
        }
      })

      await tx.userRole.deleteMany({ where: { userId } })
      await tx.userDirectPermission.deleteMany({ where: { userId } })

      if (roles.length > 0) {
        await tx.userRole.createMany({
          data: roles.map((role: any) => ({ userId, roleId: role.id }))
        })
      }

      if (payload.directPermissionCodes.length > 0) {
        await tx.userDirectPermission.createMany({
          data: payload.directPermissionCodes.map((permissionCode) => ({ userId, permissionCode }))
        })
      }

      await this.writeAuditLog(operator, '更新用户', `user:${username}`, tx)

      const user = await tx.user.findUnique({
        where: { id: userId },
        include: {
          department: true,
          userRoles: { include: { role: true } },
          directPermissions: { include: { permission: true } }
        }
      })

      return this.mapUserCatalogRow(user)
    })
  }

  async setUserStatus(userId: string, status: UserRecord['status'], operator = 'system', operatorUserId?: string) {
    const currentUser = await this.db.user.findUnique({
      where: { id: userId },
      include: {
        userRoles: { include: { role: true } }
      }
    })
    if (!currentUser) {
      throw new NotFoundException('用户不存在')
    }

    if (operatorUserId && operatorUserId === userId) {
      throw new BadRequestException('不能修改自己的启停状态')
    }

    if (currentUser.userRoles.some((entry: any) => entry.role.code === 'platform_admin') && status !== 'ACTIVE') {
      await this.ensureAdminUserRemains(currentUser.id)
    }

    return this.db.$transaction(async (tx: any) => {
      await tx.user.update({
        where: { id: userId },
        data: { status }
      })
      await this.writeAuditLog(operator, status === 'ACTIVE' ? '启用用户' : '锁定用户', `user:${currentUser.username}`, tx)

      const user = await tx.user.findUnique({
        where: { id: userId },
        include: {
          department: true,
          userRoles: { include: { role: true } },
          directPermissions: { include: { permission: true } }
        }
      })

      return this.mapUserCatalogRow(user)
    })
  }

  async resetUserPassword(userId: string, operator = 'system') {
    const currentUser = await this.db.user.findUnique({ where: { id: userId } })
    if (!currentUser) {
      throw new NotFoundException('用户不存在')
    }

    const temporaryPassword = '123456'
    await this.db.$transaction(async (tx: any) => {
      await tx.user.update({
        where: { id: userId },
        data: {
          passwordHash: hashSync(temporaryPassword, 10)
        }
      })
      await this.writeAuditLog(operator, '重置用户密码', `user:${currentUser.username}`, tx)
    })

    return {
      userId,
      temporaryPassword
    }
  }

  async removeUser(userId: string, operator = 'system', operatorUserId?: string) {
    const currentUser = await this.db.user.findUnique({
      where: { id: userId },
      include: {
        userRoles: { include: { role: true } }
      }
    })
    if (!currentUser) {
      throw new NotFoundException('用户不存在')
    }

    if (operatorUserId && operatorUserId === userId) {
      throw new BadRequestException('不能删除当前登录用户')
    }

    if (currentUser.userRoles.some((entry: any) => entry.role.code === 'platform_admin')) {
      await this.ensureAdminUserRemains(currentUser.id)
    }

    await this.db.$transaction(async (tx: any) => {
      await tx.user.delete({ where: { id: userId } })
      await this.writeAuditLog(operator, '删除用户', `user:${currentUser.username}`, tx)
    })

    return { success: true }
  }

  async createRole(payload: UpsertRoleDto, operator = 'system') {
    const code = payload.code.trim()
    const duplicateRole = await this.db.role.findUnique({ where: { code } })
    if (duplicateRole) {
      throw new BadRequestException('角色编码已存在')
    }

    return this.db.$transaction(async (tx: any) => {
      await this.getPermissionEntitiesByCodes(payload.permissionCodes, tx)

      const roleId = `role-${Date.now()}`
      await tx.role.create({
        data: {
          id: roleId,
          code,
          name: payload.name.trim(),
          description: payload.description.trim(),
          dataScope: payload.dataScope
        }
      })

      if (payload.permissionCodes.length > 0) {
        await tx.rolePermission.createMany({
          data: payload.permissionCodes.map((permissionCode) => ({ roleId, permissionCode }))
        })
      }

      await this.writeAuditLog(operator, '创建角色', `role:${code}`, tx)

      const role = await tx.role.findUnique({
        where: { id: roleId },
        include: {
          rolePermissions: {
            include: {
              permission: true
            }
          }
        }
      })

      return this.mapRoleRecord(role)
    })
  }

  async updateRole(roleId: string, payload: UpsertRoleDto, operator = 'system') {
    const currentRole = await this.db.role.findUnique({ where: { id: roleId } })
    if (!currentRole) {
      throw new NotFoundException('角色不存在')
    }

    const code = payload.code.trim()
    const duplicateRole = await this.db.role.findFirst({
      where: {
        id: { not: roleId },
        code
      }
    })
    if (duplicateRole) {
      throw new BadRequestException('角色编码已存在')
    }

    return this.db.$transaction(async (tx: any) => {
      await this.getPermissionEntitiesByCodes(payload.permissionCodes, tx)

      await tx.role.update({
        where: { id: roleId },
        data: {
          code,
          name: payload.name.trim(),
          description: payload.description.trim(),
          dataScope: payload.dataScope
        }
      })

      await tx.rolePermission.deleteMany({ where: { roleId } })
      if (payload.permissionCodes.length > 0) {
        await tx.rolePermission.createMany({
          data: payload.permissionCodes.map((permissionCode) => ({ roleId, permissionCode }))
        })
      }

      await this.writeAuditLog(operator, '更新角色', `role:${code}`, tx)

      const role = await tx.role.findUnique({
        where: { id: roleId },
        include: {
          rolePermissions: {
            include: {
              permission: true
            }
          }
        }
      })

      return this.mapRoleRecord(role)
    })
  }

  async removeRole(roleId: string, operator = 'system') {
    const currentRole = await this.db.role.findUnique({ where: { id: roleId } })
    if (!currentRole) {
      throw new NotFoundException('角色不存在')
    }

    const userCount = await this.db.userRole.count({ where: { roleId } })
    if (userCount > 0) {
      throw new BadRequestException('角色仍被用户使用，无法删除')
    }

    await this.db.$transaction(async (tx: any) => {
      await tx.role.delete({ where: { id: roleId } })
      await this.writeAuditLog(operator, '删除角色', `role:${currentRole.code}`, tx)
    })

    return { success: true }
  }

  async createPermission(payload: UpsertPermissionDto, operator = 'system') {
    const code = payload.code.trim()
    const duplicatePermission = await this.db.permission.findUnique({ where: { code } })
    if (duplicatePermission) {
      throw new BadRequestException('权限编码已存在')
    }

    return this.db.$transaction(async (tx: any) => {
      const permission = await tx.permission.create({
        data: {
          code,
          name: payload.name.trim(),
          module: payload.module.trim(),
          apiScopes: payload.apiScopes.map((scope) => scope.trim()).filter(Boolean)
        }
      })

      await this.writeAuditLog(operator, '创建权限点', `permission:${code}`, tx)
      return this.mapPermissionRecord(permission)
    })
  }

  async updatePermission(previousCode: string, payload: UpsertPermissionDto, operator = 'system') {
    const currentPermission = await this.db.permission.findUnique({ where: { code: previousCode } })
    if (!currentPermission) {
      throw new NotFoundException('权限点不存在')
    }

    const nextCode = payload.code.trim()
    if (nextCode !== previousCode) {
      const duplicatePermission = await this.db.permission.findUnique({ where: { code: nextCode } })
      if (duplicatePermission) {
        throw new BadRequestException('权限编码已存在')
      }
    }

    return this.db.$transaction(async (tx: any) => {
      const apiScopes = payload.apiScopes.map((scope) => scope.trim()).filter(Boolean)

      if (nextCode === previousCode) {
        const permission = await tx.permission.update({
          where: { code: previousCode },
          data: {
            name: payload.name.trim(),
            module: payload.module.trim(),
            apiScopes
          }
        })
        await this.writeAuditLog(operator, '更新权限点', `permission:${nextCode}`, tx)
        return this.mapPermissionRecord(permission)
      }

      await tx.permission.create({
        data: {
          code: nextCode,
          name: payload.name.trim(),
          module: payload.module.trim(),
          apiScopes
        }
      })

      const roleLinks = await tx.rolePermission.findMany({ where: { permissionCode: previousCode } })
      const userLinks = await tx.userDirectPermission.findMany({ where: { permissionCode: previousCode } })

      if (roleLinks.length > 0) {
        await tx.rolePermission.createMany({
          data: roleLinks.map((link: any) => ({ roleId: link.roleId, permissionCode: nextCode })),
          skipDuplicates: true
        })
        await tx.rolePermission.deleteMany({ where: { permissionCode: previousCode } })
      }

      if (userLinks.length > 0) {
        await tx.userDirectPermission.createMany({
          data: userLinks.map((link: any) => ({ userId: link.userId, permissionCode: nextCode })),
          skipDuplicates: true
        })
        await tx.userDirectPermission.deleteMany({ where: { permissionCode: previousCode } })
      }

      const menus = await tx.menu.findMany({ select: { id: true, permissionCodes: true } })
      for (const menu of menus) {
        const previousPermissionCodes = this.parseStringArray(menu.permissionCodes)
        const nextPermissionCodes = previousPermissionCodes.map((code) => code === previousCode ? nextCode : code)
        if (JSON.stringify(nextPermissionCodes) !== JSON.stringify(previousPermissionCodes)) {
          await tx.menu.update({
            where: { id: menu.id },
            data: { permissionCodes: nextPermissionCodes }
          })
        }
      }

      await tx.permission.delete({ where: { code: previousCode } })
      await this.writeAuditLog(operator, '更新权限点', `permission:${nextCode}`, tx)

      const permission = await tx.permission.findUnique({ where: { code: nextCode } })
      return this.mapPermissionRecord(permission)
    })
  }

  async removePermission(code: string, operator = 'system') {
    const currentPermission = await this.db.permission.findUnique({ where: { code } })
    if (!currentPermission) {
      throw new NotFoundException('权限点不存在')
    }

    const [roleCount, userCount, menus] = await Promise.all([
      this.db.rolePermission.count({ where: { permissionCode: code } }),
      this.db.userDirectPermission.count({ where: { permissionCode: code } }),
      this.db.menu.findMany({ select: { permissionCodes: true } })
    ])

    const usedByMenu = menus.some((menu: any) => this.parseStringArray(menu.permissionCodes).includes(code))
    if (roleCount > 0 || userCount > 0 || usedByMenu) {
      throw new BadRequestException('权限点仍被角色、用户或菜单引用，无法删除')
    }

    await this.db.$transaction(async (tx: any) => {
      await tx.permission.delete({ where: { code } })
      await this.writeAuditLog(operator, '删除权限点', `permission:${code}`, tx)
    })

    return { success: true }
  }

  async getUserCatalog() {
    const users = await this.db.user.findMany({
      include: {
        department: true,
        userRoles: { include: { role: true } },
        directPermissions: { include: { permission: true } }
      },
      orderBy: [{ username: 'asc' }]
    })

    return users.map((user: any) => this.mapUserCatalogRow(user))
  }

  async getPolicyMatrix() {
    const roles = await this.db.role.findMany({
      include: {
        rolePermissions: {
          include: {
            permission: true
          }
        }
      },
      orderBy: [{ code: 'asc' }]
    })

    return roles.map((role: any) => ({
      roleCode: role.code,
      roleName: role.name,
      dataScope: role.dataScope,
      permissions: role.rolePermissions.map((entry: any) => this.mapPermissionRecord(entry.permission))
    }))
  }

  async getAuditLogSnapshot() {
    return this.db.auditLog.findMany({
      orderBy: [{ createdAt: 'desc' }]
    })
  }

  async getDepartmentPath(departmentId: string) {
    const departmentRows = await this.db.department.findMany({
      select: {
        id: true,
        name: true,
        parentId: true
      }
    })

    const departments: DepartmentRecord[] = departmentRows.map((department: any) => ({
      id: department.id,
      name: department.name,
      parentId: department.parentId ?? undefined
    }))

    const path: DepartmentRecord[] = []
    let current = departments.find((item) => item.id === departmentId)
    while (current) {
      path.unshift(current)
      current = current.parentId ? departments.find((item) => item.id === current?.parentId) : undefined
    }
    return path
  }
}
