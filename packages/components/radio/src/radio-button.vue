<template>
  <label
    class="amu-radio-button"
    :class="{
      'is-active': modelValue === label,
      'is-disabled': isDisabled,
      [`amu-radio-button--${radioSize}`]: radioSize,
    }"
  >
    <input
      ref="radioRef"
      v-model="modelValue"
      class="amu-radio-button__original"
      type="radio"
      :value="label"
      :name="name || groupName"
      :disabled="isDisabled"
      @change="handleChange"
    />
    <span
      class="amu-radio-button__inner"
      :style="modelValue === label ? activeStyle : {}"
      @keydown.stop
    >
      <slot>
        {{ label }}
      </slot>
    </span>
  </label>
</template>

<script lang="ts" setup>
import { computed, inject, nextTick, ref } from 'vue'
import { radioButtonProps } from './props'
import type { RadioValueType } from './props'
import { radioGroupKey } from './constants'

defineOptions({
  name: 'AmuRadioButton',
})

const props = defineProps(radioButtonProps)

const radioRef = ref<HTMLInputElement>()
const radioGroup = inject(radioGroupKey, undefined)

const isGroup = computed(() => !!radioGroup)

const modelValue = computed<RadioValueType | undefined>({
  get() {
    return isGroup.value ? radioGroup!.props.modelValue : undefined
  },
  set(val) {
    if (isGroup.value) {
      radioGroup!.changeEvent(val as RadioValueType)
    }
  },
})

const radioSize = computed(() => {
  return radioGroup?.props.size || 'default'
})

const isDisabled = computed(() => {
  return props.disabled || radioGroup?.props.disabled || false
})

const groupName = computed(() => {
  return radioGroup?.name.value
})

const activeStyle = computed(() => {
  return {
    backgroundColor: radioGroup?.props.fill || '',
    borderColor: radioGroup?.props.fill || '',
    boxShadow: radioGroup?.props.fill ? `-1px 0 0 0 ${radioGroup.props.fill}` : '',
    color: radioGroup?.props.textColor || '',
  }
})

const handleChange = () => {
  // RadioButton usually works inside a group, so we don't need to emit change event from here directly if we rely on group's change event
  // But for consistency with Radio, we can keep it simple.
}
</script>
