<template>
  <component
    :is="hasSubmenu ? AmuPopup : 'div'"
    v-bind="popupProps"
    class="amu-dropdown-item-wrapper"
  >
    <template v-if="hasSubmenu" #reference>
      <div
        ref="itemRef"
        :class="itemClasses"
        :aria-disabled="disabled"
        :tabindex="disabled || isTitle ? -1 : 0"
        role="menuitem"
        @click="handleClick"
        @keydown="handleKeydown"
      >
        <AmuIcon v-if="icon" class="amu-dropdown-item__icon">
           <component :is="resolvedIcon" />
        </AmuIcon>
        
        <span class="amu-dropdown-item__content"><slot /></span>
        
        <span v-if="shortcut" class="amu-dropdown-item__shortcut">{{ shortcut }}</span>
        <AmuIcon v-if="hasSubmenu" class="amu-dropdown-item__arrow">
           <component :is="IconChevronRight" />
        </AmuIcon>
      </div>
    </template>

    <template v-if="!hasSubmenu">
      <div
        ref="itemRef"
        :class="itemClasses"
        :aria-disabled="disabled"
        :tabindex="disabled || isTitle ? -1 : 0"
        role="menuitem"
        @click="handleClick"
        @keydown="handleKeydown"
      >
        <AmuIcon v-if="icon" class="amu-dropdown-item__icon">
           <component :is="resolvedIcon" />
        </AmuIcon>
        
        <span class="amu-dropdown-item__content"><slot /></span>
        
        <span v-if="shortcut" class="amu-dropdown-item__shortcut">{{ shortcut }}</span>
      </div>
    </template>

    <template v-if="hasSubmenu" #default>
      <div class="amu-dropdown__submenu">
        <slot name="submenu" />
      </div>
    </template>
  </component>
</template>

<script setup lang="ts">
import { computed, inject, useSlots, ref, type Slots } from 'vue'
import { dropdownItemProps, dropdownItemEmits, DROPDOWN_KEY } from './props'
import AmuPopup from '../../popup/src/popup.vue'
import { AmuIcon } from '../../icon'
import { IconChevronRight } from '@amu-ui/icons'

defineOptions({
  name: 'AmuDropdownItem',
})

const props = defineProps(dropdownItemProps)
const emit = defineEmits(dropdownItemEmits)
const slots = useSlots() as Slots
const dropdown = inject(DROPDOWN_KEY, undefined)
const itemRef = ref<HTMLElement>()

const hasSubmenu = computed<boolean>(() => !!slots.submenu)

const resolvedIcon = computed(() => {
  if (typeof props.icon === 'object') {
    return props.icon
  }
  if (typeof props.icon === 'string') {
    // Convert kebab-case to PascalCase and prepend Icon
    const camelCase = props.icon.replace(/-(\w)/g, (_, c) => c.toUpperCase())
    const pascalCase = camelCase.charAt(0).toUpperCase() + camelCase.slice(1)
    return `Icon${pascalCase}`
  }
  return null
})

const itemClasses = computed(() => [
  'amu-dropdown-item',
  {
    'is-disabled': props.disabled,
    'is-divided': props.divided,
    'is-active': props.active,
    'is-title': props.isTitle,
    'has-submenu': hasSubmenu.value,
  },
])

const popupProps = computed(() => {
  if (!hasSubmenu.value) return {}
  return {
    placement: 'right-start',
    trigger: 'hover',
    offset: 2,
    showArrow: false,
  }
})

const handleClick = (e: MouseEvent) => {
  if (props.disabled || props.isTitle) {
    e.stopPropagation()
    return
  }
  
  emit('click', e)
  
  if (hasSubmenu.value) return

  if (dropdown) {
    dropdown.handleItemClick(props.command, e)
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  if (props.disabled || props.isTitle) return
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    handleClick(e as unknown as MouseEvent)
  }
}
</script>
