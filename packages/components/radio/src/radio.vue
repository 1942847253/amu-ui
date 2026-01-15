<template>
  <label
    class="amu-radio"
    :class="{
      'is-disabled': isDisabled,
      'is-checked': modelValue === actualValue,
      'is-bordered': border,
      [`amu-radio--${radioSize}`]: radioSize,
    }"
  >
    <span
      class="amu-radio__input"
      :class="{
        'is-disabled': isDisabled,
        'is-checked': modelValue === actualValue,
      }"
    >
      <input
        ref="radioRef"
        v-model="modelValue"
        class="amu-radio__original"
        type="radio"
        :value="actualValue"
        :name="name || groupName"
        :disabled="isDisabled"
        @change="handleChange"
      />
      <span class="amu-radio__inner" />
    </span>
    <span class="amu-radio__label" @keydown.stop>
      <slot>
        {{ label }}
      </slot>
    </span>
  </label>
</template>

<script lang="ts" setup>
import { computed, inject, nextTick, ref } from 'vue'
import { radioEmits, radioProps } from './props'
import type { RadioValueType } from './props'
import { radioGroupKey } from './constants'
import { formContextKey } from '../../form/src/constants'

defineOptions({
  name: 'AmuRadio',
})

const props = defineProps(radioProps)
const emit = defineEmits(radioEmits)

const radioRef = ref<HTMLInputElement>()
const radioGroup = inject(radioGroupKey, undefined)
const formContext = inject(formContextKey, undefined)

const isGroup = computed(() => !!radioGroup)

const actualValue = computed(() => {
  if (props.value !== undefined) return props.value
  return props.label
})

const modelValue = computed<RadioValueType | undefined>({
  get() {
    return isGroup.value ? radioGroup!.props.modelValue : props.modelValue
  },
  set(val) {
    if (isGroup.value) {
      radioGroup!.changeEvent(val as RadioValueType)
    } else {
      emit('update:modelValue', val as RadioValueType)
    }
  },
})

const radioSize = computed(() => {
  return props.size || radioGroup?.props.size || formContext?.props.size || 'medium'
})

const isDisabled = computed(() => {
  return props.disabled || radioGroup?.props.disabled || formContext?.props.disabled || false
})

const groupName = computed(() => {
  return radioGroup?.name.value
})

const handleChange = () => {
  nextTick(() => {
    emit('change', modelValue.value as RadioValueType)
  })
}
</script>
