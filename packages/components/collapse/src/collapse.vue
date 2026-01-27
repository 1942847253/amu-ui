<template>
  <div
    class="amu-collapse"
    :class="{ 'amu-collapse--borderless': !border }"
    role="tablist"
    aria-multiselectable="true"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide, watch, ref, toRef } from 'vue'
import { collapseProps, collapseEmits } from './props'
import { collapseContextKey } from './constants'
import type { CollapseModelValue } from './props'

defineOptions({
  name: 'AmuCollapse',
})

const props = defineProps(collapseProps)
const emit = defineEmits(collapseEmits)

const activeNames = ref<(string | number)[]>(ensureArray(props.modelValue))
const arrowPlacement = toRef(props, 'arrowPlacement')

watch(
  () => props.modelValue,
  () => {
    activeNames.value = ensureArray(props.modelValue)
  }
)

function ensureArray(val: CollapseModelValue): (string | number)[] {
  if (!val) return []
  return Array.isArray(val) ? val : [val]
}

const handleItemClick = (name: string | number) => {
  if (props.accordion) {
    setActiveNames(
      (activeNames.value[0] || activeNames.value[0] === 0) && activeNames.value[0] === name
        ? []
        : [name]
    )
  } else {
    const _activeNames = [...activeNames.value]
    const index = _activeNames.indexOf(name)

    if (index > -1) {
      _activeNames.splice(index, 1)
    } else {
      _activeNames.push(name)
    }
    setActiveNames(_activeNames)
  }
}

const setActiveNames = (_activeNames: (string | number)[]) => {
  activeNames.value = _activeNames
  const value = props.accordion ? _activeNames[0] ?? '' : _activeNames
  emit('update:modelValue', value)
  emit('change', value)
}

provide(collapseContextKey, {
  activeNames,
  handleItemClick,
  arrowPlacement,
})
</script>
