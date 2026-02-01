<template>
  <AmuPopup
    v-bind="popupProps"
    :model-value="visible"
    :trigger="trigger"
    :placement="placement"
    :offset="offset"
    :disabled="disabled"
    :show-arrow="showArrow"
    :close-on-click-outside="closeOnClickOutside"
    :close-on-esc="closeOnEsc"
    :teleport-to="teleportTo"
    :z-index="zIndex"
    :virtual-ref="virtualRef"
    :overlay-class-name="mergedOverlayClassName"
    :class="['amu-tooltip-popup', `amu-tooltip-popup--${type}`]"
    @update:model-value="handleUpdateModelValue"
    @show="handleShow"
    @hide="handleHide"
  >
    <div class="amu-tooltip__content" :style="contentStyle">
      <slot>{{ content }}</slot>
    </div>
    <template #reference>
      <slot name="reference" />
    </template>
  </AmuPopup>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { AmuPopup } from '../../popup'
import { tooltipProps, tooltipEmits } from './props'

defineOptions({
  name: 'AmuTooltip',
})

const props = defineProps(tooltipProps)
const emit = defineEmits(tooltipEmits)

const visible = ref(props.modelValue ?? false)

watch(
  () => props.modelValue,
  (val) => {
    if (val !== undefined) {
      visible.value = val
    }
  }
)

const handleUpdateModelValue = (val: boolean) => {
  visible.value = val
  emit('update:modelValue', val)
}

const handleShow = () => {
  emit('show')
}

const handleHide = () => {
  emit('hide')
}

const mergedOverlayClassName = computed(() => {
  const names = [
    'amu-tooltip',
    props.overlayClassName,
    props.popupProps?.overlayClassName,
  ].filter(Boolean)
  return names.join(' ')
})

const contentStyle = computed(() => {
  if (props.maxWidth === undefined || props.maxWidth === null) return {}
  const value = typeof props.maxWidth === 'number' ? `${props.maxWidth}px` : props.maxWidth
  return { maxWidth: value }
})
</script>
