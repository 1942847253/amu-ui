<template>
  <div
    :class="[
      'amu-switch',
      `amu-switch--${size}`,
      {
        'is-checked': isChecked,
        'is-disabled': switchDisabled,
        'is-loading': isLoading
      }
    ]"
    :role="'switch'"
    :aria-checked="isChecked"
    :aria-disabled="switchDisabled"
    @click.prevent="handleSwitch"
    @keydown.enter.prevent="handleSwitch"
    @keydown.space.prevent="handleSwitch"
    tabindex="0"
  >
    <input
      ref="input"
      class="amu-switch__input"
      type="checkbox"
      :name="name"
      :true-value="true"
      :false-value="false"
      :disabled="switchDisabled"
      :checked="isChecked"
      @change="handleChange"
      tabindex="-1"
    />
    
    <span class="amu-switch__core" :style="coreStyle">
      <div class="amu-switch__inner">
        <span v-if="isChecked" class="amu-switch__inner-text">
          <slot name="checked-icon"></slot>
          <span v-if="!$slots['checked-icon']">{{ checkedText }}</span>
        </span>
        <span v-else class="amu-switch__inner-text">
          <slot name="unchecked-icon"></slot>
          <span v-if="!$slots['unchecked-icon']">{{ uncheckedText }}</span>
        </span>
      </div>
      <div class="amu-switch__action">
        <div v-if="isLoading" class="amu-switch__loading-icon"></div>
      </div>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { switchProps, switchEmits } from './props'
import { AmuIcon } from '../../icon'
import './style.css'

defineOptions({
  name: 'AmuSwitch'
})

const props = defineProps(switchProps)
const emit = defineEmits(switchEmits)

const innerLoading = ref(false)
const isChecked = computed(() => props.modelValue === true)
const isLoading = computed(() => props.loading || innerLoading.value)
const switchDisabled = computed(() => props.disabled || isLoading.value)

const coreStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.checkedColor && isChecked.value) {
    style['--amu-switch-on-color'] = props.checkedColor
    style['borderColor'] = props.checkedColor
    style['backgroundColor'] = props.checkedColor
  }
  if (props.uncheckedColor && !isChecked.value) {
    style['--amu-switch-off-color'] = props.uncheckedColor
    style['borderColor'] = props.uncheckedColor
    style['backgroundColor'] = props.uncheckedColor
  }
  return style
})

const handleChange = () => {
  // Input change event is handled by handleSwitch mostly, but if triggered by keyboard on input
  // We prevent default on click/keys on wrapper, so input might not be directly interacted with
  // except via the wrapper.
}

const handleSwitch = () => {
  if (switchDisabled.value) return

  const nextValue = !isChecked.value
  
  if (props.beforeChange) {
    const result = props.beforeChange()
    if (result instanceof Promise) {
      innerLoading.value = true
      result
        .then((res) => {
          innerLoading.value = false
          if (res !== false) {
            emitValue(nextValue)
          }
        })
        .catch(() => {
          innerLoading.value = false
        })
      return
    } else if (result === false) {
      return
    }
  }
  
  emitValue(nextValue)
}

const emitValue = (val: boolean) => {
  emit('update:modelValue', val)
  emit('change', val)
}
</script>
