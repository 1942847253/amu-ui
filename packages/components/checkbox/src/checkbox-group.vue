<template>
  <div
    :class="['amu-checkbox-group', `amu-checkbox-group--${groupSize}`]"
    role="group"
  >
    <!-- 使用 options 快速生成 -->
    <template v-if="options && options.length > 0">
      <amu-checkbox
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :label="option.label"
        :disabled="option.disabled"
      />
    </template>
    <!-- 使用默认插槽 -->
    <slot v-else />
  </div>
</template>

<script setup lang="ts">
import { provide, computed, toRef, inject, reactive } from 'vue'
import { checkboxGroupProps, checkboxGroupEmits, checkboxGroupKey } from './props'
import type { CheckboxGroupContext } from './props'
import { formContextKey } from '../../form/src/constants'
import AmuCheckbox from './checkbox.vue'

defineOptions({
  name: 'AmuCheckboxGroup',
})

const props = defineProps(checkboxGroupProps)
const emit = defineEmits(checkboxGroupEmits)
const formContext = inject(formContextKey, undefined)

const groupSize = computed(() => {
    return props.size || formContext?.props.size || 'medium'
})

const groupDisabled = computed(() => {
    return props.disabled || formContext?.props.disabled || false
})

// 当前选中的值
const currentValue = computed(() => props.modelValue || [])

// 是否可以选中（检查 max 限制）
const canCheck = computed(() => {
  if (props.max === undefined) return true
  return currentValue.value.length < props.max
})

// 是否可以取消选中（检查 min 限制）
const canUncheck = computed(() => {
  if (props.min === undefined) return true
  return currentValue.value.length > props.min
})

// 处理值变化
const changeValue = (value: string | number, checked: boolean) => {
  const newValue = [...currentValue.value]

  if (checked) {
    // 选中
    if (canCheck.value && !newValue.includes(value)) {
      newValue.push(value)
    }
  } else {
    // 取消选中
    if (canUncheck.value) {
      const index = newValue.indexOf(value)
      if (index > -1) {
        newValue.splice(index, 1)
      }
    }
  }

  // 如果值发生变化，触发事件
  if (newValue.length !== currentValue.value.length || 
      !newValue.every((v) => currentValue.value.includes(v))) {
    emit('update:modelValue', newValue)
    emit('change', newValue)
  }
}

// 提供上下文给子 Checkbox
const checkboxGroupContext = reactive({
  modelValue: currentValue,
  disabled: groupDisabled,
  size: groupSize,
  min: toRef(props, 'min'),
  max: toRef(props, 'max'),
  changeValue,
})

provide(checkboxGroupKey, checkboxGroupContext as CheckboxGroupContext)

// 暴露方法
defineExpose({
  /**
   * 获取当前选中的值
   */
  getValue: () => currentValue.value,
  /**
   * 设置选中的值
   */
  setValue: (value: Array<string | number>) => {
    emit('update:modelValue', value)
    emit('change', value)
  },
})
</script>

<style scoped>
@import './style.css';
</style>
