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
  { code: 'examples:view', name: '查看示例页面', module: 'examples', apiScopes: ['GET:/api/access-control/menus'] },
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
    permissionCodes: ['dashboard:view', 'workplace:view', 'examples:view', 'system:user:read', 'system:user:write', 'system:department:read', 'system:department:write', 'system:role:read', 'system:menu:read', 'system:permission:read']
  },
  {
    id: 'role-auditor',
    code: 'auditor',
    name: '审计员',
    description: '具备审计和只读权限',
    dataScope: 'ALL',
    permissionCodes: ['dashboard:view', 'examples:view', 'audit:log:read', 'system:role:read', 'system:permission:read']
  },
  {
    id: 'role-security',
    code: 'security_officer',
    name: '安全管理员',
    description: '负责访问策略与审计安全',
    dataScope: 'CUSTOM',
    permissionCodes: ['dashboard:view', 'examples:view', 'security:policy:read', 'system:permission:read', 'system:auth:debug', 'audit:log:read']
  }
]

export const menusSeed: MenuRecord[] = [
  { key: '/workplace', title: '工作台', icon: 'IconHome', permission: 'workplace:view', componentPath: 'views/WorkplaceView.vue', menuType: 'MENU', status: 'ACTIVE' },
  { key: '/dashboard', title: '仪表盘', icon: 'IconBarChart', permission: 'dashboard:view', componentPath: 'views/DashboardView.vue', menuType: 'MENU', status: 'ACTIVE' },
  {
    key: '/examples',
    title: '示例',
    icon: 'IconLayers',
    permission: 'examples:view',
    menuType: 'DIRECTORY',
    status: 'ACTIVE',
    children: [
      {
        key: '/examples/form',
        title: '表单',
        icon: 'IconEdit3',
        permission: 'examples:view',
        menuType: 'DIRECTORY',
        status: 'ACTIVE',
        children: [
          { key: '/examples/form/basic', title: '基础表单', icon: 'IconEdit3', permission: 'examples:view', componentPath: 'views/ExamplesFormView.vue', menuType: 'MENU', status: 'ACTIVE' },
          { key: '/examples/form/search', title: '查询表单', icon: 'IconSearch', permission: 'examples:view', componentPath: 'views/ExamplesFormSearchView.vue', menuType: 'MENU', status: 'ACTIVE' },
          { key: '/examples/form/validation', title: '表单校验', icon: 'IconCheckSquare', permission: 'examples:view', componentPath: 'views/ExamplesFormValidationView.vue', menuType: 'MENU', status: 'ACTIVE' },
          { key: '/examples/form/dynamic', title: '动态表单', icon: 'IconPlusSquare', permission: 'examples:view', componentPath: 'views/ExamplesFormDynamicView.vue', menuType: 'MENU', status: 'ACTIVE' },
          { key: '/examples/form/layout', title: '自定义布局', icon: 'IconLayout', permission: 'examples:view', componentPath: 'views/ExamplesFormLayoutView.vue', menuType: 'MENU', status: 'ACTIVE' }
        ]
      },
      {
        key: '/examples/buttons',
        title: '按钮',
        icon: 'IconColumns',
        permission: 'examples:view',
        menuType: 'DIRECTORY',
        status: 'ACTIVE',
        children: [
          { key: '/examples/buttons/basic', title: '基础按钮', icon: 'IconBook', permission: 'examples:view', componentPath: 'views/ExamplesButtonsBasicView.vue', menuType: 'MENU', status: 'ACTIVE' },
          { key: '/examples/buttons/group', title: '按钮组合', icon: 'IconColumns', permission: 'examples:view', componentPath: 'views/ExamplesButtonsView.vue', menuType: 'MENU', status: 'ACTIVE' },
          { key: '/examples/buttons/state', title: '按钮状态', icon: 'IconLoader', permission: 'examples:view', componentPath: 'views/ExamplesButtonsStateView.vue', menuType: 'MENU', status: 'ACTIVE' }
        ]
      },
      {
        key: '/examples/table',
        title: '表格',
        icon: 'IconTable',
        permission: 'examples:view',
        menuType: 'DIRECTORY',
        status: 'ACTIVE',
        children: [
          { key: '/examples/table/basic', title: '基础表格', icon: 'IconTable', permission: 'examples:view', componentPath: 'views/ExamplesTableBasicView.vue', menuType: 'MENU', status: 'ACTIVE' },
          { key: '/examples/table/pagination', title: '分页表格', icon: 'IconBook', permission: 'examples:view', componentPath: 'views/ExamplesTablePaginationView.vue', menuType: 'MENU', status: 'ACTIVE' },
          { key: '/examples/table/states', title: '状态表格', icon: 'IconColumns', permission: 'examples:view', componentPath: 'views/ExamplesTableView.vue', menuType: 'MENU', status: 'ACTIVE' },
          { key: '/examples/table/empty', title: '空态与加载', icon: 'IconLoader', permission: 'examples:view', componentPath: 'views/ExamplesTableEmptyView.vue', menuType: 'MENU', status: 'ACTIVE' }
        ]
      },
      {
        key: '/examples/display',
        title: '数据展示',
        icon: 'IconFileText',
        permission: 'examples:view',
        menuType: 'DIRECTORY',
        status: 'ACTIVE',
        children: [
          { key: '/examples/display/ellipsis', title: '文本省略', icon: 'IconType', permission: 'examples:view', componentPath: 'views/ExamplesEllipsisView.vue', menuType: 'MENU', status: 'ACTIVE' },
          { key: '/examples/display/detail', title: '详情页', icon: 'IconFileText', permission: 'examples:view', componentPath: 'views/ExamplesDetailView.vue', menuType: 'MENU', status: 'ACTIVE' },
          { key: '/examples/display/stats', title: '统计概览', icon: 'IconBarChart', permission: 'examples:view', componentPath: 'views/ExamplesDisplayStatsView.vue', menuType: 'MENU', status: 'ACTIVE' }
        ]
      },
      {
        key: '/examples/navigation',
        title: '导航示例',
        icon: 'IconFolder',
        permission: 'examples:view',
        menuType: 'DIRECTORY',
        status: 'ACTIVE',
        children: [
          { key: '/examples/navigation/breadcrumb', title: '面包屑', icon: 'IconBook', permission: 'examples:view', componentPath: 'views/ExamplesNavigationBreadcrumbView.vue', menuType: 'MENU', status: 'ACTIVE' },
          { key: '/examples/navigation/tabs', title: '标签页', icon: 'IconColumns', permission: 'examples:view', componentPath: 'views/ExamplesNavigationTabsView.vue', menuType: 'MENU', status: 'ACTIVE' },
          { key: '/examples/navigation/dropdown', title: '下拉菜单', icon: 'IconLayout', permission: 'examples:view', componentPath: 'views/ExamplesNavigationDropdownView.vue', menuType: 'MENU', status: 'ACTIVE' }
        ]
      },
      {
        key: '/examples/feedback',
        title: '弹窗反馈',
        icon: 'IconLayout',
        permission: 'examples:view',
        menuType: 'DIRECTORY',
        status: 'ACTIVE',
        children: [
          { key: '/examples/feedback/dialog', title: '对话框', icon: 'IconLayout', permission: 'examples:view', componentPath: 'views/ExamplesFeedbackView.vue', menuType: 'MENU', status: 'ACTIVE' },
          { key: '/examples/feedback/confirm', title: '二次确认', icon: 'IconCheckSquare', permission: 'examples:view', componentPath: 'views/ExamplesFeedbackConfirmView.vue', menuType: 'MENU', status: 'ACTIVE' },
          { key: '/examples/feedback/drawer', title: '抽屉', icon: 'IconColumns', permission: 'examples:view', componentPath: 'views/ExamplesFeedbackDrawerView.vue', menuType: 'MENU', status: 'ACTIVE' }
        ]
      },
      {
        key: '/examples/loading',
        title: '加载反馈',
        icon: 'IconLoader',
        permission: 'examples:view',
        menuType: 'DIRECTORY',
        status: 'ACTIVE',
        children: [
          { key: '/examples/loading/button', title: '按钮加载', icon: 'IconBook', permission: 'examples:view', componentPath: 'views/ExamplesLoadingButtonView.vue', menuType: 'MENU', status: 'ACTIVE' },
          { key: '/examples/loading/area', title: '区域加载', icon: 'IconColumns', permission: 'examples:view', componentPath: 'views/ExamplesLoadingView.vue', menuType: 'MENU', status: 'ACTIVE' },
          { key: '/examples/loading/fullscreen', title: '全屏加载', icon: 'IconLoader', permission: 'examples:view', componentPath: 'views/ExamplesLoadingFullscreenView.vue', menuType: 'MENU', status: 'ACTIVE' }
        ]
      }
    ]
  },
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
