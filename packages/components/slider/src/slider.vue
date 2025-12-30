<template>
  <div
    class="amu-slider"
    :class="{
      'amu-slider--vertical': vertical,
      'amu-slider--disabled': disabled,
      'amu-slider--with-input': showInput
    }"
  >
    <div
      ref="trackRef"
      class="amu-slider__runway"
      @mousedown="onRunwayClick"
    >
      <div
        class="amu-slider__bar"
        :style="barStyle"
      ></div>
      
      <!-- Stops -->
      <div v-if="showStops" class="amu-slider__stops">
        <div
          v-for="(item, index) in stops"
          :key="index"
          class="amu-slider__stop"
          :style="getStopStyle(item)"
        ></div>
      </div>
      
      <!-- Marks -->
      <div v-if="Object.keys(marks).length > 0" class="amu-slider__marks">
        <div
          v-for="(label, key) in marks"
          :key="key"
          class="amu-slider__mark"
          :style="getMarkStyle(Number(key))"
        >
          <div class="amu-slider__mark-point"></div>
          <div class="amu-slider__mark-text">{{ label }}</div>
        </div>
      </div>

      <!-- Thumb 1 -->
      <div
        class="amu-slider__thumb-wrapper"
        :style="thumb1Style"
        @mousedown.stop="onDragStart($event, 0)"
        tabindex="0"
        @keydown="onKeyDown($event, 0)"
        @mouseenter="thumb1Hover = true"
        @mouseleave="thumb1Hover = false"
      >
        <AmuPopup
          ref="popup1Ref"
          class="amu-slider__tooltip"
          :model-value="showTooltip && !disabled && (thumb1Hover || (isDragging && draggingIndex === 0))"
          trigger="manual"
          placement="top"
          :teleport-to="''"
        >
          <template #reference>
            <div class="amu-slider__thumb"></div>
          </template>
          {{ formatValue(firstValue) }}
        </AmuPopup>
      </div>

      <!-- Thumb 2 (Range only) -->
      <div
        v-if="range"
        class="amu-slider__thumb-wrapper"
        :style="thumb2Style"
        @mousedown.stop="onDragStart($event, 1)"
        tabindex="0"
        @keydown="onKeyDown($event, 1)"
        @mouseenter="thumb2Hover = true"
        @mouseleave="thumb2Hover = false"
      >
        <AmuPopup
          ref="popup2Ref"
          class="amu-slider__tooltip"
          :model-value="showTooltip && !disabled && (thumb2Hover || (isDragging && draggingIndex === 1))"
          trigger="manual"
          placement="top"
          :teleport-to="''"
        >
          <template #reference>
            <div class="amu-slider__thumb"></div>
          </template>
          {{ formatValue(secondValue) }}
        </AmuPopup>
      </div>
    </div>

    <!-- Input (Single mode only) -->
    <div v-if="showInput && !range" class="amu-slider__input">
      <input
        type="number"
        class="amu-slider__input-inner"
        :value="modelValue"
        :min="min"
        :max="max"
        :step="step"
        :disabled="disabled"
        @input="onInput"
        @change="onInputChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, nextTick } from 'vue'
import { sliderProps, sliderEmits } from './props'
import { AmuPopup } from '../../popup'

defineOptions({ name: 'AmuSlider' })

const props = defineProps(sliderProps)
const emit = defineEmits(sliderEmits)

const trackRef = ref<HTMLElement | null>(null)
const isDragging = ref(false)
const draggingIndex = ref(0) // 0 or 1

// Internal values
const firstValue = ref(0)
const secondValue = ref(0)

const thumb1Hover = ref(false)
const thumb2Hover = ref(false)

const popup1Ref = ref()
const popup2Ref = ref()

const formatValue = (val: number) => {
  if (props.formatTooltip) {
    return props.formatTooltip(val)
  }
  return val
}

watch(firstValue, () => {
  nextTick(() => {
    popup1Ref.value?.updatePosition()
  })
})

watch(secondValue, () => {
  nextTick(() => {
    popup2Ref.value?.updatePosition()
  })
})

// Initialize values
const initValues = () => {
  if (props.range) {
    if (Array.isArray(props.modelValue)) {
      firstValue.value = Math.max(props.min, Math.min(props.modelValue[0], props.max))
      secondValue.value = Math.max(props.min, Math.min(props.modelValue[1], props.max))
    } else {
      firstValue.value = props.min
      secondValue.value = props.max
    }
  } else {
    firstValue.value = Math.max(props.min, Math.min(props.modelValue as number, props.max))
  }
}

watch(() => props.modelValue, initValues, { immediate: true })

// Helpers
const valueToPercent = (val: number) => {
  return ((val - props.min) / (props.max - props.min)) * 100
}

const percentToValue = (percent: number) => {
  const val = props.min + (percent / 100) * (props.max - props.min)
  const step = props.step
  const steppedVal = Math.round(val / step) * step
  return Math.max(props.min, Math.min(steppedVal, props.max))
}

// Styles
const barStyle = computed(() => {
  if (props.range) {
    const start = Math.min(firstValue.value, secondValue.value)
    const end = Math.max(firstValue.value, secondValue.value)
    const left = valueToPercent(start)
    const width = valueToPercent(end) - left
    return props.vertical
      ? { bottom: `${left}%`, height: `${width}%` }
      : { left: `${left}%`, width: `${width}%` }
  } else {
    const width = valueToPercent(firstValue.value)
    return props.vertical
      ? { bottom: '0%', height: `${width}%` }
      : { left: '0%', width: `${width}%` }
  }
})

const thumb1Style = computed(() => {
  const percent = valueToPercent(firstValue.value)
  return props.vertical ? { bottom: `${percent}%` } : { left: `${percent}%` }
})

const thumb2Style = computed(() => {
  const percent = valueToPercent(secondValue.value)
  return props.vertical ? { bottom: `${percent}%` } : { left: `${percent}%` }
})

const getMarkStyle = (val: number) => {
  const percent = valueToPercent(val)
  return props.vertical ? { bottom: `${percent}%` } : { left: `${percent}%` }
}

const stops = computed(() => {
  if (!props.showStops || props.step <= 0) return []
  
  const result: number[] = []
  const range = props.max - props.min
  const stepCount = range / props.step
  const stepWidth = 100 * props.step / range

  for (let i = 1; i < stepCount; i++) {
    result.push(i * stepWidth)
  }
  
  return result
})

const getStopStyle = (percent: number) => {
  return props.vertical ? { bottom: `${percent}%` } : { left: `${percent}%` }
}

// Interaction
const getClientXY = (e: MouseEvent | TouchEvent) => {
  if ('touches' in e) {
    return { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }
  return { x: e.clientX, y: e.clientY }
}

const setPosition = (percent: number) => {
  const newValue = percentToValue(percent)
  
  if (props.range) {
    if (draggingIndex.value === 0) {
      firstValue.value = Math.min(newValue, secondValue.value)
    } else {
      secondValue.value = Math.max(newValue, firstValue.value)
    }
    emit('update:modelValue', [firstValue.value, secondValue.value])
  } else {
    firstValue.value = newValue
    emit('update:modelValue', newValue)
  }
}

const onDragStart = (e: MouseEvent | TouchEvent, index: number) => {
  if (props.disabled) return
  isDragging.value = true
  draggingIndex.value = index
  
  window.addEventListener('mousemove', onDragging)
  window.addEventListener('mouseup', onDragEnd)
  window.addEventListener('touchmove', onDragging)
  window.addEventListener('touchend', onDragEnd)
}

const onDragging = (e: MouseEvent | TouchEvent) => {
  if (!isDragging.value || !trackRef.value) return
  
  const rect = trackRef.value.getBoundingClientRect()
  const { x, y } = getClientXY(e)
  
  let percent = 0
  if (props.vertical) {
    percent = ((rect.bottom - y) / rect.height) * 100
  } else {
    percent = ((x - rect.left) / rect.width) * 100
  }
  
  // Clamp
  percent = Math.max(0, Math.min(100, percent))
  setPosition(percent)
}

const onDragEnd = () => {
  if (isDragging.value) {
    isDragging.value = false
    emit('change', props.range ? [firstValue.value, secondValue.value] : firstValue.value)
    window.removeEventListener('mousemove', onDragging)
    window.removeEventListener('mouseup', onDragEnd)
    window.removeEventListener('touchmove', onDragging)
    window.removeEventListener('touchend', onDragEnd)
  }
}

const onRunwayClick = (e: MouseEvent) => {
  if (props.disabled || !trackRef.value) return
  
  const rect = trackRef.value.getBoundingClientRect()
  let percent = 0
  if (props.vertical) {
    percent = ((rect.bottom - e.clientY) / rect.height) * 100
  } else {
    percent = ((e.clientX - rect.left) / rect.width) * 100
  }
  
  const newValue = percentToValue(percent)
  
  if (props.range) {
    // Determine closest thumb
    const dist1 = Math.abs(newValue - firstValue.value)
    const dist2 = Math.abs(newValue - secondValue.value)
    if (dist1 <= dist2) {
      firstValue.value = Math.min(newValue, secondValue.value)
      draggingIndex.value = 0
    } else {
      secondValue.value = Math.max(newValue, firstValue.value)
      draggingIndex.value = 1
    }
    emit('update:modelValue', [firstValue.value, secondValue.value])
    emit('change', [firstValue.value, secondValue.value])
  } else {
    firstValue.value = newValue
    emit('update:modelValue', newValue)
    emit('change', newValue)
  }
}

// Input handling
const onInput = (e: Event) => {
  const val = parseFloat((e.target as HTMLInputElement).value)
  if (!isNaN(val)) {
    // Just update internal, don't clamp yet for better typing experience
    // But for slider sync we might need to clamp or wait for change
  }
}

const onInputChange = (e: Event) => {
  let val = parseFloat((e.target as HTMLInputElement).value)
  if (isNaN(val)) return
  
  val = Math.max(props.min, Math.min(val, props.max))
  val = Math.round(val / props.step) * props.step
  
  firstValue.value = val
  emit('update:modelValue', val)
  emit('change', val)
  
  // Force update input value if it was clamped
  ;(e.target as HTMLInputElement).value = val.toString()
}

// Keyboard accessibility
const onKeyDown = (e: KeyboardEvent, index: number) => {
  if (props.disabled) return
  
  let newVal = index === 0 ? firstValue.value : secondValue.value
  const step = props.step
  
  switch (e.key) {
    case 'ArrowLeft':
    case 'ArrowDown':
      newVal -= step
      e.preventDefault()
      break
    case 'ArrowRight':
    case 'ArrowUp':
      newVal += step
      e.preventDefault()
      break
    case 'Home':
      newVal = props.min
      e.preventDefault()
      break
    case 'End':
      newVal = props.max
      e.preventDefault()
      break
    default:
      return
  }
  
  newVal = Math.max(props.min, Math.min(newVal, props.max))
  
  if (props.range) {
    if (index === 0) {
      firstValue.value = Math.min(newVal, secondValue.value)
    } else {
      secondValue.value = Math.max(newVal, firstValue.value)
    }
    emit('update:modelValue', [firstValue.value, secondValue.value])
    emit('change', [firstValue.value, secondValue.value])
  } else {
    firstValue.value = newVal
    emit('update:modelValue', newVal)
    emit('change', newVal)
  }
}
</script>