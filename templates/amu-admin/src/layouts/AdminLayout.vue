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
          <div class="admin-layout__logo">
            <div class="admin-layout__logo-mark">
             A
            </div>
            <span v-show="!appStore.sidebarCollapsed" class="admin-layout__logo-text">Amu Admin</span>
          </div>
        </template>

        <template v-for="item in permissionStore.menuTree" :key="item.key">
          <AmuSubMenu v-if="item.children?.length" :index="item.key" :title="item.title">
            <template #icon>
              <component :is="resolveMenuIcon(item.key)" />
            </template>
            <AmuMenuItem v-for="child in item.children" :key="child.key" :index="child.key">
              <template #icon>
                <component :is="resolveMenuIcon(child.key)" />
              </template>
              {{ child.title }}
            </AmuMenuItem>
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
          <div class="admin-layout__header-icon" @click="appStore.sidebarCollapsed = !appStore.sidebarCollapsed">
            <component :is="MenuIcon" />
          </div>
          <div class="admin-layout__header-icon" @click="handleRefresh">
            <component :is="RefreshIcon" />
          </div>
          <AmuBreadcrumb separator=">">
            <AmuBreadcrumbItem v-for="crumb in breadcrumbs" :key="crumb.path">
              <div class="admin-layout__breadcrumb-item">
                <component :is="resolveMenuIcon(crumb.path)" class="admin-layout__breadcrumb-icon" v-if="resolveMenuIcon(crumb.path)" />
                {{ crumb.title }}
              </div>
            </AmuBreadcrumbItem>
          </AmuBreadcrumb>
        </div>

        <div class="admin-layout__actions">
          <div class="admin-layout__search">
            <component :is="SearchIcon" class="admin-layout__search-icon" />
            <span class="admin-layout__search-text">搜索</span>
            <span class="admin-layout__search-shortcut">Ctrl K</span>
          </div>
          
          <div class="admin-layout__header-icon">
            <component :is="SettingsIcon" />
          </div>
          <div class="admin-layout__header-icon" @click="appStore.isDark = !appStore.isDark">
            <component :is="appStore.isDark ? SunIcon : MoonIcon" />
          </div>
          <div class="admin-layout__header-icon">
            <component :is="TranslateIcon" />
          </div>
          <div class="admin-layout__header-icon">
            <component :is="HistoryIcon" />
          </div>
          <div class="admin-layout__header-icon" @click="toggleFullscreen">
            <component :is="FullscreenIcon" />
          </div>
          <div class="admin-layout__header-icon admin-layout__header-icon--badge">
            <component :is="BellIcon" />
            <span class="admin-layout__badge admin-layout__badge--blue"></span>
          </div>
          
          <div class="admin-layout__user-avatar" @click="handleLogout">
            <img src="https://api.dicebear.com/7.x/micah/svg?seed=Felix" alt="avatar" class="admin-layout__avatar-img" />
            <span class="admin-layout__badge admin-layout__badge--green"></span>
          </div>
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
            <Transition name="fade-transform" mode="out-in">
              <KeepAlive :include="tabsStore.cacheNames">
                <component :is="Component" :key="currentRoute.fullPath" />
              </KeepAlive>
            </Transition>
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

const createOutlineIcon = (children: any[]) => () =>
  h(
    'svg',
    { viewBox: '0 0 24 24', width: '1em', height: '1em', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' },
    children
  )

const MenuIcon = createOutlineIcon([
  h('line', { x1: '3', y1: '12', x2: '21', y2: '12' }),
  h('line', { x1: '3', y1: '6', x2: '21', y2: '6' }),
  h('line', { x1: '3', y1: '18', x2: '21', y2: '18' })
])
const RefreshIcon = createOutlineIcon([
  h('polyline', { points: '23 4 23 10 17 10' }),
  h('polyline', { points: '1 20 1 14 7 14' }),
  h('path', { d: 'M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15' })
])
const SearchIcon = createOutlineIcon([
  h('circle', { cx: '11', cy: '11', r: '8' }),
  h('line', { x1: '21', y1: '21', x2: '16.65', y2: '16.65' })
])
const SettingsIcon = createOutlineIcon([
  h('circle', { cx: '12', cy: '12', r: '3' }),
  h('path', { d: 'M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z' })
])
const MoonIcon = createOutlineIcon([
  h('path', { d: 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' })
])
const SunIcon = createOutlineIcon([
  h('circle', { cx: '12', cy: '12', r: '4' }),
  h('line', { x1: '12', y1: '2', x2: '12', y2: '4' }),
  h('line', { x1: '12', y1: '20', x2: '12', y2: '22' }),
  h('line', { x1: '4.93', y1: '4.93', x2: '6.34', y2: '6.34' }),
  h('line', { x1: '17.66', y1: '17.66', x2: '19.07', y2: '19.07' }),
  h('line', { x1: '2', y1: '12', x2: '4', y2: '12' }),
  h('line', { x1: '20', y1: '12', x2: '22', y2: '12' }),
  h('line', { x1: '4.93', y1: '19.07', x2: '6.34', y2: '17.66' }),
  h('line', { x1: '17.66', y1: '6.34', x2: '19.07', y2: '4.93' })
])
const TranslateIcon = createOutlineIcon([
  h('path', { d: 'M5 8l6 6M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6' })
])
const HistoryIcon = createOutlineIcon([
  h('path', { d: 'M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8' }),
  h('path', { d: 'M3 3v5h5' }),
  h('path', { d: 'M12 7v5l4 2' })
])
const FullscreenIcon = createOutlineIcon([
  h('path', { d: 'M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3' })
])
const BellIcon = createOutlineIcon([
  h('path', { d: 'M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9' }),
  h('path', { d: 'M13.73 21a2 2 0 0 1-3.46 0' })
])

const DashboardIcon = createOutlineIcon([
  h('rect', { x: '3', y: '3', width: '7', height: '9', rx: '1' }),
  h('rect', { x: '14', y: '3', width: '7', height: '5', rx: '1' }),
  h('rect', { x: '14', y: '12', width: '7', height: '9', rx: '1' }),
  h('rect', { x: '3', y: '16', width: '7', height: '5', rx: '1' })
])
const FolderIcon = createOutlineIcon([
  h('path', { d: 'M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z' })
])
const UserIcon = createOutlineIcon([
  h('path', { d: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' }),
  h('circle', { cx: '12', cy: '7', r: '4' })
])
const RoleIcon = createOutlineIcon([
  h('path', { d: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' }),
  h('circle', { cx: '9', cy: '7', r: '4' }),
  h('path', { d: 'M23 21v-2a4 4 0 0 0-3-3.87' }),
  h('path', { d: 'M16 3.13a4 4 0 0 1 0 7.75' })
])
const ShieldIcon = createOutlineIcon([
  h('path', { d: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' })
])
const ChartIcon = createOutlineIcon([
  h('line', { x1: '18', y1: '20', x2: '18', y2: '10' }),
  h('line', { x1: '12', y1: '20', x2: '12', y2: '4' }),
  h('line', { x1: '6', y1: '20', x2: '6', y2: '14' })
])

const resolveMenuIcon = (key: string) => {
  if (key === '/dashboard') return DashboardIcon
  if (key === '/system') return FolderIcon
  if (key === '/system/users') return UserIcon
  if (key === '/system/roles') return RoleIcon
  if (key === '/system/auth-debug') return ShieldIcon
  if (key.includes('analysis')) return ChartIcon
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

const handleRefresh = () => {
  window.location.reload()
}

const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    }
  }
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
  height: 100vh;
  display: grid;
  grid-template-columns: var(--admin-aside-width) 1fr;
  background: var(--amu-color-bg-fill);
  transition: grid-template-columns 0.2s ease;
  overflow: hidden;
}

.admin-layout__aside {
  border-right: 1px solid var(--amu-color-border);
  background: var(--amu-color-bg-elevated);
  padding: 0;
  min-width: 0;
  display: flex;
  min-height: 0;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.02);
  z-index: 20;
}

.admin-layout__aside :deep(.amu-menu--vertical) {
  width: 100%;
  height: 100%;
}

.admin-layout__aside :deep(.amu-menu__logo) {
  justify-content: flex-start;
  padding: 0 16px;
}

.admin-layout__aside :deep(.amu-menu--collapsed) {
  width: 100%;
  transition: none;
}

.admin-layout__aside :deep(.amu-menu-item),
.admin-layout__aside :deep(.amu-sub-menu__title) {
  min-height: 40px;
}

.admin-layout__aside.is-collapsed {
  overflow: hidden;
}

.admin-layout__logo {
  display: flex;
  align-items: center;
  position: relative;
  font-size: 18px;
  font-weight: 700;
  height: 60px;
  box-sizing: border-box;
}

.admin-layout__logo-mark {
  color: #fff;
  background: var(--amu-color-primary);
  width: 40px;
  height: 40px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  flex-shrink: 0;
}

.admin-layout__logo-text {
  color: var(--amu-color-text-default);
  position: absolute;
  left: 48px;
  top: 50%;
  transform: translateY(-50%);
  white-space: nowrap;
  pointer-events: none;
}

.admin-layout__main {
  display: grid;
  grid-template-rows: 52px 1fr;
  min-width: 0;
  min-height: 0;
}

.admin-layout__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background: var(--amu-color-bg-elevated);
  border-bottom: 1px solid var(--amu-color-border);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.02);
  z-index: 10;
}

.admin-layout__header-left,
.admin-layout__actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.admin-layout__header-left {
  min-width: 0;
}

.admin-layout__header-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  font-size: 16px;
  border-radius: 6px;
  color: var(--amu-color-text-secondary);
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.admin-layout__header-icon:hover {
  background: var(--amu-color-bg-fill);
  color: var(--amu-color-text-default);
}

.admin-layout__header-icon--badge {
  overflow: visible;
}

.admin-layout__badge {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  border: 1px solid var(--amu-color-bg-elevated);
}

.admin-layout__badge--blue {
  background-color: #1677ff;
}

.admin-layout__badge--green {
  background-color: #52c41a;
  top: auto;
  bottom: 0;
  right: 0;
  width: 8px;
  height: 8px;
}

.admin-layout__breadcrumb-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.admin-layout__breadcrumb-icon {
  font-size: 14px;
  color: var(--amu-color-text-secondary);
}

.admin-layout__search {
  display: inline-flex;
  align-items: center;
  height: 32px;
  padding: 0 8px 0 12px;
  background: var(--amu-color-bg-fill);
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.2s;
  gap: 8px;
  margin-right: 8px;
}

.admin-layout__search:hover {
  background: var(--amu-color-border);
}

.admin-layout__search-icon {
  color: var(--amu-color-text-secondary);
  font-size: 14px;
}

.admin-layout__search-text {
  color: var(--amu-color-text-secondary);
  font-size: 13px;
}

.admin-layout__search-shortcut {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  padding: 0 6px;
  background: var(--amu-color-bg-elevated);
  border: 1px solid var(--amu-color-border);
  border-radius: 4px;
  font-size: 12px;
  color: var(--amu-color-text-secondary);
  margin-left: 4px;
}

.admin-layout__user-avatar {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  margin-left: 4px;
  transition: all 0.2s;
}

.admin-layout__user-avatar:hover {
  opacity: 0.8;
}

.admin-layout__avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  background: #f0f2f5;
}

.admin-layout__avatar-text {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  background: var(--amu-color-primary);
}

.admin-layout__header-left :deep(.amu-breadcrumb) {
  overflow: hidden;
}

.admin-layout__content {
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 0;
  background: var(--amu-color-bg-fill);
  min-height: 0;
}

.admin-layout__tabs {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  min-height: 36px;
  padding: 2px 12px;
  background: var(--amu-color-bg-elevated);
  border-bottom: 1px solid var(--amu-color-border);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.02);
  z-index: 5;
}

.admin-layout__tabs :deep(.amu-tag) {
  min-height: 28px;
  cursor: pointer;
  transition: all 0.2s;
}

.admin-layout__tabs :deep(.amu-tag:hover) {
  opacity: 0.8;
}

.admin-layout__view {
  padding: 16px;
  overflow-y: auto;
  background: var(--amu-color-bg-fill);
  position: relative;
  min-height: 0;
}

/* 页面切换动画 */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.3s;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

</style>
