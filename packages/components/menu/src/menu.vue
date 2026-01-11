<template>
  <ul :class="[
    'amu-menu',
    `amu-menu--${computedMode}`,
    `amu-menu--${props.theme}`,
    {
      'amu-menu--collapsed': isCollapsed
    }
  ]" role="menubar">
    <li v-if="$slots.logo" class="amu-menu__logo">
      <slot name="logo" :collapsed="isCollapsed" />
    </li>
    <slot />
    <li v-if="$slots.operations" class="amu-menu__operations">
      <slot name="operations" />
    </li>
    <li v-if="showCollapseButton && computedMode === 'vertical'" class="amu-menu__collapse-trigger"
      @click="toggleCollapse">
      <svg v-if="isCollapsed" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
        <path d="M2 11h12v2H2v-2zm0-4h12v2H2V7zm0-4h12v2H2V3z" fill-opacity="0.9" />
      </svg>
      <svg v-else viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
        <path
          d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
      </svg>
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

// 计算显示折叠按钮
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

// 受控与非受控模式的计算属性
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

// 仅在行内/垂直模式下正确处理折叠。
// 水平模式通常会忽略折叠，或者表现不同。
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
  if (props.mode === 'vertical' && isCollapsed.value) return 'vertical' // 折叠的垂直模式
  return props.mode
})

const handleSelect = (key: string, indexPath: string[] = []) => {
  selectedKeys.value = [key] // 目前仅支持单选。待办事项：如有需要，将支持多选
  if (indexPath.length) {
      activePath.value = indexPath
  } else {
      activePath.value = [key]
  }
  emit('select', key, indexPath) // 单选模式下的待选项数组
}

const activePath = ref<string[]>([])

const handleOpenChange = (key: string) => {
  const keys = new Set(openKeys.value)
  if (keys.has(key)) {
    keys.delete(key)
    emit('close', key, [key])
  } else {
    // 打开菜单项
    if (props.accordion) {
      //  非常简单的折叠面板：清除所有其他元素。 
      // 在真实的树结构中，应仅清除同级的兄弟节点。
      // 对于最小可行产品，采用简单的全局手风琴或无手风琴。
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
  activePath,
  handleSelect,
  handleOpenChange,
  addSubMenu,
  removeSubMenu
})

// 显示折叠按钮仅在垂直模式下
</script>
