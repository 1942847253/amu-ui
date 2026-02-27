<template>
  <li
    class="amu-menu-item"
    :class="{
      'is-active': active,
      'is-disabled': disabled
    }"
    :style="itemStyle"
    role="menuitem"
    @click="handleClick"
  >
    <div v-if="$slots.icon || icon" class="amu-menu-item__icon">
      <slot name="icon">
        <component :is="icon" v-if="icon" />
      </slot>
    </div>
    <span class="amu-menu-item__title">
        <slot />
    </span>
  </li>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted } from 'vue'
import { menuItemProps, menuItemEmits } from './props'
import { MenuContextKey, SubMenuContextKey } from './context'

defineOptions({
  name: 'AmuMenuItem'
})

const props = defineProps(menuItemProps)
const emit = defineEmits(menuItemEmits)
const rootMenu = inject(MenuContextKey)

if (!rootMenu) {
  throw new Error('AmuMenuItem must be used inside AmuMenu')
}

const parentSubMenu = inject(SubMenuContextKey, undefined)
const level = (parentSubMenu?.level || 0) + 1
const indexPath = computed(() => {
    const parentPath = parentSubMenu?.indexPath.value || []
    return [...parentPath, props.index]
})

const itemStyle = computed(() => {
  const mode = rootMenu.mode.value
  const isCollapsed = rootMenu.isCollapsed.value
  
  if ((mode === 'vertical' || mode === 'inline') && !isCollapsed) {
    return { paddingLeft: `${16 + (level - 1) * 24}px` }
  }
  return {}
})

onMounted(() => {
  parentSubMenu?.addChild(props.index)
})

onUnmounted(() => {
  parentSubMenu?.removeChild(props.index)
})

// TODO: Handle icons better (string name vs component)
const icon = null 

const active = computed(() => {
  return rootMenu.selectedKeys.value.includes(props.index)
})

const handleClick = (e: MouseEvent) => {
  if (props.disabled) {
    e.stopImmediatePropagation()
    return
  }
  rootMenu.handleSelect(props.index, indexPath.value)
  emit('click', { index: props.index, indexPath: indexPath.value })
}
</script>
