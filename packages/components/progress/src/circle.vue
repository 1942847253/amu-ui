<template>
  <div 
    class="amu-progress" 
    :class="[
      `amu-progress--${type}`,
      status ? `is-${status}` : ''
    ]" 
    :style="{ width: `${width}px`, height: `${width}px` }"
  >
    <svg viewBox="0 0 100 100">
      <defs v-if="isGradient">
        <linearGradient :id="`gradient-${uid}`" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop 
            v-for="(item, index) in gradientColor" 
            :key="index" 
            :offset="item.percentage"
            :stop-color="item.color" 
          />
        </linearGradient>
      </defs>
      <!-- Track Path -->
      <!-- Use CSS var for default track color, or prop if provided -->
      <path 
        class="amu-progress-circle__track"
        :d="trackPath" 
        stroke="var(--amu-color-bg-fill)"
        :stroke-width="relativeStrokeWidth" 
        fill="none"
        :style="trackStyle" 
      />
      <!-- Progress Path -->
      <path 
        class="amu-progress-circle__path" 
        :d="trackPath" 
        :stroke="strokeColor" 
        :stroke-width="relativeStrokeWidth" 
        fill="none"
        :stroke-linecap="strokeLinecap" 
        :style="pathStyle" 
      />
    </svg>
    <div v-if="showText" class="amu-progress__text" :style="{ fontSize: `${progressTextSize}px` }">
      <slot v-if="$slots.default" />
      <component :is="statusIcon" v-else-if="statusIcon" />
      <span v-else class="amu-progress__text-inner">{{ content }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, getCurrentInstance } from 'vue'
import { progressProps } from './props'
import { getCurrentColor } from './utils'
import { 
  IconCheck, 
  IconX, 
  IconAlertTriangle 
} from '@amu-ui/icons'

defineOptions({ name: 'AmuProgressCircle' })

const props = defineProps(progressProps)

const uid = getCurrentInstance()?.uid

const relativeStrokeWidth = computed(() => {
  return (props.strokeWidth / props.width) * 100
})

const radius = computed(() => {
  if (props.type === 'dashboard') {
    return 50 - parseFloat(relativeStrokeWidth.value.toString()) / 2
  }
  return 50 - parseFloat(relativeStrokeWidth.value.toString()) / 2
})

const trackPath = computed(() => {
  const r = radius.value
  const isDashboard = props.type === 'dashboard'
  return `
    M 50 50
    m 0 ${isDashboard ? '' : '-'}${r}
    a ${r} ${r} 0 1 1 0 ${isDashboard ? '-' : ''}${r * 2}
    a ${r} ${r} 0 1 1 0 ${isDashboard ? '' : '-'}${r * 2}
    `
})

const perimeter = computed(() => {
  return 2 * Math.PI * radius.value
})

const rate = computed(() => {
  return props.type === 'dashboard' ? 0.75 : 1
})

const strokeDashoffset = computed(() => {
  const offset = -1 * perimeter.value * (1 - rate.value) / 2
  return `${offset}px`
})

const trailPathStyle = computed(() => {
  return {
    strokeDasharray: `${perimeter.value * rate.value}px, ${perimeter.value}px`,
    strokeDashoffset: strokeDashoffset.value
  }
})

const trackStyle = computed(() => {
  const style: any = {}
  if (props.trackColor) {
    style.stroke = props.trackColor
  }
  if (props.type === 'dashboard') {
    Object.assign(style, trailPathStyle.value)
  }
  return style
})

const strokeColor = computed(() => {
  let color = getCurrentColor(props.percentage, props.color)
  
  if (isGradient.value) {
    return `url(#gradient-${uid})`
  }
  
  // Use theme vars if no color specified
  if (!color) {
    if (props.status === 'success') return 'var(--amu-color-status-success)'
    if (props.status === 'warning') return 'var(--amu-color-status-warning)'
    if (props.status === 'exception') return 'var(--amu-color-status-danger)'
    return 'var(--amu-color-primary)'
  }
  return color
})

const isGradient = computed(() => {
  // If color is array or we have logic for gradient, simplified check:
  // Current utils.getCurrentColor implementation returns string mostly. 
  // Need to check if color prop is array of ProcessColor
  return Array.isArray(props.color)
})

const gradientColor = computed(() => {
  if (Array.isArray(props.color)) {
    return props.color.map((item) => ({ ...item, percentage: `${item.percentage}%` }))
  }
  return []
})

const pathStyle = computed(() => {
  return {
    strokeDasharray: `${perimeter.value * rate.value * (props.percentage / 100)}px, ${perimeter.value}px`,
    strokeDashoffset: strokeDashoffset.value,
    transition: 'stroke-dasharray 0.6s ease 0s, stroke 0.6s ease'
  }
})

const content = computed(() => props.format(props.percentage))

const progressTextSize = computed(() => {
  // Scale text based on width, default width is 126
  return (props.width / 126) * 16 + 2
})

const statusIcon = computed(() => {
  if (props.status === 'warning') return IconAlertTriangle
  if (props.status === 'exception') return IconX
  if (props.status === 'success') return IconCheck
  return null
})
</script>
