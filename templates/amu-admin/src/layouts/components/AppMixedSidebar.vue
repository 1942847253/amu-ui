<template>
  <div class="app-mixed-sidebar">
    <div v-if="!compactPrimary" class="app-mixed-sidebar__primary">
      <div class="app-mixed-sidebar__logo">A</div>
      <AmuMenu
        class="app-mixed-sidebar__primary-menu"
        mode="vertical"
        :theme="menuTheme"
        :show-collapse-button="false"
        :selected-keys="[activeRootKey]"
        @select="handleRootSelect"
      >
        <AmuMenuItem v-for="item in permissionStore.menuTree" :key="item.key" :index="item.key">
          <template #icon>
            <AmuIcon>
              <component :is="resolveMenuIcon(item.key)" />
            </AmuIcon>
          </template>
        </AmuMenuItem>
      </AmuMenu>
    </div>

    <div v-if="showSecondary" class="app-mixed-sidebar__secondary">
      <div class="app-mixed-sidebar__title">{{ activeRootTitle }}</div>
      <AmuMenu
        class="app-mixed-sidebar__secondary-menu"
        mode="vertical"
        :theme="menuTheme"
        :show-collapse-button="false"
        :selected-keys="[activeLeafKey]"
        :open-keys="openKeys"
        @update:open-keys="handleOpenKeysChange"
        @select="handleLeafSelect"
      >
        <template v-for="item in secondaryMenu" :key="item.key">
          <AmuSubMenu
            v-if="item.children?.length"
            :index="item.key"
            :title="translateRouteTitle(item.title)"
          >
            <template #icon>
              <AmuIcon>
                <component :is="resolveMenuIcon(item.key)" />
              </AmuIcon>
            </template>
            <AmuMenuItem
              v-for="child in item.children"
              :key="child.key"
              :index="child.key"
            >
              <template #icon>
                <AmuIcon>
                  <component :is="resolveMenuIcon(child.key)" />
                </AmuIcon>
              </template>
              {{ translateRouteTitle(child.title) }}
            </AmuMenuItem>
          </AmuSubMenu>

          <AmuMenuItem v-else :index="item.key">
            <template #icon>
              <AmuIcon>
                <component :is="resolveMenuIcon(item.key)" />
              </AmuIcon>
            </template>
            {{ translateRouteTitle(item.title) }}
          </AmuMenuItem>
        </template>
      </AmuMenu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  AmuMenu,
  AmuMenuItem,
  AmuSubMenu,
} from 'amu-ui/menu'
import { AmuIcon } from 'amu-ui/icon'
import { usePermissionStore, type MenuNode } from '../../store/permission'
import { useAppStore } from '../../store/app'
import { useLayout } from '../composables/useLayout'

const props = withDefaults(defineProps<{
  compactPrimary?: boolean
  forceRootKey?: string
}>(), {
  compactPrimary: false,
  forceRootKey: ''
})

const emit = defineEmits<{
  (e: 'menu-select'): void
}>()

const route = useRoute()
const router = useRouter()
const permissionStore = usePermissionStore()
const appStore = useAppStore()
const { resolveMenuIcon, translateRouteTitle } = useLayout()

const activeRootKey = ref('')
const openKeys = ref<string[]>([])

const menuTheme = computed(() => {
  return appStore.isDark || appStore.sidebarDark || appStore.sidebarChildDark ? 'dark' : 'light'
})

const findRootByPath = (path: string) => {
  return permissionStore.menuTree.find((item) => {
    if (item.key === path) return true
    return item.children?.some((child) => child.key === path)
  })
}

const resolveFirstLeaf = (node?: MenuNode): string => {
  if (!node) return ''
  if (!node.children?.length) return node.key
  const queue = [...node.children]
  while (queue.length > 0) {
    const current = queue.shift()
    if (!current) continue
    if (!current.children?.length) return current.key
    queue.unshift(...current.children)
  }
  return node.key
}

const activeRoot = computed(() => {
  return permissionStore.menuTree.find((item) => item.key === activeRootKey.value)
})

const secondaryMenu = computed(() => {
  if (!activeRoot.value) return []
  if (!activeRoot.value.children?.length) return [activeRoot.value]
  return activeRoot.value.children
})

const activeRootTitle = computed(() => {
  if (!activeRoot.value) return ''
  return translateRouteTitle(activeRoot.value.title)
})

const activeLeafKey = computed(() => route.path)

const showSecondary = computed(() => {
  if (appStore.layoutMode === 'mixed-nav') return true
  if (appStore.layoutMode === 'double-column') return true
  return appStore.showMixedChildMenu
})

watch(
  () => props.forceRootKey,
  (value) => {
    if (!value) return
    activeRootKey.value = value
  },
  { immediate: true }
)

watch(
  () => [route.path, permissionStore.menuTree] as const,
  () => {
    const root = findRootByPath(route.path) || permissionStore.menuTree[0]
    if (!root) {
      activeRootKey.value = ''
      return
    }
    activeRootKey.value = root.key
    if (root.children?.length) {
      openKeys.value = [root.children[0].key]
    }
  },
  { immediate: true }
)

const handleRootSelect = (key: string) => {
  activeRootKey.value = key
  const root = permissionStore.menuTree.find((item) => item.key === key)
  if (!root) return

  if (!root.children?.length) {
    router.push(root.key)
    emit('menu-select')
    return
  }

  if (!showSecondary.value || appStore.autoActivateFirstMenu) {
    const firstLeaf = resolveFirstLeaf(root)
    if (firstLeaf) {
      router.push(firstLeaf)
      emit('menu-select')
    }
  }
}

const handleLeafSelect = (key: string) => {
  router.push(key)
  emit('menu-select')
}

const handleOpenKeysChange = (keys: string[]) => {
  if (appStore.sidebarAccordion && keys.length > 1) {
    openKeys.value = [keys[keys.length - 1]]
    return
  }
  openKeys.value = keys
}
</script>

<style scoped lang="less">
.app-mixed-sidebar {
  height: 100%;
  display: flex;
  min-height: 0;
}

.app-mixed-sidebar__primary {
  width: 64px;
  border-right: 1px solid var(--amu-color-border);
  background: var(--amu-color-bg-elevated);
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.app-mixed-sidebar__secondary {
  width: 216px;
  background: var(--amu-color-bg-elevated);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.app-mixed-sidebar__logo {
  width: 32px;
  height: 32px;
  margin: 16px auto;
  border-radius: 6px;
  background: var(--amu-color-primary);
  color: var(--amu-color-on-solid);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
}

.app-mixed-sidebar__title {
  padding: 16px 16px 8px;
  color: var(--amu-color-text);
  font-weight: 600;
}

.app-mixed-sidebar__primary-menu,
.app-mixed-sidebar__secondary-menu {
  flex: 1;
  min-height: 0;
}

:deep(.app-mixed-sidebar__primary-menu.amu-menu),
:deep(.app-mixed-sidebar__secondary-menu.amu-menu) {
  height: 100%;
}
</style>