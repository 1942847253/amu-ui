<template>
  <li
    class="amu-sub-menu"
    :class="{
      'is-opened': isOpened,
      'is-active': active,
      'is-disabled': disabled
    }"
    role="menuitem"
    aria-haspopup="true"
    :aria-expanded="isOpened"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Popup/Dropdown Mode -->
    <AmuDropdown
      v-if="isPopup"
      v-model:visible="popupVisible"
      :trigger="popupTrigger"
      :placement="popupPlacement"
      :teleport-to="'body'"
      class="amu-sub-menu__dropdown"
      :show-timeout="100"
      :hide-timeout="100"
      :hide-on-click="false" 
      style="display: block; width: 100%; height: 100%;"
    >
      <template #trigger>
         <div class="amu-sub-menu__title" :class="{ 'is-popup-trigger': true }">
            <div v-if="$slots.icon" class="amu-sub-menu__icon">
              <slot name="icon" />
            </div>
            
            <span class="amu-sub-menu__text">
              <slot name="title">{{ title }}</slot>
            </span>

            <!-- Arrow: Dynamic based on level/mode -->
            <i class="amu-sub-menu__icon-arrow" :class="popupArrowClass">
                <svg viewBox="0 0 1024 1024" width="1em" height="1em">
                    <path d="M831.872 340.864 512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z" fill="currentColor"></path>
                </svg>
            </i>
         </div>
      </template>

      <template #overlay>
         <AmuDropdownMenu :class="['amu-menu', 'amu-menu--popup', `amu-menu--${rootMenu.theme.value}`]">
             <slot />
         </AmuDropdownMenu>
      </template>
    </AmuDropdown>

    <!-- Inline Mode -->
    <template v-else>
      <div
        class="amu-sub-menu__title"
        @click="handleTitleClick"
        :style="{ paddingLeft: `${level * 20}px` }"
      >
        <div v-if="$slots.icon" class="amu-sub-menu__icon">
          <slot name="icon" />
        </div>
        
        <span class="amu-sub-menu__text">
          <slot name="title">{{ title }}</slot>
        </span>

        <i class="amu-sub-menu__icon-arrow">
            <svg viewBox="0 0 1024 1024" width="1em" height="1em">
                <path d="M831.872 340.864 512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z" fill="currentColor"></path>
            </svg>
        </i>
      </div>

      <transition 
        name="amu-menu-collapse-transition"
        @before-enter="handleBeforeEnter"
        @enter="handleEnter"
        @after-enter="handleAfterEnter"
        @before-leave="handleBeforeLeave"
        @leave="handleLeave"
        @after-leave="handleAfterLeave"
      >
          <ul v-show="isOpened" :class="['amu-menu', 'amu-menu--inline', `amu-menu--${rootMenu.theme.value}`]" v-if="rootMenu.mode.value !== 'horizontal' && !rootMenu.isCollapsed.value">
             <slot />
          </ul>
      </transition>
    </template>
  </li>
</template>

<script setup lang="ts">
import { computed, inject, ref, provide, watch } from 'vue'
import { subMenuProps, subMenuEmits } from './props'
import { MenuContextKey, SubMenuContextKey } from './context'
import AmuDropdown from '../../dropdown/src/dropdown.vue'
import AmuDropdownMenu from '../../dropdown/src/dropdown-menu.vue'

defineOptions({
  name: 'AmuSubMenu'
})

const props = defineProps(subMenuProps)
const emit = defineEmits(subMenuEmits)

const rootMenu = inject(MenuContextKey)
if (!rootMenu) {
  throw new Error('AmuSubMenu must be used inside AmuMenu')
}

const parentSubMenu = inject(SubMenuContextKey, undefined)
const level = computed(() => (parentSubMenu?.level || 0) + 1)
const indexPath = computed(() => {
    const parentPath = parentSubMenu?.indexPath.value || []
    return [...parentPath, props.index]
})

const subMenuKeys = ref<string[]>([])

const addChild = (key: string) => {
  if (!subMenuKeys.value.includes(key)) {
    subMenuKeys.value.push(key)
  }
  parentSubMenu?.addChild(key)
}

const removeChild = (key: string) => {
  const index = subMenuKeys.value.indexOf(key)
  if (index > -1) {
    subMenuKeys.value.splice(index, 1)
  }
  parentSubMenu?.removeChild(key)
}

provide(SubMenuContextKey, {
    level: level.value,
    index: props.index,
    indexPath,
    mouseInChild: ref(false),
    addChild,
    removeChild
})

const active = computed(() => {
    // 1. Check direct active path (persistent) - Strongest check
    if (rootMenu.activePath.value.includes(props.index)) return true
    
    // 2. Check registered children (for initial load if not clicked yet and children mounted)
    return rootMenu.selectedKeys.value.some(k => subMenuKeys.value.includes(k))
})

const isPopup = computed(() => {
  return rootMenu.mode.value === 'horizontal' || rootMenu.isCollapsed.value
})

const isOpened = computed(() => {
  if (isPopup.value) return false // In popup mode, AmuDropdown manages visibility
  return rootMenu.openKeys.value.includes(props.index)
})

const timer = ref<any>(null)

// Popup Logic
const popupVisible = ref(false)
const popupTrigger = computed(() => 'hover' as const) 
const popupPlacement = computed(() => {
    if (rootMenu.mode.value === 'horizontal' && level.value === 1) { 
        return 'bottom-start'
    }
    return 'right-start'
})

const popupArrowClass = computed(() => {
   if (rootMenu.mode.value === 'horizontal' && level.value === 1) {
       return 'is-horizontal-arrow' 
   }
   return 'is-popup-arrow' 
})

// Animation Hooks
const handleBeforeEnter = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = '0px'
  element.style.opacity = '0'
  element.style.overflow = 'hidden'
}

const handleEnter = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = `${element.scrollHeight}px`
  element.style.opacity = '1'
}

const handleAfterEnter = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = ''
  element.style.opacity = ''
  element.style.overflow = ''
}

const handleBeforeLeave = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = `${element.scrollHeight}px`
  element.style.opacity = '1'
  element.style.overflow = 'hidden'
}

const handleLeave = (el: Element) => {
  const element = el as HTMLElement
  // Force repaint
  void element.offsetHeight
  element.style.height = '0px'
  element.style.opacity = '0'
}

const handleAfterLeave = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = ''
  element.style.opacity = ''
  element.style.overflow = ''
}

const handleMouseEnter = () => {
    // Handled by AmuDropdown in popup mode
}

const handleMouseLeave = () => {
    // Handled by AmuDropdown in popup mode
}

const handleTitleClick = () => {
  if (props.disabled) return
  if (isPopup.value) return

  rootMenu.handleOpenChange(props.index)
  emit('click', props.index)
}

</script>

<style scoped>
.is-popup-arrow {
    transform: rotate(-90deg); 
}
.is-horizontal-arrow {
    transform: rotate(0deg);
}

/* Ensure dropdown trigger takes full space */
:deep(.amu-dropdown) {
    display: block;
}
:deep(.amu-dropdown__trigger) {
    display: block;
    width: 100%;
}
</style>
