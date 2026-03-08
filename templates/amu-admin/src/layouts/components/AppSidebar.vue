<template>
    <div class="app-sidebar-content" :data-amu-theme="sidebarTheme">
        <div class="admin-layout__logo">
            <div class="admin-layout__logo-mark">{{ logoMark }}</div>
            <span v-show="!collapsed" class="admin-layout__logo-text">{{ APP_META.name }}</span>
        </div>

        <AmuMenu class="app-sidebar-content__menu" mode="vertical"
            :theme="appStore.isDark || appStore.sidebarDark || appStore.sidebarChildDark ? 'dark' : 'light'"
            trigger="click" :show-collapse-button="false" :collapsed="collapsed"
            @update:collapsed="handleCollapsedChange" :selected-keys="[activeKey]" :open-keys="openKeys"
            @update:open-keys="handleOpenKeysChange" @select="handleMenuSelect">
            <template v-for="item in permissionStore.menuTree" :key="item.key">
                <AmuSubMenu v-if="item.children?.length" :index="item.key" :title="translateRouteTitle(item.title)">
                    <template #icon>
                        <AmuIcon>
                            <component :is="resolveMenuIcon(item.key, item.icon)" />
                        </AmuIcon>
                    </template>
                    <AmuMenuItem v-for="child in item.children" :key="child.key" :index="child.key">
                        <template #icon>
                            <AmuIcon>
                                <component :is="resolveMenuIcon(child.key, child.icon)" />
                            </AmuIcon>
                        </template>
                        {{ translateRouteTitle(child.title) }}
                    </AmuMenuItem>
                </AmuSubMenu>

                <AmuMenuItem v-else :index="item.key">
                    <template #icon>
                        <AmuIcon>
                            <component :is="resolveMenuIcon(item.key, item.icon)" />
                        </AmuIcon>
                    </template>
                    {{ translateRouteTitle(item.title) }}
                </AmuMenuItem>
            </template>
        </AmuMenu>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
    AmuMenu,
    AmuMenuItem,
    AmuSubMenu,
} from 'amu-ui/menu'
import { AmuIcon } from 'amu-ui/icon'
import { APP_META } from '../../config/app'
import { usePermissionStore } from '../../store/permission'
import { useAppStore } from '../../store/app'
import { useLayout } from '../composables/useLayout'

const props = defineProps<{
    collapsed?: boolean
}>()

const emit = defineEmits<{
    (e: 'update:collapsed', value: boolean): void
    (e: 'menu-select'): void
}>()

const router = useRouter()
const route = useRoute()
const permissionStore = usePermissionStore()
const appStore = useAppStore()
const { resolveMenuIcon, translateRouteTitle } = useLayout()
const logoMark = computed(() => APP_META.shortName.slice(0, 1).toUpperCase() || 'A')

const sidebarTheme = computed(() => {
    if (appStore.isDark || appStore.sidebarDark || appStore.sidebarChildDark) {
        return 'dark'
    }
    return undefined
})

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

        const firstGroup = permissionStore.menuTree.find(
            (item) => item.children?.length
        )
        openKeys.value = firstGroup ? [firstGroup.key] : []
    },
    { immediate: true }
)

const resolveFirstLeafPath = () => {
    const queue = [...permissionStore.menuTree]
    while (queue.length > 0) {
        const current = queue.shift()
        if (!current) continue
        if (current.children?.length) {
            queue.unshift(...current.children)
            continue
        }
        return current.key
    }
    return ''
}

watch(
    () => [permissionStore.menuTree, appStore.autoActivateFirstMenu, route.path] as const,
    () => {
        if (!appStore.autoActivateFirstMenu) return
        const hasMatched = permissionStore.menuTree.some((item) => {
            if (item.key === route.path) return true
            return item.children?.some((child) => child.key === route.path)
        })
        if (hasMatched) return
        const firstLeaf = resolveFirstLeafPath()
        if (firstLeaf) {
            router.replace(firstLeaf)
        }
    },
    { immediate: true }
)

const handleCollapsedChange = (val: boolean) => {
    emit('update:collapsed', val)
}

const handleOpenKeysChange = (keys: string[]) => {
    if (appStore.sidebarAccordion && keys.length > 1) {
        openKeys.value = [keys[keys.length - 1]]
        return
    }
    openKeys.value = keys
}

const resolveFirstLeafByKey = (key: string) => {
    const root = permissionStore.menuTree.find((item) => item.key === key)
    if (!root?.children?.length) return ''

    const queue = [...root.children]
    while (queue.length > 0) {
        const current = queue.shift()
        if (!current) continue
        if (!current.children?.length) return current.key
        queue.unshift(...current.children)
    }

    return ''
}

const handleMenuSelect = (key: string) => {
    if (key.startsWith('/')) {
        const firstLeaf = resolveFirstLeafByKey(key)
        router.push(firstLeaf || key)
        if (!props.collapsed) {
            emit('menu-select')
        }
    }
}
</script>

<style scoped lang="less">
.app-sidebar-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    min-height: 0;
    background: var(--amu-color-bg);
}

.app-sidebar-content__menu {
    flex: 1;
    min-height: 0;
}

:deep(.amu-menu--vertical, .amu-menu--inline) {
   border-right: none !important;
}

:deep(.amu-menu--inline) {
    border-right: none !important;
}

:deep(.app-sidebar-content__menu.amu-menu) {
    height: 100%;
}

.admin-layout__logo {
    flex-shrink: 0;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: left;
    padding: 0 16px;
    overflow: hidden;
    white-space: nowrap;
    transition: all 0.3s;
}

.admin-layout__logo-mark {
    width: 35px;
    height: 35px;
    border-radius: 6px;
    background: var(--amu-color-primary);
    color: var(--amu-color-on-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 18px;
    margin-right: 8px;
    flex-shrink: 0;
}

:deep(.amu-layout-sider--collapsed) .admin-layout__logo-mark {
    margin-right: 0;
}

.admin-layout__logo-text {
    font-size: 18px;
    font-weight: 600;
    color: var(--amu-color-text);
    transition: opacity 0.3s;
}
</style>
