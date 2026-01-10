<template>
  <div
    :id="id"
    class="amu-rate"
    :class="[
      `amu-rate--${size}`,
      { 'is-disabled': disabled, 'is-readonly': readonly }
    ]"
    role="slider"
    :aria-valuenow="currentValue"
    :aria-valuemin="0"
    :aria-valuemax="max"
    :aria-valuetext="text"
    tabindex="0"
    @keydown="handleKeydown"
    @mouseleave="resetCurrentValue"
  >
    <div
      v-for="item in max"
      :key="item"
      class="amu-rate__item"
      :class="{ 'is-active-anim': item === animationIndex && isAnimating }"
      @mousemove="handleMouseMove($event, item)"
      @click="selectValue($event, item)"
    >
      <!-- Void Icon (Background) -->
      <AmuIcon
        class="amu-rate__icon"
        :class="{ 'hover': hoverIndex === item, 'is-filled': isDefaultVoidIcon }"
        :style="{ color: voidColorComputed }"
        :size="rateIconSize"
      >
        <component :is="voidIconClass" />
      </AmuIcon>

      <!-- Active Icon (Foreground mask) -->
      <div 
        class="amu-rate__decimal"
        :style="getDecimalStyle(item)"
      >
        <AmuIcon
          class="amu-rate__icon amu-rate__icon--active"
          :class="{ 'is-filled': isDefaultActiveIcon }"
          :style="{ color: activeColor }"
          :size="rateIconSize"
        >
          <component :is="activeIconClass" />
        </AmuIcon>
      </div>
    </div>

    <!-- Text / Score -->
    <span v-if="showText || showScore" class="amu-rate__text" :style="{ color: textColor }">
      {{ text }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch, inject, nextTick } from 'vue'
import { IconStar } from '@amu-ui/icons'
import { AmuIcon } from '../../icon' 
import { rateProps, rateEmits } from './props'
import { useLocale } from '@amu-ui/hooks'

const props = defineProps(rateProps)
const emit = defineEmits(rateEmits)

const { t } = useLocale()

const currentValue = ref(props.modelValue)
const hoverIndex = ref(-1)
const lastHoverValue = ref(0) // Precision hover value
const animationIndex = ref(-1)
const isAnimating = ref(false)

const rateStep = computed(() => props.allowHalf ? 0.5 : props.step)
const rateIconSize = computed(() => {
  const sizes = {
    sm: '14px',
    md: '18px',
    lg: '24px'
  }
  return sizes[props.size] || sizes.md
})

const displayValue = computed(() => {
  if (props.disabled || props.readonly) {
    return props.modelValue
  }
  return hoverIndex.value > -1 ? lastHoverValue.value : currentValue.value
})

const text = computed(() => {
  if (props.showScore) {
    return props.scoreTemplate.replace(/\{\s*value\s*\}/, rateStep.value === 1 ? displayValue.value.toString() : displayValue.value.toFixed(1))
  }
  if (props.showText) {
    const val = Math.ceil(displayValue.value)
    if (props.texts && props.texts[val - 1]) {
      return props.texts[val - 1]
    }
    return ''
  }
  return ''
})

const valueToMap = (value: number, map: Record<number, any> | any[] | undefined) => {
  if (!map) return undefined
  if (Array.isArray(map)) {
    if (map.length === 3) {
      if (value <= props.max * 0.4) return map[0]
      if (value <= props.max * 0.7) return map[1]
      return map[2]
    }
     if (map[Math.ceil(value) - 1]) return map[Math.ceil(value) - 1]
     return map[map.length - 1]
  }
  const keys = Object.keys(map).map(Number).sort((a, b) => a - b)
  for (const threshold of keys) {
    if (value <= threshold) {
      return map[threshold]
    }
  }
  if (keys.length) return map[keys[keys.length - 1]]
  return undefined
}

const activeColor = computed(() => {
  const color = valueToMap(displayValue.value, props.colors)
  return color || '' 
})

const activeIconClass = computed(() => {
  const icon = valueToMap(displayValue.value, props.icons)
  return icon || IconStar
})

const isDefaultActiveIcon = computed(() => activeIconClass.value === IconStar)

const voidIconClass = computed(() => {
    if (props.disabled && props.disabledVoidIcon) return props.disabledVoidIcon
    return props.voidIcon || IconStar
})

const isDefaultVoidIcon = computed(() => voidIconClass.value === IconStar)

const voidColorComputed = computed(() => {
    if (props.disabled && props.disabledVoidColor) return props.disabledVoidColor
    return props.voidColor || ''
})

const showDecimalIcon = (item: number) => {
  const showWhenDisabled = props.disabled ? item - 1 < props.modelValue : true
  const showWhenActive = item - 1 < displayValue.value
  return showWhenDisabled && showWhenActive
}

const getDecimalStyle = (item: number) => {
  let width = ''
  if (displayValue.value >= item) {
    width = '100%'
  } else if (displayValue.value > item - 1) {
    const pct = (displayValue.value - (item - 1)) * 100
    width = `${pct}%`
  } else {
    width = '0%'
  }
  return { width, color: activeColor.value }
}

const calculateValue = (e: MouseEvent, item: number) => {
  const target = e.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  const left = e.clientX - rect.left
  const width = rect.width
  let ratio = width > 0 ? (left / width) : 1 /* Fallback to 1 if no layout info (e.g. testing) */
  if (ratio < 0) ratio = 0
  if (ratio > 1) ratio = 1
  
  const step = rateStep.value
  
  let relativeValue = 0
  if (step > 0) {
      relativeValue = step * Math.ceil(ratio / step)
  }
  
  relativeValue = parseFloat(relativeValue.toFixed(2))

  let newValue = (item - 1) + relativeValue
  if (newValue < 0) newValue = 0
  if (newValue > props.max) newValue = props.max
  return newValue
}

const handleMouseMove = (e: MouseEvent, item: number) => {
  if (props.disabled || props.readonly) return
  
  const newValue = calculateValue(e, item)

  hoverIndex.value = item
  lastHoverValue.value = newValue
  
  emit('change', lastHoverValue.value)
}

const resetCurrentValue = () => {
    if (props.disabled || props.readonly) return
    hoverIndex.value = -1
    lastHoverValue.value = 0
}

const selectValue = (e: MouseEvent, item: number) => {
   if (props.disabled || props.readonly) return
   
   // Recalculate to support click without hover (touch or test)
   const value = calculateValue(e, item)
   lastHoverValue.value = value

   if (props.allowClear && currentValue.value === value) {
       currentValue.value = 0
       emit('update:modelValue', 0)
       emit('change', 0)
   } else {
       currentValue.value = value
       emit('update:modelValue', currentValue.value)
       emit('change', currentValue.value)
       
        // Trigger animation
       animationIndex.value = item
       isAnimating.value = true
       setTimeout(() => {
         isAnimating.value = false
         animationIndex.value = -1
       }, 300)
   }
}

const handleKeydown = (e: KeyboardEvent) => {
    if (props.disabled || props.readonly) return
    const step = rateStep.value
    let newVal = currentValue.value
    switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowDown':
            newVal -= step
            break
        case 'ArrowRight':
        case 'ArrowUp':
            newVal += step
            break
        case 'Enter':
        case ' ': 
             emit('update:modelValue', currentValue.value)
             e.preventDefault()
             break
        default:
            return
    }
    
    if (newVal < 0) newVal = 0
    if (newVal > props.max) newVal = props.max
    
    currentValue.value = parseFloat(newVal.toFixed(2))
    emit('update:modelValue', currentValue.value)
    emit('change', currentValue.value)
    e.preventDefault()
}

watch(() => props.modelValue, (val) => {
  currentValue.value = val
})

defineOptions({
  name: 'AmuRate'
})
</script>
