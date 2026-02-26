<template>
  <div class="admin-layout" :data-amu-theme="appStore.isDark ? 'dark' : undefined" :style="layoutStyle">
    <aside class="admin-layout__aside" :class="{ 'is-collapsed': appStore.sidebarCollapsed }">
      <AmuMenu
        mode="vertical"
        trigger="click"
        :show-collapse-button="true"
        :collapsed="appStore.sidebarCollapsed"
        @update:collapsed="handleCollapsedChange"
        :selected-keys="[activeKey]"
        :open-keys="openKeys"
        @update:open-keys="handleOpenKeysChange"
        @select="handleMenuSelect"
      >
        <template #logo>
          <div class="admin-layout__logo" :class="{ 'is-collapsed': appStore.sidebarCollapsed }">
            <span class="admin-layout__logo-mark">A</span>
            <span v-if="!appStore.sidebarCollapsed" class="admin-layout__logo-text">mu-admin</span>
          </div>
        </template>

        <template v-for="item in permissionStore.menuTree" :key="item.key">
          <AmuSubMenu v-if="item.children?.length" :index="item.key" :title="item.title">
            <template #icon>
              <component :is="resolveMenuIcon(item.key)" />
            </template>
            <AmuMenuItem v-for="child in item.children" :key="child.key" :index="child.key">{{ child.title }}</AmuMenuItem>
          </AmuSubMenu>
          <AmuMenuItem v-else :index="item.key">
            <template #icon>
              <component :is="resolveMenuIcon(item.key)" />
            </template>
            {{ item.title }}
          </AmuMenuItem>
        </template>

      </AmuMenu>
    </aside>

    <main class="admin-layout__main">
      <header class="admin-layout__header">
        <div class="admin-layout__header-left">
          <AmuBreadcrumb>
            <AmuBreadcrumbItem v-for="crumb in breadcrumbs" :key="crumb.path">{{ crumb.title }}</AmuBreadcrumbItem>
          </AmuBreadcrumb>
        </div>

        <div class="admin-layout__actions">
          <div class="admin-layout__tool-item admin-layout__tool-item--switch">
            <span class="admin-layout__tool-label">暗黑</span>
            <AmuSwitch v-model="appStore.isDark" size="small" />
          </div>
          <AmuButton v-permission="'system:role:view'" size="small" class="admin-layout__tool-btn">角色入口</AmuButton>
          <div class="admin-layout__user">
            <span class="admin-layout__avatar">{{ (authStore.user?.username || 'U').slice(0, 1).toUpperCase() }}</span>
            <span class="admin-layout__username">{{ authStore.user?.username }}</span>
          </div>
          <AmuButton type="default" size="small" class="admin-layout__tool-btn" @click="handleLogout">退出</AmuButton>
        </div>
      </header>

      <section class="admin-layout__content">
        <div class="admin-layout__tabs">
          <AmuTag
            v-for="tab in tabsStore.visitedTabs"
            :key="tab.path"
            :type="tab.path === activeKey ? 'primary' : 'default'"
            :closable="tab.closable"
            @click="router.push(tab.path)"
            @close="handleCloseTab(tab.path)"
          >
            {{ tab.title }}
          </AmuTag>
        </div>

        <div class="admin-layout__view">
          <RouterView v-slot="{ Component, route: currentRoute }">
            <KeepAlive :include="tabsStore.cacheNames">
              <component :is="Component" :key="currentRoute.fullPath" />
            </KeepAlive>
          </RouterView>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { AmuBreadcrumb, AmuBreadcrumbItem } from 'amu-ui/breadcrumb'
import { AmuButton } from 'amu-ui/button'
import { AmuMenu, AmuMenuItem, AmuSubMenu } from 'amu-ui/menu'
import { AmuSwitch } from 'amu-ui/switch'
import { AmuTag } from 'amu-ui/tag'
import { computed, h, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'
import { useAppStore } from '../store/app'
import { usePermissionStore } from '../store/permission'
import { useTabsStore } from '../store/tabs'

const route = useRoute()
const router = useRouter()

const authStore = useAuthStore()
const appStore = useAppStore()
const permissionStore = usePermissionStore()
const tabsStore = useTabsStore()

const layoutStyle = computed(() => {
  return {
    '--admin-aside-width': appStore.sidebarCollapsed ? '72px' : '240px'
  }
})

const createIcon = (path: string) => () =>
  h(
    'svg',
    { viewBox: '0 0 24 24', width: '1em', height: '1em', fill: 'currentColor' },
    [h('path', { d: path })]
  )

const DashboardIcon = createIcon('M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z')
const FolderIcon = createIcon('M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z')
const UserIcon = createIcon('M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z')
const RoleIcon = createIcon('M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.98 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z')
const ShieldIcon = createIcon('M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1 16-4-4 1.41-1.41L11 14.17l5.59-5.59L18 10l-7 7z')

const resolveMenuIcon = (key: string) => {
  if (key === '/dashboard') return DashboardIcon
  if (key === '/system') return FolderIcon
  if (key === '/system/users') return UserIcon
  if (key === '/system/roles') return RoleIcon
  if (key === '/system/auth-debug') return ShieldIcon
  return FolderIcon
}

const activeKey = computed(() => route.path)
const openKeys = ref<string[]>([])

watch(
  () => route.path,
  (path) => {
    const segments = path.split('/').filter(Boolean)
    if (segments.length > 1) {
      openKeys.value = [`/${segments[0]}`]
      return
    }

    const firstGroup = permissionStore.menuTree.find((item) => item.children?.length)
    openKeys.value = firstGroup ? [firstGroup.key] : []
  },
  { immediate: true }
)

watch(
  () => route.fullPath,
  () => {
    if (route.path === '/login' || route.path === '/403') return
    tabsStore.upsertTab({
      path: route.fullPath,
      title: route.meta.title || String(route.name || route.fullPath),
      name: route.name ? String(route.name) : undefined,
      closable: route.path !== '/dashboard',
      keepAlive: Boolean(route.meta.keepAlive)
    })
  },
  { immediate: true }
)

const breadcrumbs = computed(() => {
  return route.matched
    .filter((item) => item.meta?.title && item.path !== '/')
    .map((item) => ({
      path: item.path,
      title: item.meta.title || String(item.name || item.path)
    }))
})

const handleOpenKeysChange = (keys: string[]) => {
  openKeys.value = keys
}

const handleMenuSelect = (key: string) => {
  router.push(key)
}

const handleCollapsedChange = (value: boolean) => {
  appStore.sidebarCollapsed = value
}

const handleCloseTab = (path: string) => {
  const index = tabsStore.visitedTabs.findIndex((item) => item.path === path)
  const isCurrent = route.fullPath === path
  tabsStore.removeTab(path)

  if (!isCurrent) return

  const nextTab = tabsStore.visitedTabs[index - 1] || tabsStore.visitedTabs[tabsStore.visitedTabs.length - 1]
  router.replace(nextTab?.path || '/dashboard')
}

const handleLogout = () => {
  authStore.logout()
  permissionStore.reset()
  tabsStore.reset()
  router.replace('/login')
}
</script>

<style scoped>
.admin-layout {
  min-height: 100vh;
  display: grid;
  grid-template-columns: var(--admin-aside-width) 1fr;
  background: var(--amu-color-bg-fill);
  transition: grid-template-columns 0.2s ease;
}

.admin-layout__aside {
  border-right: 1px solid var(--amu-color-border);
  background: var(--amu-color-bg-elevated);
  padding: 6px 0;
  padding-bottom: 0;
  min-width: 0;
  display: flex;
  min-height: 0;
}

.admin-layout__aside :deep(.amu-menu--vertical) {
  width: 100%;
  height: 100%;
}

.admin-layout__aside :deep(.amu-menu-item),
.admin-layout__aside :deep(.amu-sub-menu__title) {
  min-height: 36px;
}

.admin-layout__aside.is-collapsed {
  overflow: hidden;
}

.admin-layout__logo {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 16px;
  font-weight: 700;
  padding: 8px 12px;
  margin-bottom: 6px;
}

.admin-layout__logo.is-collapsed {
  justify-content: center;
  padding: 8px 0;
}

.admin-layout__logo-mark {
  color: var(--amu-color-primary);
  font-size: 20px;
}

.admin-layout__logo-text {
  color: var(--amu-color-text-default);
}

.admin-layout__main {
  display: grid;
  grid-template-rows: 48px 1fr;
  min-width: 0;
}

.admin-layout__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  background: var(--amu-color-bg-elevated);
  border-bottom: 1px solid var(--amu-color-border);
}

.admin-layout__header-left,
.admin-layout__actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

.admin-layout__header-left {
  min-width: 0;
}

.admin-layout__header-left :deep(.amu-breadcrumb) {
  overflow: hidden;
}

.admin-layout__username {
  color: var(--amu-color-text-default);
  max-width: 96px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 13px;
}

.admin-layout__tool-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 30px;
  padding: 0 8px;
  border: 1px solid var(--amu-color-border);
  border-radius: var(--amu-radius);
  background: var(--amu-color-bg-fill);
}

.admin-layout__tool-item--switch {
  padding-right: 6px;
}

.admin-layout__tool-label {
  font-size: 12px;
  color: var(--amu-color-text-default);
}

.admin-layout__tool-btn {
  min-width: 64px;
}

.admin-layout__user {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 30px;
  padding: 0 8px;
  border: 1px solid var(--amu-color-border);
  border-radius: var(--amu-radius);
  background: var(--amu-color-bg-fill);
}

.admin-layout__avatar {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  color: var(--amu-color-primary);
  border: 1px solid var(--amu-color-border);
}

.admin-layout__content {
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 0;
}

.admin-layout__tabs {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  min-height: 40px;
  padding: 6px 12px;
  background: var(--amu-color-bg-elevated);
  border-bottom: 1px solid var(--amu-color-border);
}

.admin-layout__tabs :deep(.amu-tag) {
  min-height: 24px;
}

.admin-layout__view {
  padding: 15px;
}

</style>
