<template>
  <div
    class="amu-option"
    :class="{
      'is-selected': isSelected,
      'is-disabled': disabled || isLimitReached,
    }"
    v-show="visible"
    @click.stop="selectOption"
  >
    <slot>
      <span>{{ currentLabel }}</span>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onBeforeUnmount } from 'vue'
import { optionProps, selectContextKey } from './props'

defineOptions({
  name: 'AmuOption',
})

const props = defineProps(optionProps)

const select = inject(selectContextKey)

const currentLabel = computed(() => {
  return props.label ?? (props.value as string | number)
})

const visible = computed(() => {
  if (!select?.props.filterable) return true
  if (!select.query.value) return true
  return String(currentLabel.value).toLowerCase().includes(select.query.value.toLowerCase())
})

const isSelected = computed(() => {
  if (!select) return false

  const isLooselyEqual = (a: unknown, b: unknown) => {
    if (a === b) return true
    if (typeof a === 'number' && typeof b === 'string' && b.trim()) return a === Number(b)
    if (typeof a === 'string' && typeof b === 'number' && a.trim()) return Number(a) === b
    return false
  }

  if (select.props.multiple) {
    return Array.isArray(select.props.modelValue) && select.props.modelValue.some((v) => isLooselyEqual(v, props.value))
  } else {
    return isLooselyEqual(select.props.modelValue, props.value)
  }
})

const isLimitReached = computed(() => {
  // TODO: Implement limit logic if needed
  return false
})

const selectOption = () => {
  if (props.disabled || isLimitReached.value) return
  select?.onOptionSelect(props)
}

// Register option
select?.registerOption(props)

// Notify parent when destroyed (optional, for cleanup if needed)
onBeforeUnmount(() => {
  select?.onOptionDestroy(props.value)
})
</script>
