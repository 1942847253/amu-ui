export type DataScope = 'ALL' | 'DEPARTMENT' | 'DEPARTMENT_AND_CHILDREN' | 'SELF' | 'CUSTOM'

export interface PermissionRecord {
  code: string
  name: string
  module: string
  apiScopes: string[]
}

export interface MenuRecord {
  key: string
  title: string
  icon: string
  permission?: string | string[]
  children?: MenuRecord[]
}

export interface DepartmentRecord {
  id: string
  name: string
  parentId?: string
}

export interface RoleRecord {
  id: string
  code: string
  name: string
  description: string
  dataScope: DataScope
  permissionCodes: string[]
}

export interface UserRecord {
  id: string
  username: string
  displayName: string
  email: string
  departmentId: string
  title: string
  status: 'ACTIVE' | 'LOCKED'
  roleCodes: string[]
  directPermissionCodes: string[]
  passwordHash: string
}

export interface AuthorizedUserContext {
  id: string
  username: string
  role: 'admin' | 'operator' | 'auditor' | 'security'
  displayName: string
  email: string
  department: string
  departmentId: string
  title: string
  avatarSeed: string
  roles: RoleRecord[]
  permissions: string[]
  dataScope: DataScope
}
