<template>
  <div 
    class="amu-progress amu-progress--line" 
    :class="[
      status ? `is-${status}` : '',
      {
        'amu-progress--text-inside': textInside,
        'is-indeterminate': indeterminate,
        'amu-progress--without-text': !showText
      }
    ]"
  >
    <div class="amu-progress-bar">
      <!-- Outer Track -->
      <div 
        class="amu-progress-bar__outer" 
        :style="{ height: `${strokeWidth}px`, backgroundColor: trackColor }"
      >
        <!-- Inner Bar -->
        <div class="amu-progress-bar__inner" :style="barStyle">
          <!-- Text inside the bar -->
          <div v-if="showText && textInside && percentage > 10" class="amu-progress-bar__innerText">
            {{ content }}
          </div>
          <!-- Indeterminate Animation Overlay -->
          <div v-if="indeterminate" class="amu-progress-bar__indeterminate"></div>
        </div>
        <!-- Text inside the track but outside the bar (for low percentage) -->
        <div 
          v-if="showText && textInside && percentage <= 10" 
          class="amu-progress-bar__innerText"
          :style="{ 
            left: `${percentage}%`, 
            position: 'absolute', 
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--amu-color-text-default)', 
            margin: '0 10px' 
          }"
        >
          {{ content }}
        </div>
      </div>
    </div>
    
    <!-- Text outside the bar -->
    <div 
      v-if="!textInside && showText" 
      class="amu-progress__text" 
      :style="{ fontSize: `${progressTextSize}px` }"
    >
      <slot v-if="$slots.default" />
      <component :is="statusIcon" v-else-if="statusIcon" class="amu-progress__icon" />
      <span v-else>{{ content }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { progressProps } from './props'
import { getCurrentColor } from './utils'
import { 
  IconCheckCircleFill, 
  IconXCircleFill, 
  IconAlertCircleFill 
} from '@amu-ui/icons'

defineOptions({ name: 'AmuProgressLinear' })

const props = defineProps(progressProps)

const barStyle = computed(() => {
  const style: any = {
    width: `${props.percentage}%`
  }
  const color = getCurrentColor(props.percentage, props.color)
  if (color) {
    style.background = color
  }
  return style
})

const content = computed(() => props.format(props.percentage))

const progressTextSize = computed(() => {
  return 12 + props.strokeWidth * 0.4
})

const statusIcon = computed(() => {
  if (props.status === 'warning') return IconAlertCircleFill
  if (props.status === 'exception') return IconXCircleFill
  if (props.status === 'success') return IconCheckCircleFill
  return null
})
</script>
