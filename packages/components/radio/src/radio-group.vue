<template>
  <div
    class="amu-radio-group"
    role="radiogroup"
    :class="{
      [`amu-radio-group--${size}`]: size,
    }"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, provide, reactive, toRefs } from 'vue'
import { radioGroupEmits, radioGroupProps } from './props'
import { radioGroupKey } from './constants'

defineOptions({
  name: 'AmuRadioGroup',
})

const props = defineProps(radioGroupProps)
const emit = defineEmits(radioGroupEmits)

const name = computed(() => {
  return props.name || `amu-radio-group-${Math.random().toString(36).slice(2)}`
})

const changeEvent = (val: string | number | boolean) => {
  emit('update:modelValue', val)
  nextTick(() => {
    emit('change', val)
  })
}

provide(radioGroupKey, {
  props,
  changeEvent,
  name,
})
</script>
