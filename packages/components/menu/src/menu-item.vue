<template>
  <li
    class="amu-menu-item"
    :class="{
      'is-active': active,
      'is-disabled': disabled
    }"
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
import { computed, inject } from 'vue'
import { menuItemProps, menuItemEmits } from './props'
import { MenuContextKey } from './context'

defineOptions({
  name: 'AmuMenuItem'
})

const props = defineProps(menuItemProps)
const emit = defineEmits(menuItemEmits)
const rootMenu = inject(MenuContextKey)

if (!rootMenu) {
  throw new Error('AmuMenuItem must be used inside AmuMenu')
}

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
  rootMenu.handleSelect(props.index)
  emit('click', { index: props.index, indexPath: [props.index] }) // TODO: Path
}
</script>
