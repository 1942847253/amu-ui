<template>
  <ul
    :class="[
      'amu-menu',
      `amu-menu--${computedMode}`,
      `amu-menu--${props.theme}`,
      {
        'amu-menu--collapsed': isCollapsed
      }
    ]"
    role="menubar"
  >
    <li v-if="$slots.logo" class="amu-menu__logo">
      <slot name="logo" :collapsed="isCollapsed" />
    </li>
    <slot />
    <li v-if="$slots.operations" class="amu-menu__operations">
      <slot name="operations" />
    </li>
    <li 
      v-if="showCollapseButton && computedMode === 'vertical'" 
      class="amu-menu__collapse-trigger"
      @click="toggleCollapse"
    >
        <svg v-if="isCollapsed" viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><path d="M2 11h12v2H2v-2zm0-4h12v2H2V7zm0-4h12v2H2V3z" fill-opacity="0.9"/></svg>
        <svg v-else viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/></svg>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { provide, toRef, computed, watch, reactive, ref } from 'vue'
import { menuProps, menuEmits } from './props'
import { MenuContextKey } from './context'
import './style.css'

defineOptions({
  name: 'AmuMenu'
})

const props = defineProps(menuProps)
const emit = defineEmits(menuEmits)

// Internal state for uncontrolled mode
const getInitialSelectedKeys = () => {
    if (props.defaultValue) {
        return Array.isArray(props.defaultValue) 
            ? props.defaultValue.map(String) 
            : [String(props.defaultValue)]
    }
    return props.defaultSelectedKeys || []
}

const innerSelectedKeys = ref<string[]>(getInitialSelectedKeys())
const innerOpenKeys = ref<string[]>(props.defaultOpenKeys || [])

// Use props if controlled, else use internal state
const selectedKeys = computed({
  get: () => props.selectedKeys ?? innerSelectedKeys.value,
  set: (val) => {
    innerSelectedKeys.value = val
    emit('update:selectedKeys', val)
  }
})

const openKeys = computed({
  get: () => props.openKeys ?? innerOpenKeys.value,
  set: (val) => {
    innerOpenKeys.value = val
    emit('update:openKeys', val)
  }
})

// Correctly handle collapse only in inline/vertical mode essentially.
// Horizontal mode ignores collapse generally, or acts differently.
const isCollapsed = computed({
    get: () => {
        if (props.mode === 'horizontal') return false
        return props.collapsed
    },
    set: (val) => {
        emit('update:collapsed', val)
    }
})

const toggleCollapse = () => {
    isCollapsed.value = !isCollapsed.value
}

const computedMode = computed(() => {
  if (props.mode === 'vertical' && isCollapsed.value) return 'vertical' // Essentially collapsed uses vertical styles structure
  return props.mode
})

// --- Methods exposed to children via context describe ---

const handleSelect = (key: string) => {
  selectedKeys.value = [key] // Single select for now. TODO: multi-select support if needed
  emit('select', key, [key]) // TODO: Construct full indexPath
}

const handleOpenChange = (key: string) => {
  const keys = new Set(openKeys.value)
  if (keys.has(key)) {
    keys.delete(key)
    emit('close', key, [key])
  } else {
    // Accordion mode: close other siblings
    if (props.accordion) {
      // Very simple accordion: clear all others. 
      // In real tree, should only clear siblings at same level.
      // For MVP, simplistic global accordion or none.
      keys.clear() 
    }
    keys.add(key)
    emit('open', key, [key])
  }
  openKeys.value = Array.from(keys)
  emit('openChange', key, openKeys.value)
}

const subMenus = reactive(new Map())

const addSubMenu = (item: any) => {
  subMenus.set(item.index, item)
}

const removeSubMenu = (item: any) => {
  subMenus.delete(item.index)
}

provide(MenuContextKey, {
  mode: computedMode,
  theme: computed(() => props.theme),
  collapsed: computed(() => props.collapsed),
  isCollapsed,
  selectedKeys,
  openKeys,
  handleSelect,
  handleOpenChange,
  addSubMenu,
  removeSubMenu
})

// TODO: Router integration watcher
</script>
