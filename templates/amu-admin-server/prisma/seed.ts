import { hashSync } from 'bcryptjs'
import { PrismaClient } from '@prisma/client'
import { departmentsSeed, menusSeed, permissionsSeed, rolesSeed } from '../src/access-control/access-control.seed'

const prisma = new PrismaClient()
type SeedMode = 'demo' | 'base'

const usersSeed = [
  {
    id: 'user-admin',
    username: 'admin',
    displayName: '系统管理员',
    email: 'admin@amu-ui.com',
    departmentId: 'platform',
    title: 'Platform Owner',
    status: 'ACTIVE' as const,
    roleCodes: ['platform_admin'],
    directPermissionCodes: [],
    password: '123456'
  },
  {
    id: 'user-operator',
    username: 'operator',
    displayName: '运营负责人',
    email: 'operator@amu-ui.com',
    departmentId: 'operations',
    title: 'Operations Lead',
    status: 'ACTIVE' as const,
    roleCodes: ['operations_manager'],
    directPermissionCodes: [],
    password: '123456'
  },
  {
    id: 'user-auditor',
    username: 'audit',
    displayName: '审计专员',
    email: 'audit@amu-ui.com',
    departmentId: 'security',
    title: 'Security Auditor',
    status: 'ACTIVE' as const,
    roleCodes: ['auditor'],
    directPermissionCodes: [],
    password: '123456'
  },
  {
    id: 'user-security',
    username: 'security',
    displayName: '安全管理员',
    email: 'security@amu-ui.com',
    departmentId: 'security',
    title: 'Security Officer',
    status: 'ACTIVE' as const,
    roleCodes: ['security_officer'],
    directPermissionCodes: ['system:role:read'],
    password: '123456'
  }
]

const auditLogsSeed = [
  {
    id: 'audit-1',
    operator: 'admin',
    action: '更新角色权限矩阵',
    resource: 'role:platform_admin',
    result: 'SUCCESS',
    createdAt: new Date('2026-03-06T10:18:00.000Z')
  },
  {
    id: 'audit-2',
    operator: 'security',
    action: '轮换 refresh token 密钥',
    resource: 'auth:session',
    result: 'SUCCESS',
    createdAt: new Date('2026-03-06T09:42:00.000Z')
  }
]

const resolveSeedMode = (): SeedMode => {
  const seedMode = (process.env.SEED_MODE ?? 'demo').trim().toLowerCase()
  if (seedMode === 'demo' || seedMode === 'base') {
    return seedMode
  }
  throw new Error(`不支持的 SEED_MODE: ${seedMode}`)
}

const getBootstrapAdminUser = () => {
  const password = process.env.SEED_ADMIN_PASSWORD?.trim()
  const seedMode = resolveSeedMode()

  if (seedMode === 'base' && !password) {
    throw new Error('当 SEED_MODE=base 时必须提供 SEED_ADMIN_PASSWORD')
  }

  return {
    id: 'user-admin',
    username: process.env.SEED_ADMIN_USERNAME?.trim() || 'admin',
    displayName: process.env.SEED_ADMIN_DISPLAY_NAME?.trim() || '系统管理员',
    email: process.env.SEED_ADMIN_EMAIL?.trim() || 'admin@amu-ui.com',
    departmentId: process.env.SEED_ADMIN_DEPARTMENT_ID?.trim() || 'platform',
    title: process.env.SEED_ADMIN_TITLE?.trim() || 'Platform Owner',
    status: 'ACTIVE' as const,
    roleCodes: ['platform_admin'],
    directPermissionCodes: [],
    password: password || '123456'
  }
}

const flattenMenus = () => {
  const rows: Array<{
    id: string
    key: string
    title: string
    icon: string
    menuType: string
    componentPath: string | null
    status: string
    parentId: string | null
    sortOrder: number
    permissionCodes: string[]
  }> = []

  const visit = (items: typeof menusSeed, parentId: string | null = null) => {
    items.forEach((item, index) => {
      const id = `menu-${item.key.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '') || 'root'}`
      rows.push({
        id,
        key: item.key,
        title: item.title,
        icon: item.icon,
        menuType: item.menuType || (item.children?.length ? 'DIRECTORY' : 'MENU'),
        componentPath: item.componentPath || null,
        status: item.status || 'ACTIVE',
        parentId,
        sortOrder: index,
        permissionCodes: Array.isArray(item.permission) ? item.permission : item.permission ? [item.permission] : []
      })
      if (item.children?.length) {
        visit(item.children, id)
      }
    })
  }

  visit(menusSeed)
  return rows
}

async function main() {
  const seedMode = resolveSeedMode()
  const usersToSeed = seedMode === 'demo' ? usersSeed : [getBootstrapAdminUser()]
  const auditLogsToSeed = seedMode === 'demo' ? auditLogsSeed : []

  await prisma.authSession.deleteMany()
  await prisma.auditLog.deleteMany()
  await prisma.userDirectPermission.deleteMany()
  await prisma.userRole.deleteMany()
  await prisma.rolePermission.deleteMany()
  await prisma.menu.deleteMany()
  await prisma.user.deleteMany()
  await prisma.role.deleteMany()
  await prisma.permission.deleteMany()
  await prisma.department.deleteMany()

  for (const department of departmentsSeed) {
    await prisma.department.create({ data: department })
  }

  for (const permission of permissionsSeed) {
    await prisma.permission.create({
      data: {
        code: permission.code,
        name: permission.name,
        module: permission.module,
        apiScopes: permission.apiScopes
      }
    })
  }

  for (const role of rolesSeed) {
    await prisma.role.create({
      data: {
        id: role.id,
        code: role.code,
        name: role.name,
        description: role.description,
        dataScope: role.dataScope,
        rolePermissions: {
          create: role.permissionCodes.map((permissionCode) => ({ permissionCode }))
        }
      }
    })
  }

  for (const user of usersToSeed) {
    const roleRows = await prisma.role.findMany({ where: { code: { in: user.roleCodes } } })
    await prisma.user.create({
      data: {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        email: user.email,
        departmentId: user.departmentId,
        title: user.title,
        status: user.status,
        passwordHash: hashSync(user.password, 10),
        userRoles: {
          create: roleRows.map((role) => ({ roleId: role.id }))
        },
        directPermissions: {
          create: user.directPermissionCodes.map((permissionCode) => ({ permissionCode }))
        }
      }
    })
  }

  for (const menu of flattenMenus()) {
    await prisma.menu.create({
      data: {
        id: menu.id,
        key: menu.key,
        title: menu.title,
        icon: menu.icon,
        menuType: menu.menuType,
        componentPath: menu.componentPath,
        status: menu.status,
        parentId: menu.parentId,
        sortOrder: menu.sortOrder,
        permissionCodes: menu.permissionCodes
      }
    })
  }

  for (const auditLog of auditLogsToSeed) {
    await prisma.auditLog.create({ data: auditLog })
  }
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
