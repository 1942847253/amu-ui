import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import { asyncRoutes } from '../router/routes'
import { useAuthStore } from './auth'

export interface MenuNode {
  key: string
  title: string
  children?: MenuNode[]
}

const filterRoutesByPermission = (routes: RouteRecordRaw[], hasPermission: (value?: string | string[]) => boolean): RouteRecordRaw[] => {
  const result: RouteRecordRaw[] = []

  routes.forEach((route) => {
    const meta = route.meta ?? {}
    if (meta.permission && !hasPermission(meta.permission)) return

    const copied: RouteRecordRaw = { ...route }
    if (copied.children?.length) {
      copied.children = filterRoutesByPermission(copied.children, hasPermission)
    }

    if (copied.children && copied.children.length === 0 && route.path === '/system') {
      return
    }

    result.push(copied)
  })

  return result
}

const toMenuNodes = (routes: RouteRecordRaw[], parentPath = ''): MenuNode[] => {
  return routes
    .filter((item) => item.meta?.menu)
    .map((item) => {
      const fullPath = item.path.startsWith('/')
        ? item.path
        : `${parentPath.replace(/\/$/, '')}/${item.path}`
      const children = item.children ? toMenuNodes(item.children, fullPath) : undefined

      return {
        key: fullPath,
        title: item.meta?.title || String(item.name || fullPath),
        children: children && children.length ? children : undefined
      }
    })
}

export const usePermissionStore = defineStore('permission', () => {
  const routeRecords = ref<RouteRecordRaw[]>([])
  const routeInjected = ref(false)

  const authStore = useAuthStore()

  const generateRoutes = () => {
    routeRecords.value = filterRoutesByPermission(asyncRoutes, authStore.hasPermission)
    routeInjected.value = true
    return routeRecords.value
  }

  const reset = () => {
    routeRecords.value = []
    routeInjected.value = false
  }

  const menuTree = computed(() => toMenuNodes(routeRecords.value))

  return {
    routeRecords,
    routeInjected,
    menuTree,
    generateRoutes,
    reset
  }
})
