import type { DepartmentRecord, MenuRecord, PermissionRecord, RoleRecord } from './access-control.types'

export const departmentsSeed: DepartmentRecord[] = [
  { id: 'root', name: '集团总部' },
  { id: 'platform', name: '平台架构中心', parentId: 'root' },
  { id: 'operations', name: '业务运营中心', parentId: 'root' },
  { id: 'security', name: '安全与合规中心', parentId: 'root' }
]

export const permissionsSeed: PermissionRecord[] = [
  { code: 'dashboard:view', name: '查看仪表盘', module: 'dashboard', apiScopes: ['GET:/api/access-control/menus'] },
  { code: 'workplace:view', name: '查看工作台', module: 'dashboard', apiScopes: ['GET:/api/access-control/menus'] },
  { code: 'system:user:read', name: '查看用户', module: 'iam', apiScopes: ['GET:/api/access-control/users', 'GET:/api/access-control/departments'] },
  { code: 'system:user:write', name: '编辑用户', module: 'iam', apiScopes: ['POST:/api/access-control/users', 'PUT:/api/access-control/users/:id', 'POST:/api/access-control/users/:id/status', 'POST:/api/access-control/users/:id/reset-password', 'DELETE:/api/access-control/users/:id'] },
  { code: 'system:department:read', name: '查看部门', module: 'iam', apiScopes: ['GET:/api/access-control/department-catalog'] },
  { code: 'system:department:write', name: '编辑部门', module: 'iam', apiScopes: ['POST:/api/access-control/department-catalog', 'PUT:/api/access-control/department-catalog/:id', 'DELETE:/api/access-control/department-catalog/:id'] },
  { code: 'system:role:read', name: '查看角色', module: 'iam', apiScopes: ['GET:/api/access-control/roles'] },
  { code: 'system:role:write', name: '编辑角色', module: 'iam', apiScopes: ['POST:/api/access-control/roles', 'PUT:/api/access-control/roles/:id', 'DELETE:/api/access-control/roles/:id'] },
  { code: 'system:menu:read', name: '查看菜单', module: 'iam', apiScopes: ['GET:/api/access-control/menu-catalog'] },
  { code: 'system:menu:write', name: '编辑菜单', module: 'iam', apiScopes: ['POST:/api/access-control/menu-catalog', 'PUT:/api/access-control/menu-catalog/:id', 'DELETE:/api/access-control/menu-catalog/:id'] },
  { code: 'system:permission:read', name: '查看访问权限', module: 'iam', apiScopes: ['GET:/api/access-control/permissions'] },
  { code: 'system:permission:write', name: '编辑访问权限', module: 'iam', apiScopes: ['POST:/api/access-control/permissions', 'PUT:/api/access-control/permissions/:code', 'DELETE:/api/access-control/permissions/:code'] },
  { code: 'system:auth:debug', name: '访问鉴权调试', module: 'iam', apiScopes: ['GET:/api/access-control/policy-matrix'] },
  { code: 'audit:log:read', name: '查看审计日志', module: 'audit', apiScopes: ['GET:/api/access-control/audit-logs'] },
  { code: 'security:policy:read', name: '查看安全策略', module: 'security', apiScopes: ['GET:/api/access-control/policy-matrix'] },
  { code: '*', name: '超级权限', module: 'system', apiScopes: ['*'] }
]

export const rolesSeed: RoleRecord[] = [
  {
    id: 'role-admin',
    code: 'platform_admin',
    name: '平台管理员',
    description: '拥有完整的系统管理权限',
    dataScope: 'ALL',
    permissionCodes: ['*']
  },
  {
    id: 'role-operator',
    code: 'operations_manager',
    name: '运营负责人',
    description: '负责业务运营和用户治理',
    dataScope: 'DEPARTMENT_AND_CHILDREN',
    permissionCodes: ['dashboard:view', 'workplace:view', 'system:user:read', 'system:user:write', 'system:department:read', 'system:department:write', 'system:role:read', 'system:menu:read', 'system:permission:read']
  },
  {
    id: 'role-auditor',
    code: 'auditor',
    name: '审计员',
    description: '具备审计和只读权限',
    dataScope: 'ALL',
    permissionCodes: ['dashboard:view', 'audit:log:read', 'system:role:read', 'system:permission:read']
  },
  {
    id: 'role-security',
    code: 'security_officer',
    name: '安全管理员',
    description: '负责访问策略与审计安全',
    dataScope: 'CUSTOM',
    permissionCodes: ['dashboard:view', 'security:policy:read', 'system:permission:read', 'system:auth:debug', 'audit:log:read']
  }
]

export const menusSeed: MenuRecord[] = [
  { key: '/workplace', title: '工作台', icon: 'IconHome', permission: 'workplace:view', componentPath: 'views/WorkplaceView.vue', menuType: 'MENU', status: 'ACTIVE' },
  { key: '/dashboard', title: '仪表盘', icon: 'IconBarChart', permission: 'dashboard:view', componentPath: 'views/DashboardView.vue', menuType: 'MENU', status: 'ACTIVE' },
  {
    key: '/system',
    title: '系统管理',
    icon: 'IconSettings',
    menuType: 'DIRECTORY',
    status: 'ACTIVE',
    children: [
      { key: '/system/users', title: '用户管理', icon: 'IconUser', permission: 'system:user:read', componentPath: 'views/SystemUsersView.vue', menuType: 'MENU', status: 'ACTIVE' },
      { key: '/system/departments', title: '部门管理', icon: 'IconGitBranch', permission: 'system:department:read', componentPath: 'views/SystemDepartmentsView.vue', menuType: 'MENU', status: 'ACTIVE' },
      { key: '/system/roles', title: '角色管理', icon: 'IconShield', permission: 'system:role:read', componentPath: 'views/SystemRolesView.vue', menuType: 'MENU', status: 'ACTIVE' },
      { key: '/system/menus', title: '菜单管理', icon: 'IconMenu', permission: 'system:menu:read', componentPath: 'views/SystemMenusView.vue', menuType: 'MENU', status: 'ACTIVE' },
      { key: '/system/permissions', title: '访问权限管理', icon: 'IconLock', permission: 'system:permission:read', componentPath: 'views/SystemPermissionsView.vue', menuType: 'MENU', status: 'ACTIVE' },
      { key: '/system/auth-debug', title: '鉴权自测', icon: 'IconLock', permission: 'system:auth:debug', componentPath: 'views/SystemAuthDebugView.vue', menuType: 'MENU', status: 'ACTIVE' }
    ]
  },
  {
    key: '/security',
    title: '安全中心',
    icon: 'IconShield',
    menuType: 'DIRECTORY',
    status: 'ACTIVE',
    children: [
      { key: '/security/policy-matrix', title: '策略矩阵', icon: 'IconFileText', permission: 'security:policy:read', componentPath: 'views/SecurityPolicyMatrixView.vue', menuType: 'MENU', status: 'ACTIVE' },
      { key: '/security/audit-logs', title: '审计日志', icon: 'IconFileText', permission: 'audit:log:read', componentPath: 'views/SecurityAuditLogsView.vue', menuType: 'MENU', status: 'ACTIVE' }
    ]
  }
]
