import { createRouter, createWebHistory } from 'vue-router'
import type { RouteLocationNormalized } from 'vue-router'
import { staticRoutes } from './routes'
import { useAuthStore } from '../store/auth'
import { usePermissionStore } from '../store/permission'

const router = createRouter({
  history: createWebHistory(),
  routes: staticRoutes
})

const ensureDynamicRoutes = (permissionStore: ReturnType<typeof usePermissionStore>) => {
  if (permissionStore.routeInjected) return

  const accessRoutes = permissionStore.generateRoutes()
  accessRoutes.forEach((route) => {
    if (route.path === '/:pathMatch(.*)*') {
      router.addRoute(route)
      return
    }
    router.addRoute('Root', route)
  })
}

const sanitizeSessionState = () => {
  const authStore = useAuthStore()
  const permissionStore = usePermissionStore()

  const hasTokenButNoUser = !authStore.user && (authStore.token || authStore.refreshTokenValue)
  if (!hasTokenButNoUser) {
    return
  }

  authStore.logout()
  permissionStore.reset()
}

const resolvePreInjectionAuthRedirect = (to: RouteLocationNormalized) => {
  const authStore = useAuthStore()

  if (!authStore.isAuthenticated && to.path !== '/login') {
    return { path: '/login', query: { redirect: to.fullPath } }
  }

  if (to.path === '/login' && authStore.isAuthenticated) {
    return { path: '/dashboard' }
  }

  return null
}

const resolveRouteInjectionRedirect = (to: RouteLocationNormalized) => {
  const permissionStore = usePermissionStore()
  if (permissionStore.routeInjected) {
    return null
  }

  ensureDynamicRoutes(permissionStore)
  return { path: to.fullPath, replace: true }
}

const resolveAuthRedirect = (to: RouteLocationNormalized) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }

  if (to.path === '/login' && authStore.isAuthenticated) {
    return { path: '/dashboard' }
  }

  return null
}

const resolvePermissionRedirect = (to: RouteLocationNormalized) => {
  const authStore = useAuthStore()
  const requiredPermission = to.meta.permission

  if (requiredPermission && !authStore.hasPermission(requiredPermission)) {
    return { path: '/403', replace: true }
  }

  return null
}

router.beforeEach((to) => {
  sanitizeSessionState()

  const preInjectionAuthRedirect = resolvePreInjectionAuthRedirect(to)
  if (preInjectionAuthRedirect) {
    return preInjectionAuthRedirect
  }

  const routeInjectionRedirect = resolveRouteInjectionRedirect(to)
  if (routeInjectionRedirect) {
    return routeInjectionRedirect
  }

  const authRedirect = resolveAuthRedirect(to)
  if (authRedirect) {
    return authRedirect
  }

  const permissionRedirect = resolvePermissionRedirect(to)
  if (permissionRedirect) {
    return permissionRedirect
  }

  return true
})

router.afterEach((to) => {
  const title = to.meta.title || 'amu-admin'
  document.title = `${title} - amu-admin`
})

export default router
