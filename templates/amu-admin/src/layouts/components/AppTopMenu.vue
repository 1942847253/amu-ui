<template>
  <div class="app-top-menu" :data-amu-theme="appStore.headerDark ? 'dark' : undefined">
    <AmuMenu
      mode="horizontal"
      :theme="appStore.isDark || appStore.headerDark ? 'dark' : 'light'"
      :selected-keys="[selectedKey]"
      @select="handleMenuSelect"
    >
      <template v-for="item in permissionStore.menuTree" :key="item.key">
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
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  AmuMenu,
  AmuMenuItem,
  AmuSubMenu,
} from 'amu-ui/menu'
import { AmuIcon } from 'amu-ui/icon'
import { usePermissionStore } from '../../store/permission'
import { useAppStore } from '../../store/app'
import { useLayout } from '../composables/useLayout'

const props = withDefaults(defineProps<{
  mixedNav?: boolean
  mixedRoot?: string
}>(), {
  mixedNav: false,
  mixedRoot: ''
})

const emit = defineEmits<{
  (e: 'update:mixedRoot', value: string): void
}>()

const router = useRouter()
const route = useRoute()
const permissionStore = usePermissionStore()
const appStore = useAppStore()
const { resolveMenuIcon, translateRouteTitle } = useLayout()

const selectedKey = computed(() => {
  if (props.mixedNav) {
    return props.mixedRoot || route.path
  }
  return route.path
})

const resolveFirstLeafPath = (key: string) => {
  const root = permissionStore.menuTree.find((item) => item.key === key)
  if (!root) return ''
  if (!root.children?.length) return root.key

  const queue = [...root.children]
  while (queue.length > 0) {
    const current = queue.shift()
    if (!current) continue
    if (!current.children?.length) return current.key
    queue.unshift(...current.children)
  }
  return root.key
}

const findRootKey = (key: string) => {
  for (const root of permissionStore.menuTree) {
    if (root.key === key) return root.key
    if (root.children?.some((child) => child.key === key)) return root.key
  }
  return ''
}

const handleMenuSelect = (key: string) => {
  if (!key.startsWith('/')) return

  const firstLeaf = resolveFirstLeafPath(key)
  const targetKey = firstLeaf || key

  if (!props.mixedNav) {
    router.push(targetKey)
    return
  }

  const rootKey = findRootKey(targetKey)
  if (rootKey) {
    emit('update:mixedRoot', rootKey)
  }

  if (targetKey === rootKey) {
    const rootFirstLeaf = resolveFirstLeafPath(rootKey)
    if (rootFirstLeaf) {
      router.push(rootFirstLeaf)
    }
    return
  }

  router.push(targetKey)
}
</script>

<style scoped lang="less">
.app-top-menu {
  padding: 0 16px;
  background: var(--amu-color-bg-elevated);
  border-bottom: 1px solid var(--amu-color-border);
}

:deep(.amu-menu) {
  border-bottom: none;
}
</style>