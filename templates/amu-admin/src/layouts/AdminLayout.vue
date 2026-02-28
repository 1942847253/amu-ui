<template>
  <div
    class="admin-layout"
    :class="{ 'admin-layout--content-fullscreen': isContentFullscreen }"
    :data-amu-theme="appStore.isDark ? 'dark' : undefined"
    :style="layoutStyle"
  >
    <div
      v-if="isRefreshing"
      class="admin-layout__top-progress"
      :style="{ width: `${refreshProgress}%` }"
    ></div>
    <aside class="admin-layout__aside" :class="{ 'is-collapsed': appStore.sidebarCollapsed }">
      <AmuMenu
        mode="vertical"
        trigger="click"
        :show-collapse-button="false"
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
              <AmuIcon>
                <component :is="resolveMenuIcon(item.key)" />
              </AmuIcon>
            </template>
            <AmuMenuItem v-for="child in item.children" :key="child.key" :index="child.key">
              <template #icon>
                <AmuIcon>
                  <component :is="resolveMenuIcon(child.key)" />
                </AmuIcon>
              </template>
              {{ child.title }}
            </AmuMenuItem>
          </AmuSubMenu>
          <AmuMenuItem v-else :index="item.key">
            <template #icon>
              <AmuIcon>
                <component :is="resolveMenuIcon(item.key)" />
              </AmuIcon>
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
            <AmuIcon>
              <IconMenu />
            </AmuIcon>
          </div>
          <div class="admin-layout__header-icon" @click="handleRefresh">
            <AmuIcon :class="{ 'admin-layout__refresh-icon--spinning': isRefreshing }">
              <IconRefreshCw />
            </AmuIcon>
          </div>
          <AmuBreadcrumb separator=">">
            <AmuBreadcrumbItem v-for="crumb in breadcrumbs" :key="crumb.path">
              <div
                class="admin-layout__breadcrumb-item"
                :class="{ 'admin-layout__breadcrumb-item--clickable': isBreadcrumbClickable(crumb.path) }"
                @click="handleBreadcrumbClick(crumb.path)"
              >
                <AmuIcon v-if="resolveMenuIcon(crumb.path)" :size="20">
                  <component :is="resolveMenuIcon(crumb.path)" />
                </AmuIcon>
                {{ crumb.title }}
              </div>
            </AmuBreadcrumbItem>
          </AmuBreadcrumb>
        </div>

        <div class="admin-layout__actions">
          <div class="admin-layout__search">
            <AmuIcon class="admin-layout__search-icon">
              <IconSearch />
            </AmuIcon>
            <span class="admin-layout__search-text">搜索</span>
            <span class="admin-layout__search-shortcut">Ctrl K</span>
          </div>
          
          <div class="admin-layout__header-icon">
            <AmuIcon>
              <IconSettings />
            </AmuIcon>
          </div>
          <div class="admin-layout__header-icon" @click="appStore.isDark = !appStore.isDark">
            <AmuIcon>
              <component :is="appStore.isDark ? IconSun : IconMoon" />
            </AmuIcon>
          </div>
          <div class="admin-layout__header-icon">
            <AmuIcon>
              <IconGlobe />
            </AmuIcon>
          </div>
          <div class="admin-layout__header-icon">
            <AmuIcon>
              <IconClock />
            </AmuIcon>
          </div>
          <div class="admin-layout__header-icon" @click="toggleFullscreen">
            <AmuIcon>
              <component :is="isContentFullscreen ? IconMinimize : IconMaximize" />
            </AmuIcon>
          </div>
          <div class="admin-layout__header-icon admin-layout__header-icon--badge">
            <AmuIcon>
              <IconBell />
            </AmuIcon>
            <span class="admin-layout__badge admin-layout__badge--blue"></span>
          </div>
          
          <div class="admin-layout__user-avatar" @click="handleLogout">
            <img src="https://api.dicebear.com/7.x/micah/svg?seed=Felix" alt="avatar" class="admin-layout__avatar-img" />
            <span class="admin-layout__badge admin-layout__badge--green"></span>
          </div>
        </div>
      </header>

      <section class="admin-layout__content">
        <div class="admin-layout__tabs-bar">
          <Draggable
            v-model="draggableTabs"
            item-key="path"
            class="admin-layout__tabs"
            :animation="200"
            ghost-class="admin-layout__tab-ghost"
            chosen-class="admin-layout__tab-chosen"
            drag-class="admin-layout__tab-drag"
          >
            <template #item="{ element: tab }">
              <div class="admin-layout__tab-item">
                <AmuTag
                  :type="tab.path === activeKey ? 'primary' : 'default'"
                  :closable="tab.closable"
                  @click="router.push(tab.path)"
                  @close="handleCloseTab(tab.path)"
                >
                  {{ tab.title }}
                </AmuTag>
              </div>
            </template>
          </Draggable>

          <div class="admin-layout__tabs-extra">
            <AmuDropdown trigger="click" placement="bottom-end" @select="handleCurrentTabCommand">
              <div class="admin-layout__tabs-extra-btn">
                <AmuIcon><IconChevronDown /></AmuIcon>
              </div>
              <template #overlay>
                <AmuDropdownMenu>
                  <AmuDropdownItem command="close-current" :icon="IconX" :disabled="!canCloseCurrentTab">
                    关闭
                  </AmuDropdownItem>
                  <AmuDropdownItem command="pin" :icon="IconMapPin" :disabled="isDashboardTab">
                    {{ isCurrentTabPinned ? '取消固定' : '固定' }}
                  </AmuDropdownItem>
                  <AmuDropdownItem command="maximize" :icon="isContentFullscreen ? IconMinimize : IconMaximize">
                    {{ isContentFullscreen ? '还原' : '最大化' }}
                  </AmuDropdownItem>
                  <AmuDropdownItem command="reload" :icon="IconRefreshCw">
                    重新加载
                  </AmuDropdownItem>
                  <AmuDropdownItem command="new-window" :icon="IconExternalLink">
                    在新窗口打开
                  </AmuDropdownItem>

                  <AmuDropdownItem divided command="close-left" :icon="IconArrowLeft" :disabled="!hasClosableLeftTabs">
                    关闭左侧标签页
                  </AmuDropdownItem>
                  <AmuDropdownItem command="close-right" :icon="IconArrowRight" :disabled="!hasClosableRightTabs">
                    关闭右侧标签页
                  </AmuDropdownItem>

                  <AmuDropdownItem divided command="close-others" :icon="IconXCircle" :disabled="!hasClosableOtherTabs">
                    关闭其它标签页
                  </AmuDropdownItem>
                  <AmuDropdownItem command="close-all" :icon="IconRepeat" :disabled="!hasClosableTabs">
                    关闭全部标签页
                  </AmuDropdownItem>
                </AmuDropdownMenu>
              </template>
            </AmuDropdown>
                  <div class="admin-layout__tabs-extra-btn" @click="handleRefresh">
              <AmuIcon><IconRefreshCw /></AmuIcon>
            </div>
            <div class="admin-layout__tabs-extra-btn" @click="toggleFullscreen">
              <AmuIcon><component :is="isContentFullscreen ? IconMinimize : IconMaximize" /></AmuIcon>
            </div>
          </div>
        </div>

        <AmuScrollbar class="admin-layout__scrollbar">
          <div class="admin-layout__view">
            <RouterView v-slot="{ Component, route: currentRoute }">
              <Transition name="fade-transform" mode="out-in">
                <KeepAlive :include="aliveCacheNames">
                  <component :is="Component" :key="`${currentRoute.fullPath}::${refreshViewKey}`" />
                </KeepAlive>
              </Transition>
            </RouterView>
          </div>
        </AmuScrollbar>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { AmuBreadcrumb, AmuBreadcrumbItem } from 'amu-ui/breadcrumb'
import { AmuButton } from 'amu-ui/button'
import { AmuMenu, AmuMenuItem, AmuSubMenu } from 'amu-ui/menu'
import { AmuScrollbar } from 'amu-ui/scrollbar'
import { AmuSwitch } from 'amu-ui/switch'
import { AmuTag } from 'amu-ui/tag'
import { AmuIcon } from 'amu-ui/icon'
import { AmuDropdown, AmuDropdownMenu, AmuDropdownItem } from 'amu-ui/dropdown'
import {
  IconMenu,
  IconRefreshCw,
  IconSearch,
  IconSettings,
  IconMoon,
  IconSun,
  IconGlobe,
  IconClock,
  IconMaximize,
  IconMinimize,
  IconBell,
  IconGrid,
  IconFolder,
  IconUser,
  IconUsers,
  IconShield,
  IconBarChart,
  IconMonitor,
  IconX,
  IconMapPin,
  IconExternalLink,
  IconArrowLeft,
  IconArrowRight,
  IconXCircle,
  IconRepeat,
  IconChevronDown
} from '@amu-ui/icons'
import { computed, nextTick, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Draggable from 'vuedraggable'
import { useAuthStore } from '../store/auth'
import { useAppStore } from '../store/app'
import { usePermissionStore } from '../store/permission'
import { useTabsStore } from '../store/tabs'

let refreshProgressTimer: number | null = null

const route = useRoute()
const router = useRouter()

const authStore = useAuthStore()
const appStore = useAppStore()
const permissionStore = usePermissionStore()
const tabsStore = useTabsStore()
const isRefreshing = ref(false)
const isContentFullscreen = ref(false)
const refreshProgress = ref(0)
const refreshViewKey = ref(0)
const refreshingCacheName = ref<string | null>(null)

const layoutStyle = computed(() => {
  return {
    '--admin-aside-width': appStore.sidebarCollapsed ? '72px' : '240px'
  }
})

const resolveMenuIcon = (key: string) => {
    if (key === '/workplace') return IconMonitor
  if (key === '/system') return IconFolder
  if (key === '/system/users') return IconUser
  if (key === '/system/roles') return IconUsers
  if (key === '/system/auth-debug') return IconShield
  if (key.includes('analysis')) return IconBarChart
  return IconFolder
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

const aliveCacheNames = computed(() => {
  if (!refreshingCacheName.value) return tabsStore.cacheNames
  return tabsStore.cacheNames.filter((name) => name !== refreshingCacheName.value)
})

const currentTab = computed(() => {
  return tabsStore.visitedTabs.find((tab) => tab.path === route.fullPath)
})

const currentTabIndex = computed(() => {
  return tabsStore.visitedTabs.findIndex((tab) => tab.path === route.fullPath)
})

const canCloseCurrentTab = computed(() => Boolean(currentTab.value?.closable))
const isDashboardTab = computed(() => currentTab.value?.path === '/dashboard')
const isCurrentTabPinned = computed(() => Boolean(currentTab.value) && !currentTab.value!.closable)

const hasClosableTabs = computed(() => {
  return tabsStore.visitedTabs.some((tab) => tab.closable)
})

const hasClosableLeftTabs = computed(() => {
  if (currentTabIndex.value <= 0) return false
  return tabsStore.visitedTabs.slice(0, currentTabIndex.value).some((tab) => tab.closable)
})

const hasClosableRightTabs = computed(() => {
  if (currentTabIndex.value < 0) return false
  return tabsStore.visitedTabs.slice(currentTabIndex.value + 1).some((tab) => tab.closable)
})

const hasClosableOtherTabs = computed(() => {
  const targetPath = currentTab.value?.path
  if (!targetPath) return false
  return tabsStore.visitedTabs.some((tab) => tab.path !== targetPath && tab.closable)
})

const draggableTabs = computed({
  get: () => tabsStore.visitedTabs,
  set: (tabs) => {
    tabsStore.visitedTabs = tabs
  }
})

const handleOpenKeysChange = (keys: string[]) => {
  openKeys.value = keys
}

const handleMenuSelect = (key: string) => {
  router.push(key)
}

const resolveBreadcrumbTargetPath = (path: string) => {
  const routeRecord = router.getRoutes().find((item) => item.path === path)
  if (!routeRecord?.children?.length) return path

  const firstChild = routeRecord.children[0]
  if (!firstChild) return path

  if (firstChild.path.startsWith('/')) return firstChild.path
  const normalizedPath = path.endsWith('/') ? path.slice(0, -1) : path
  return `${normalizedPath}/${firstChild.path}`
}

const isBreadcrumbClickable = (path: string) => {
  return resolveBreadcrumbTargetPath(path) !== route.path
}

const handleBreadcrumbClick = (path: string) => {
  const targetPath = resolveBreadcrumbTargetPath(path)
  if (!isBreadcrumbClickable(path)) return
  router.push(targetPath)
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

const handleCurrentTabCommand = (command: unknown) => {
  const tab = currentTab.value
  if (!tab) return

  switch (command) {
    case 'close-current':
      handleCloseTab(tab.path)
      break
    case 'pin':
      tabsStore.togglePin(tab.path)
      break
    case 'maximize':
      toggleFullscreen()
      break
    case 'reload':
      handleRefresh()
      break
    case 'new-window':
      window.open(router.resolve(tab.path).href, '_blank')
      break
    case 'close-left':
      tabsStore.removeLeft(tab.path)
      break
    case 'close-right':
      tabsStore.removeRight(tab.path)
      break
    case 'close-others':
      tabsStore.removeOthers(tab.path)
      break
    case 'close-all':
      tabsStore.removeAll()
      router.push('/dashboard')
      break
  }
}

const clearRefreshProgressTimer = () => {
  if (refreshProgressTimer === null) return
  window.clearInterval(refreshProgressTimer)
  refreshProgressTimer = null
}

const startRefreshProgress = () => {
  clearRefreshProgressTimer()
  refreshProgress.value = 8
  refreshProgressTimer = window.setInterval(() => {
    if (refreshProgress.value >= 90) return
    const step = refreshProgress.value < 50 ? 10 : 4
    refreshProgress.value = Math.min(90, refreshProgress.value + step)
  }, 120)
}

const finishRefreshProgress = async () => {
  clearRefreshProgressTimer()
  refreshProgress.value = 100
  await new Promise((resolve) => setTimeout(resolve, 180))
  isRefreshing.value = false
  refreshProgress.value = 0
}

const handleRefresh = async () => {
  if (isRefreshing.value) return
  isRefreshing.value = true
  startRefreshProgress()

  const currentRouteName = route.name ? String(route.name) : ''
  const shouldDropCache = Boolean(currentRouteName) && tabsStore.cacheNames.includes(currentRouteName)

  if (shouldDropCache) {
    refreshingCacheName.value = currentRouteName
    await nextTick()
  }

  refreshViewKey.value += 1

  if (shouldDropCache) {
    await nextTick()
    refreshingCacheName.value = null
  }

  await nextTick()
  await finishRefreshProgress()
}

const toggleFullscreen = () => {
  isContentFullscreen.value = !isContentFullscreen.value
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
  transition: grid-template-columns 0.24s ease;
  overflow: hidden;
}

.admin-layout--content-fullscreen {
  grid-template-columns: 0 1fr;
}

.admin-layout--content-fullscreen .admin-layout__main {
  grid-template-rows: 0 1fr;
}

.admin-layout--content-fullscreen .admin-layout__aside {
  opacity: 0;
  transform: translateX(-8px);
  border-right-color: transparent;
  pointer-events: none;
}

.admin-layout--content-fullscreen .admin-layout__header {
  opacity: 0;
  transform: translateY(-8px);
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
  border-bottom-color: transparent;
  pointer-events: none;
}

.admin-layout__top-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  width: 0;
  background: var(--amu-color-primary);
  transition: width 0.22s ease;
  z-index: 1200;
  pointer-events: none;
}

.admin-layout__top-progress::after {
  content: '';
  position: absolute;
  top: 0;
  right: -1px;
  width: 56px;
  height: 100%;
  transform: translateX(40%);
  background: linear-gradient(90deg, rgba(255, 255, 255, 0), var(--amu-color-primary));
  box-shadow: 0 0 8px var(--amu-color-primary), 0 0 2px var(--amu-color-primary);
  opacity: 0.85;
}

.admin-layout__aside {
  grid-column: 1;
  grid-row: 1;
  border-right: 1px solid var(--amu-color-border);
  background: var(--amu-color-bg-elevated);
  padding: 0;
  min-width: 0;
  display: flex;
  min-height: 0;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.02);
  z-index: 20;
  overflow: hidden;
  transition: opacity 0.2s ease, transform 0.24s ease, border-color 0.2s ease;
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
  grid-column: 2;
  grid-row: 1;
  display: grid;
  grid-template-rows: 52px 1fr;
  min-width: 0;
  min-height: 0;
  transition: grid-template-rows 0.24s ease;
}

.admin-layout__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-height: 52px;
  overflow: hidden;
  padding: 0 16px;
  background: var(--amu-color-bg-elevated);
  border-bottom: 1px solid var(--amu-color-border);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.02);
  z-index: 10;
  transition: opacity 0.2s ease, transform 0.24s ease, max-height 0.24s ease, padding 0.24s ease, border-color 0.2s ease;
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

.admin-layout__breadcrumb-item--clickable {
  cursor: pointer;
}

.admin-layout__breadcrumb-item--clickable:hover {
  color: var(--amu-color-primary);
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

.admin-layout__refresh-icon--spinning {
  animation: admin-layout-rotate 0.6s linear;
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

.admin-layout__tabs-bar {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  background: var(--amu-color-bg-elevated);
  border-bottom: 1px solid var(--amu-color-border);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.02);
  z-index: 5;
}

.admin-layout__tabs {
  flex: 1;
  display: flex;
  align-items: center;
  align-self: stretch;
  gap: 8px;
  flex-wrap: nowrap;
  min-height: 36px;
  padding: 2px 12px;
  overflow-x: auto;
  scrollbar-width: none;
}
.admin-layout__tabs::-webkit-scrollbar {
  display: none;
}

.admin-layout__tabs:deep(.amu-tag) {
  min-height: 28px;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}

.admin-layout__tabs:deep(.amu-tag:hover) {
  opacity: 0.8;
}

.admin-layout__tab-item {
  display: flex;
  flex-shrink: 0;
  cursor: grab;
}

.admin-layout__tab-item:active {
  cursor: grabbing;
}

.admin-layout__tab-ghost {
  opacity: 0.35;
}

.admin-layout__tab-chosen {
  opacity: 0.7;
}

.admin-layout__tab-drag {
  opacity: 0.9;
}

.admin-layout__tabs-extra {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: auto;
  align-self: stretch;
  height: auto;
  color: var(--amu-color-text-secondary);
  border-left: 1px solid var(--amu-color-border-light);
  transition: all 0.2s;
}

.admin-layout__tabs-extra-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 100%;
  cursor: pointer;
  transition: all 0.2s;
}

.admin-layout__tabs-extra-btn:hover {
  background-color: var(--amu-color-bg-fill);
  color: var(--amu-color-text-default);
}

.admin-layout__tabs-extra :deep(.amu-dropdown) {
  display: flex;
  align-self: stretch;
}

.admin-layout__tabs-extra :deep(.amu-dropdown__trigger) {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.admin-layout__scrollbar {
  background: var(--amu-color-bg-fill);
  min-height: 0;
  height: 100%;
  overflow: hidden;
}

.admin-layout__view {
  padding: 16px;
  position: relative;
}

/* 页面切换动画 */
:deep(.fade-transform-leave-active),
:deep(.fade-transform-enter-active) {
  transition: all 0.4s;
}

:deep(.fade-transform-enter-from) {
  opacity: 0;
  transform: translateX(-20px);
}

:deep(.fade-transform-leave-to) {
  opacity: 0;
  transform: translateX(20px);
}

@keyframes admin-layout-rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

</style>
