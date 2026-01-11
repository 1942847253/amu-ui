<template>
  <div
    class="amu-dropdown"
    ref="dropdownRef"
    @keydown="handleTriggerKeydown"
  >
    <AmuPopup
      v-model="currentVisible"
      :trigger="popupTrigger"
      :placement="placement"
      :disabled="disabled"
      :show-timeout="showTimeout"
      :hide-timeout="hideTimeout"
      :teleport-to="teleportTo"
      :match-width="autoWidth"
      :class="[overlayClassName]"
      :style="overlayStyle"
      :show-arrow="false"
      @after-leave="emit('close')"
      @after-enter="emit('open')"
    >
      <template #reference>
        <div
          class="amu-dropdown__trigger"
          :class="{ 'amu-dropdown__trigger--disabled': disabled }"
          @contextmenu="handleContextmenu"
          tabindex="0" 
          aria-haspopup="menu"
          :aria-expanded="currentVisible"
        >
          <slot name="trigger" />
          <slot v-if="!$slots.trigger" />
        </div>
      </template>

      <template #default>
        <div 
          class="amu-dropdown__content"
          @keydown="handleContentKeydown"
        >
          <slot name="overlay" />
        </div>
      </template>
    </AmuPopup>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, provide, toRef, onMounted } from 'vue'
import AmuPopup from '../../popup/src/popup.vue'
import { dropdownProps, dropdownEmits, DROPDOWN_KEY, type DropdownTrigger } from './props'

defineOptions({
  name: 'AmuDropdown',
})

const props = defineProps(dropdownProps)
const emit = defineEmits(dropdownEmits)

const dropdownRef = ref<HTMLElement>()
const currentVisible = ref(props.defaultVisible)

// Synchronize with v-model if provided
watch(() => props.visible, (val) => {
  if (val !== undefined) {
    currentVisible.value = val
  }
}, { immediate: true })

watch(currentVisible, (val) => {
  emit('update:visible', val)
  emit('visibleChange', val)
})

const popupTrigger = computed(() => {
  if (props.trigger === 'contextmenu') return 'manual'
  return props.trigger
})

const handleContextmenu = (e: MouseEvent) => {
  if (props.trigger !== 'contextmenu') return
  if (props.disabled) return
  
  e.preventDefault()
  currentVisible.value = true
}

const handleItemClick = (command: string | number | object | undefined, event: Event) => {
  if (props.hideOnClick) {
    currentVisible.value = false
  }
  emit('select', command, event)
}

// Simple Keyboard Navigation
const handleTriggerKeydown = (e: KeyboardEvent) => {
  if (props.disabled) return
  
  if (['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(e.key)) {
    if (!currentVisible.value) {
      e.preventDefault()
      currentVisible.value = true
      // Need to focus first item after open?
      // Requires DOM availability which happens after tick
    }
  }
}

const handleContentKeydown = (e: KeyboardEvent) => {
  // Focus trapping or roving index would go here
  // For basic accessible implementation:
  if (e.key === 'Escape') {
      currentVisible.value = false
      // Focus back to trigger?
      dropdownRef.value?.querySelector<HTMLElement>('.amu-dropdown__trigger')?.focus()
  }
  
  // Navigation helpers could be implemented here
  const target = e.target as HTMLElement
  if (target.classList.contains('amu-dropdown-item')) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = getNextItem(target)
      if (next) next.focus()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const prev = getPrevItem(target)
      if (prev) prev.focus()
    }
  }
}

const getNextItem = (el: HTMLElement) => {
  let next = el.nextElementSibling as HTMLElement
  while (next) {
    if (next.classList.contains('amu-dropdown-item') && !next.classList.contains('is-disabled') && next.getAttribute('tabindex') !== '-1') {
      return next
    }
    next = next.nextElementSibling as HTMLElement
  }
  return null
}

const getPrevItem = (el: HTMLElement) => {
  let prev = el.previousElementSibling as HTMLElement
  while (prev) {
    if (prev.classList.contains('amu-dropdown-item') && !prev.classList.contains('is-disabled') && prev.getAttribute('tabindex') !== '-1') {
      return prev
    }
    prev = prev.previousElementSibling as HTMLElement
  }
  return null
}

provide(DROPDOWN_KEY, {
  hideOnClick: toRef(props, 'hideOnClick'),
  handleItemClick,
  visible: currentVisible
})
</script>
