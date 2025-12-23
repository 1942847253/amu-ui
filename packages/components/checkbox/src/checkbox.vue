<template>
  <label
    :class="[
      'amu-checkbox',
      `amu-checkbox--${size}`,
      {
        'is-checked': isChecked,
        'is-disabled': isDisabled,
        'is-indeterminate': indeterminate,
        'is-error': error,
      },
    ]"
    @click="handleClick"
  >
    <span class="amu-checkbox__input">
      <input
        ref="inputRef"
        type="checkbox"
        class="amu-checkbox__original"
        :checked="isChecked"
        :disabled="isDisabled"
        :aria-checked="indeterminate ? 'mixed' : isChecked"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown.space.prevent="handleKeydown"
      />
      <span class="amu-checkbox__inner">
        <svg
          v-if="indeterminate"
          class="amu-checkbox__icon"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 8H13"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
          />
        </svg>
        <svg
          v-else-if="isChecked"
          class="amu-checkbox__icon"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.5 8L6.5 12L13.5 4"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </span>
    <span v-if="$slots.default || label" class="amu-checkbox__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { checkboxProps, checkboxEmits, checkboxGroupKey } from './props'
import type { CheckboxGroupContext } from './props'

defineOptions({
  name: 'AmuCheckbox',
})

const props = defineProps(checkboxProps)
const emit = defineEmits(checkboxEmits)

// 注入 CheckboxGroup 上下文
const checkboxGroup = inject<CheckboxGroupContext>(checkboxGroupKey, undefined!)

// 引用
const inputRef = ref<HTMLInputElement>()

// 是否在 Group 中
const isInGroup = computed(() => !!checkboxGroup)

// 是否禁用
const isDisabled = computed(() => {
  return props.disabled || checkboxGroup?.disabled || false
})

// 是否选中
const isChecked = computed(() => {
  if (isInGroup.value) {
    // 在 Group 中，通过 value 判断是否选中
    return checkboxGroup.modelValue.includes(props.value!)
  }
  // 单独使用
  if (props.modelValue !== undefined) {
    return Boolean(props.modelValue)
  }
  return props.checked
})

// 处理值变化
const handleChange = (event: Event) => {
  if (isDisabled.value) return

  const target = event.target as HTMLInputElement
  const checked = target.checked

  if (isInGroup.value) {
    // 在 Group 中，通过 Group 更新值
    checkboxGroup.changeValue(props.value!, checked)
  } else {
    // 单独使用，更新 modelValue
    emit('update:modelValue', checked)
    emit('change', checked, props.value)
  }
}

// 处理点击
const handleClick = (event: MouseEvent) => {
  if (isDisabled.value) return
  emit('click', event)
}

// 处理焦点
const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

// 处理键盘事件（空格切换）
const handleKeydown = (event: KeyboardEvent) => {
  if (isDisabled.value) return
  inputRef.value?.click()
}

// 暴露方法（用于外部控制）
defineExpose({
  /**
   * 获取输入框引用
   */
  inputRef,
  /**
   * 设置焦点
   */
  focus: () => inputRef.value?.focus(),
  /**
   * 移除焦点
   */
  blur: () => inputRef.value?.blur(),
})
</script>

<style scoped>
@import './style.css';
</style>
