import { h, markRaw } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { RouterView } from 'vue-router'

export type AppRouteMeta = {
  title: string
  requiresAuth?: boolean
  permission?: string | string[]
  menu?: boolean
  keepAlive?: boolean
}

const RouteView = markRaw({ render: () => h(RouterView) })

export const staticRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/403',
    name: 'Forbidden',
    component: () => import('../views/ForbiddenView.vue'),
    meta: { title: '无权限' }
  },
  {
    path: '/',
    name: 'Root',
    component: () => import('../layouts/AdminLayout.vue'),
    meta: { title: '视图' },
    redirect: '/workplace',
    children: []
  }
]

export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/workplace',
    name: 'Workplace',
    component: () => import('../views/WorkplaceView.vue'),
    meta: { title: '工作台', requiresAuth: true, menu: true, keepAlive: true } satisfies AppRouteMeta
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: { title: '仪表盘', requiresAuth: true, menu: true, keepAlive: true } satisfies AppRouteMeta
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/ProfileView.vue'),
    meta: { title: '个人中心', requiresAuth: true, menu: false, keepAlive: true } satisfies AppRouteMeta
  },
  {
    path: '/system',
    name: 'System',
    component: RouteView,
    meta: { title: '系统管理', requiresAuth: true, menu: true } satisfies AppRouteMeta,
    children: [
      {
        path: 'users',
        name: 'SystemUsers',
        component: () => import('../views/SystemUsersView.vue'),
        meta: { title: '用户管理', requiresAuth: true, permission: 'system:user:view', menu: true, keepAlive: true } satisfies AppRouteMeta
      },
      {
        path: 'roles',
        name: 'SystemRoles',
        component: () => import('../views/SystemRolesView.vue'),
        meta: { title: '角色管理', requiresAuth: true, permission: 'system:role:view', menu: true, keepAlive: true } satisfies AppRouteMeta
      },
      {
        path: 'auth-debug',
        name: 'SystemAuthDebug',
        component: () => import('../views/SystemAuthDebugView.vue'),
        meta: { title: '鉴权自测', requiresAuth: true, permission: 'system:auth:debug', menu: true } satisfies AppRouteMeta
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFoundView.vue'),
    meta: { title: '页面不存在' }
  }
]
