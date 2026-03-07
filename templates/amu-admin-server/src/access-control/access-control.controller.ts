import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { RequirePermissions } from '../common/decorators/permissions.decorator'
import type { AuthenticatedRequest } from '../common/interfaces/authenticated-request'
import { AccessControlService } from './access-control.service'
import { UpsertDepartmentDto } from './dto/upsert-department.dto'
import { UpsertMenuDto } from './dto/upsert-menu.dto'
import { UpsertPermissionDto } from './dto/upsert-permission.dto'
import { UpsertRoleDto } from './dto/upsert-role.dto'
import { SetUserStatusDto } from './dto/set-user-status.dto'
import { UpsertUserDto } from './dto/upsert-user.dto'

@ApiTags('access-control')
@ApiBearerAuth()
@Controller('access-control')
export class AccessControlController {
  constructor(private readonly accessControlService: AccessControlService) {}

  @Get('overview')
  async getOverview(@Req() request: AuthenticatedRequest) {
    const currentUser = request.authUser!
    return {
      currentUser,
      menus: await this.accessControlService.filterMenus(currentUser.permissions),
      departments: await this.accessControlService.getDepartmentPath(currentUser.departmentId)
    }
  }

  @Get('menus')
  async getMenus(@Req() request: AuthenticatedRequest) {
    return this.accessControlService.filterMenus(request.authUser!.permissions)
  }

  @RequirePermissions('system:menu:read')
  @Get('menu-catalog')
  async getMenuCatalog() {
    return this.accessControlService.getMenuCatalog()
  }

  @RequirePermissions('system:menu:write')
  @Post('menu-catalog')
  createMenu(@Body() body: UpsertMenuDto, @Req() request: AuthenticatedRequest) {
    return this.accessControlService.createMenu(body, request.authUser?.username || 'system')
  }

  @RequirePermissions('system:menu:write')
  @Put('menu-catalog/:id')
  updateMenu(@Param('id') id: string, @Body() body: UpsertMenuDto, @Req() request: AuthenticatedRequest) {
    return this.accessControlService.updateMenu(id, body, request.authUser?.username || 'system')
  }

  @RequirePermissions('system:menu:write')
  @Delete('menu-catalog/:id')
  removeMenu(@Param('id') id: string, @Req() request: AuthenticatedRequest) {
    return this.accessControlService.removeMenu(id, request.authUser?.username || 'system')
  }

  @RequirePermissions('system:user:read')
  @Get('users')
  async getUsers() {
    return this.accessControlService.getUserCatalog()
  }

  @RequirePermissions('system:user:read')
  @Get('departments')
  async getDepartments() {
    return this.accessControlService.getDepartmentCatalog()
  }

  @RequirePermissions('system:department:read')
  @Get('department-catalog')
  async getDepartmentCatalog() {
    return this.accessControlService.getDepartmentCatalog()
  }

  @RequirePermissions('system:department:write')
  @Post('department-catalog')
  createDepartment(@Body() body: UpsertDepartmentDto, @Req() request: AuthenticatedRequest) {
    return this.accessControlService.createDepartment(body, request.authUser?.username || 'system')
  }

  @RequirePermissions('system:department:write')
  @Put('department-catalog/:id')
  updateDepartment(@Param('id') id: string, @Body() body: UpsertDepartmentDto, @Req() request: AuthenticatedRequest) {
    return this.accessControlService.updateDepartment(id, body, request.authUser?.username || 'system')
  }

  @RequirePermissions('system:department:write')
  @Delete('department-catalog/:id')
  removeDepartment(@Param('id') id: string, @Req() request: AuthenticatedRequest) {
    return this.accessControlService.removeDepartment(id, request.authUser?.username || 'system')
  }

  @RequirePermissions('system:user:write')
  @Post('users')
  createUser(@Body() body: UpsertUserDto, @Req() request: AuthenticatedRequest) {
    return this.accessControlService.createUser(body, request.authUser?.username || 'system')
  }

  @RequirePermissions('system:user:write')
  @Put('users/:id')
  updateUser(@Param('id') id: string, @Body() body: UpsertUserDto, @Req() request: AuthenticatedRequest) {
    return this.accessControlService.updateUser(id, body, request.authUser?.username || 'system')
  }

  @RequirePermissions('system:user:write')
  @Post('users/:id/status')
  setUserStatus(@Param('id') id: string, @Body() body: SetUserStatusDto, @Req() request: AuthenticatedRequest) {
    return this.accessControlService.setUserStatus(id, body.status, request.authUser?.username || 'system', request.authUser?.id)
  }

  @RequirePermissions('system:user:write')
  @Post('users/:id/reset-password')
  resetUserPassword(@Param('id') id: string, @Req() request: AuthenticatedRequest) {
    return this.accessControlService.resetUserPassword(id, request.authUser?.username || 'system')
  }

  @RequirePermissions('system:user:write')
  @Delete('users/:id')
  removeUser(@Param('id') id: string, @Req() request: AuthenticatedRequest) {
    return this.accessControlService.removeUser(id, request.authUser?.username || 'system', request.authUser?.id)
  }

  @RequirePermissions('system:role:read')
  @Get('roles')
  async getRoles() {
    return this.accessControlService.getRoleCatalog()
  }

  @RequirePermissions('system:role:write')
  @Post('roles')
  createRole(@Body() body: UpsertRoleDto, @Req() request: AuthenticatedRequest) {
    return this.accessControlService.createRole(body, request.authUser?.username || 'system')
  }

  @RequirePermissions('system:role:write')
  @Put('roles/:id')
  updateRole(@Param('id') id: string, @Body() body: UpsertRoleDto, @Req() request: AuthenticatedRequest) {
    return this.accessControlService.updateRole(id, body, request.authUser?.username || 'system')
  }

  @RequirePermissions('system:role:write')
  @Delete('roles/:id')
  removeRole(@Param('id') id: string, @Req() request: AuthenticatedRequest) {
    return this.accessControlService.removeRole(id, request.authUser?.username || 'system')
  }

  @RequirePermissions('system:permission:read')
  @Get('permissions')
  async getPermissions() {
    return this.accessControlService.getPermissionCatalog()
  }

  @RequirePermissions('system:permission:write')
  @Post('permissions')
  createPermission(@Body() body: UpsertPermissionDto, @Req() request: AuthenticatedRequest) {
    return this.accessControlService.createPermission(body, request.authUser?.username || 'system')
  }

  @RequirePermissions('system:permission:write')
  @Put('permissions/:code')
  updatePermission(@Param('code') code: string, @Body() body: UpsertPermissionDto, @Req() request: AuthenticatedRequest) {
    return this.accessControlService.updatePermission(code, body, request.authUser?.username || 'system')
  }

  @RequirePermissions('system:permission:write')
  @Delete('permissions/:code')
  removePermission(@Param('code') code: string, @Req() request: AuthenticatedRequest) {
    return this.accessControlService.removePermission(code, request.authUser?.username || 'system')
  }

  @RequirePermissions('security:policy:read')
  @Get('policy-matrix')
  async getPolicyMatrix() {
    return this.accessControlService.getPolicyMatrix()
  }

  @RequirePermissions('audit:log:read')
  @Get('audit-logs')
  async getAuditLogs() {
    return this.accessControlService.getAuditLogSnapshot()
  }
}
