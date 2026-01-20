<template>
  <div class="amu-progress-wrapper" ref="progressRef">
    <AmuProgressLinear 
      v-if="type === 'line' && $slots.default" 
      v-bind="props"
    >
      <slot />
    </AmuProgressLinear>
    <AmuProgressLinear 
      v-else-if="type === 'line'" 
      v-bind="props"
    />
    <AmuProgressCircle 
      v-else-if="$slots.default" 
      v-bind="props"
    >
      <slot />
    </AmuProgressCircle>
    <AmuProgressCircle 
      v-else 
      v-bind="props" 
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { progressProps, type ProgressProps } from './props'
import AmuProgressLinear from './linear.vue'
import AmuProgressCircle from './circle.vue'

defineOptions({ name: 'AmuProgress' })

const props = defineProps(progressProps)
const progressRef = ref<HTMLElement>()

defineExpose({
  ref: progressRef
})
</script>
