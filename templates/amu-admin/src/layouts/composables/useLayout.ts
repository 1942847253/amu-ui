import { useAppStore } from '../../store/app'
import type { Component } from 'vue'
import * as AmuIcons from '@amu-ui/icons'
import {
  IconBarChart,
  IconFolder,
  IconLock,
  IconUser,
  IconUsers,
  IconShield,
  IconMonitor
} from '@amu-ui/icons'

export function useLayout() {
  const appStore = useAppStore()

  const menuIconMap: Record<string, Component> = {
    '/workplace': IconMonitor,
    '/dashboard': IconBarChart,
    '/system': IconFolder,
    '/system/users': IconUser,
    '/system/roles': IconUsers,
    '/system/permissions': IconLock,
    '/system/auth-debug': IconShield,
    '/security': IconShield,
    '/security/policy-matrix': IconShield,
    '/security/audit-logs': IconShield
  }

  const resolveMenuIcon = (key: string, iconName?: string) => {
    if (iconName) {
      const resolved = (AmuIcons as Record<string, unknown>)[iconName]
      if (typeof resolved === 'object' || typeof resolved === 'function') {
        return resolved as Component
      }
    }
    if (key in menuIconMap) return menuIconMap[key]
    if (key.includes('analysis')) return IconBarChart
    return IconFolder
  }

  const routeTitleEnMap: Record<string, string> = {
    登录: 'Login',
    无权限: 'Forbidden',
    视图: 'View',
    工作台: 'Workplace',
    仪表盘: 'Dashboard',
    系统管理: 'System',
    安全中心: 'Security',
    用户管理: 'Users',
    角色管理: 'Roles',
    访问权限管理: 'Permissions',
    鉴权自测: 'Auth Debug',
    策略矩阵: 'Policy Matrix',
    审计日志: 'Audit Logs',
    个人中心: 'Personal Center',
    页面不存在: 'Not Found'
  }

  const translateRouteTitle = (title: string) => {
    if (appStore.language === 'zh-CN') return title
    return routeTitleEnMap[title] || title
  }

  return {
    resolveMenuIcon,
    translateRouteTitle
  }
}
