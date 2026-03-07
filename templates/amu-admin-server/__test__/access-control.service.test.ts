import { describe, expect, it } from 'vitest'
import { AccessControlService } from '../src/access-control/access-control.service'
import { rolesSeed } from '../src/access-control/access-control.seed'

describe('access control service', () => {
  const service = new AccessControlService({} as never)

  it('支持星号权限和前缀权限匹配', () => {
    expect(service.hasPermission(['*'], 'system:user:read')).toBe(true)
    expect(service.hasPermission(['system:*'], 'system:user:read')).toBe(true)
    expect(service.hasPermission(['system:user:read'], 'system:user:read')).toBe(true)
    expect(service.hasPermission(['system:user:read'], 'system:user:write')).toBe(false)
  })

  it('会按权限裁剪菜单树', async () => {
    const menus = await service.filterMenus(['dashboard:view', 'system:user:read'], [
      { key: '/dashboard', title: '仪表盘', icon: 'IconBarChart', permission: 'dashboard:view' },
      {
        key: '/system',
        title: '系统管理',
        icon: 'IconSettings',
        children: [
          { key: '/system/users', title: '用户管理', icon: 'IconUser', permission: 'system:user:read' },
          { key: '/system/roles', title: '角色管理', icon: 'IconShield', permission: 'system:role:read' }
        ]
      },
      {
        key: '/security',
        title: '安全中心',
        icon: 'IconShield',
        children: [
          { key: '/security/policy-matrix', title: '策略矩阵', icon: 'IconFileText', permission: 'security:policy:read' }
        ]
      }
    ])
    const paths = menus.flatMap((menu) => [menu.key, ...(menu.children?.map((child) => child.key) ?? [])])

    expect(paths).toContain('/dashboard')
    expect(paths).toContain('/system/users')
    expect(paths).not.toContain('/system/roles')
    expect(paths).not.toContain('/security/policy-matrix')
  })

  it('会按角色集合解析数据范围', () => {
    expect(service.resolveDataScope([{ id: 'r1', code: 'c1', name: 'n1', description: 'd1', dataScope: 'SELF', permissionCodes: [] }])).toBe('SELF')
    expect(service.resolveDataScope([{ id: 'r2', code: 'c2', name: 'n2', description: 'd2', dataScope: 'ALL', permissionCodes: [] }])).toBe('ALL')
    expect(service.resolveDataScope([
      { id: 'r3', code: 'c3', name: 'n3', description: 'd3', dataScope: 'DEPARTMENT', permissionCodes: [] },
      { id: 'r4', code: 'c4', name: 'n4', description: 'd4', dataScope: 'DEPARTMENT_AND_CHILDREN', permissionCodes: [] }
    ])).toBe('DEPARTMENT_AND_CHILDREN')
  })

  it('运营负责人默认包含查看访问权限的权限', () => {
    const operatorRole = rolesSeed.find((role) => role.code === 'operations_manager')

    expect(operatorRole?.permissionCodes).toContain('system:permission:read')
  })

  it('运营负责人默认包含查看菜单的权限', () => {
    const operatorRole = rolesSeed.find((role) => role.code === 'operations_manager')

    expect(operatorRole?.permissionCodes).toContain('system:menu:read')
  })

  it('运营负责人默认包含部门管理权限', () => {
    const operatorRole = rolesSeed.find((role) => role.code === 'operations_manager')

    expect(operatorRole?.permissionCodes).toContain('system:department:read')
    expect(operatorRole?.permissionCodes).toContain('system:department:write')
  })
})
