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
    <div
      class="amu-sub-menu__title"
      @click="handleTitleClick"
    >
      <!-- Icon Slot -->
      <div v-if="$slots.icon" class="amu-sub-menu__icon">
        <slot name="icon" />
      </div>
      
      <!-- Title text -->
      <span class="amu-sub-menu__text">
        <slot name="title">{{ title }}</slot>
      </span>

      <!-- Arrow Icon -->
      <i class="amu-sub-menu__icon-arrow">
          <svg viewBox="0 0 1024 1024" width="1em" height="1em">
              <path d="M831.872 340.864 512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z" fill="currentColor"></path>
          </svg>
      </i>
    </div>

    <!-- Collapsible Content -->
    <!-- Use v-show for inline vertical, but popup for horizontal/collapsed -->
    <!-- For simplicity, first implement inline mode logic which is just a collapse -->
    <transition 
      name="amu-menu-collapse-transition"
      @before-enter="handleBeforeEnter"
      @enter="handleEnter"
      @after-enter="handleAfterEnter"
      @before-leave="handleBeforeLeave"
      @leave="handleLeave"
      @after-leave="handleAfterLeave"
    >
        <ul v-show="isOpened" class="amu-menu amu-menu--inline" v-if="rootMenu.mode.value !== 'horizontal' && !rootMenu.isCollapsed.value">
           <slot />
        </ul>
        <!-- TODO: Popper for horizontal or collapsed mode -->
    </transition>
    
    <!-- Placeholder for Popper version (horizontal/collapsed vertical) -->
    <div 
        v-if="rootMenu.mode.value === 'horizontal' || rootMenu.isCollapsed.value" 
        v-show="isOpened" 
        class="amu-menu--popup-container"
        :class="{
          'is-horizontal': rootMenu.mode.value === 'horizontal',
          'is-collapsed': rootMenu.isCollapsed.value
        }"
     >
        <ul class="amu-menu amu-menu--popup">
             <slot />
        </ul>
    </div>
  </li>
</template>

<script setup lang="ts">
import { computed, inject, ref, provide } from 'vue'
import { subMenuProps, subMenuEmits } from './props'
import { MenuContextKey, SubMenuContextKey } from './context'

defineOptions({
  name: 'AmuSubMenu'
})

const props = defineProps(subMenuProps)
const emit = defineEmits(subMenuEmits)

const rootMenu = inject(MenuContextKey)
if (!rootMenu) {
  throw new Error('AmuSubMenu must be used inside AmuMenu')
}

// Check if any child is selected (to highlight parent title)
// This is tricky without recursion or a central store of path-to-key map.
// For now, naive check if any child is selected?
// A better way: Menu tracks { key: parentKey } map.
const active = computed(() => {
    return false // TODO: Implementation
})

const isOpened = computed(() => {
  // If collapsed vertical or horizontal, hover logic handles it temporarily? 
  // Consolidate on openKeys for all modes to be simpler.
  return rootMenu.openKeys.value.includes(props.index)
})

const timer = ref<any>(null)

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
    if (props.disabled) return
    if (rootMenu.mode.value === 'horizontal' || rootMenu.isCollapsed.value) {
        // Warning: This mutates openKeys directly or causes jitter if using 'click' logic mixed with 'hover'.
        // props.trigger check needed.
        if (rootMenu.openKeys.value.includes(props.index)) return
        
        clearTimeout(timer.value)
        timer.value = setTimeout(() => {
             rootMenu.handleOpenChange(props.index)
        }, 100) // delay
    }
}

const handleMouseLeave = () => {
     if (props.disabled) return
     if (rootMenu.mode.value === 'horizontal' || rootMenu.isCollapsed.value) {
         clearTimeout(timer.value)
         timer.value = setTimeout(() => {
             if (rootMenu.openKeys.value.includes(props.index)) {
                 rootMenu.handleOpenChange(props.index)
             }
         }, 100)
     }
}

const handleTitleClick = () => {
  if (props.disabled) return
  
  // In horizontal mode, click might navigate or just do nothing if trigger is hover
  if (rootMenu.mode.value === 'horizontal' || rootMenu.isCollapsed.value) {
      // Usually handled by hover, unless trigger='click'
      return
  }

  rootMenu.handleOpenChange(props.index)
  emit('click', props.index)
}

provide(SubMenuContextKey, {
    level: 1, // TODO: calculate level
    mouseInChild: ref(false)
} as any)

</script>
