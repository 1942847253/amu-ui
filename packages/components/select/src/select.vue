<template>
  <AmuPopup
    ref="popupInstance"
    v-model="visible"
    trigger="manual"
    placement="bottom-start"
    :offset="4"
    :match-width="true"
    transition="amu-zoom-in-top"
    class="amu-select__popper"
    @click.stop
  >
    <template #reference>
      <div
        ref="selectRef"
        class="amu-select"
        :class="{
          'is-disabled': disabled,
          'is-clearable': clearable,
          'is-focused': visible,
          [`amu-select--${size}`]: size,
        }"
        @click.stop="toggleMenu"
        v-bind="$attrs"
      >
        <div class="amu-select__wrapper">
          <div class="amu-select__selection">
            <!-- Multiple Selection Tags -->
            <template v-if="multiple && Array.isArray(modelValue) && modelValue.length > 0">
              <amu-tag
                v-for="item in selectedOptions"
                :key="getValueKey(item.value)"
                closable
                size="small"
                @close="removeTag(item.value)"
              >
                {{ item.label }}
              </amu-tag>
            </template>

            <!-- Input / Placeholder -->
            <amu-input
              ref="inputRef"
              class="amu-select__input"
              :class="{ 'is-transparent': multiple && Array.isArray(modelValue) && modelValue.length > 0 }"
              :readonly="!filterable"
              :disabled="disabled"
              :placeholder="showPlaceholder ? currentPlaceholder : ''"
              :model-value="displayValue"
              :borderless="true"
              @input="handleInput"
              @focus="handleFocus"
              @blur="handleBlur"
            />
          </div>

          <!-- Suffix Icons -->
          <div class="amu-select__suffix">
            <amu-icon
              v-if="showClear"
              class="amu-select__icon amu-select__clear"
              @click.stop="handleClear"
            >
              <icon-x />
            </amu-icon>
            <amu-icon
              v-else-if="filterable"
              class="amu-select__icon amu-select__search"
            >
              <icon-search />
            </amu-icon>
            <amu-icon
              v-else
              class="amu-select__icon amu-select__arrow"
              :class="{ 'is-reverse': visible }"
            >
              <icon-chevron-down />
            </amu-icon>
          </div>
        </div>
      </div>
    </template>

    <div class="amu-select__content">
      <div v-if="!$slots.default && options?.length" class="amu-select__options">
          <amu-option
            v-for="opt in options"
            :key="getValueKey(opt.value)"
            :value="opt.value"
            :label="opt.label"
            :disabled="opt.disabled"
          />
      </div>
      <slot />
      <div v-if="emptyText" class="amu-select__empty">
        {{ emptyText }}
      </div>
    </div>
  </AmuPopup>
</template>

<script setup lang="ts">
import { ref, computed, provide, watch, reactive, useSlots, nextTick } from 'vue'
import { selectProps, selectEmits, selectContextKey, type SelectValue, type OptionProps, type SelectOptionProxy } from './props'
import { AmuIcon } from 'amu-ui/icon'
import { AmuTag } from 'amu-ui/tag'
import { AmuInput } from '../../input'
import { AmuPopup } from '../../popup'
import { IconChevronDown, IconX, IconSearch } from '@amu-ui/icons'
import { useHover, useLocale } from '@amu-ui/hooks'
import AmuOption from './option.vue'

defineOptions({
  name: 'AmuSelect',
  inheritAttrs: false,
})

const props = defineProps(selectProps)
const emit = defineEmits(selectEmits)
const slots = useSlots()

const selectRef = ref<HTMLElement>()
const popupInstance = ref<InstanceType<typeof AmuPopup>>()
const inputRef = ref<InstanceType<typeof AmuInput>>()
const visible = ref(false)
const query = ref('')
const { hovered } = useHover(selectRef)
const { t } = useLocale()

// 存储选项信息
const optionsMap = reactive(new Map<SelectValue, SelectOptionProxy>())

const toggleMenu = () => {
  if (props.disabled) return
  visible.value = !visible.value
}

const closeMenu = () => {
  visible.value = false
}

function scrollToSelectedOption() {
  const popper = popupInstance.value?.popupRef
  if (!popper) return
  const contentEl = popper.querySelector('.amu-select__content') as HTMLElement | null
  if (!contentEl) return

  const selectedEl = contentEl.querySelector('.amu-option.is-selected') as HTMLElement | null
  if (!selectedEl) return

  // 只滚动下拉内部的可滚动容器，避免影响页面滚动条
  // .amu-select__content 设置了 position: relative，确保 offsetParent 链能在容器内闭合
  const selectedTop = selectedEl.offsetTop
  const target = selectedTop - (contentEl.clientHeight / 2 - selectedEl.offsetHeight / 2)
  const max = Math.max(0, contentEl.scrollHeight - contentEl.clientHeight)
  contentEl.scrollTop = Math.min(Math.max(0, target), max)
}

watch(visible, async (val) => {
  emit('visible-change', val)
  if (val) {
    await nextTick()
    // 等下一帧让过渡初始布局稳定
    requestAnimationFrame(() => {
      scrollToSelectedOption()
    })
    return
  }

  inputRef.value?.blur()
})

// 选择逻辑
const selectedLabel = ref<string | number>('')

function getOptionLabel(value: SelectValue) {
  const fromMap = optionsMap.get(value)
  if (fromMap?.label !== undefined) return fromMap.label
  const fromProp = (props.options || []).find((opt) => opt.value === value)
  return fromProp?.label
}

const selectedOptions = computed(() => {
  if (!props.multiple) return []
  if (!Array.isArray(props.modelValue)) return []
  return props.modelValue.map((val) => {
    const label = getOptionLabel(val)
    return {
      value: val,
      label: label ?? val,
    }
  })
})

const displayValue = computed(() => {
  if (props.multiple) return query.value
  if (props.filterable && visible.value) return query.value
  return selectedLabel.value
})

const showPlaceholder = computed(() => {
  if (props.multiple) {
    return !props.modelValue || (Array.isArray(props.modelValue) && props.modelValue.length === 0)
  }
  return !props.modelValue && props.modelValue !== 0 && props.modelValue !== false
})

const showClear = computed(() => {
  return props.clearable && !props.disabled && hovered.value && (
    (props.multiple && Array.isArray(props.modelValue) && props.modelValue.length > 0) ||
    (!props.multiple && (props.modelValue !== undefined && props.modelValue !== null && props.modelValue !== ''))
  )
})

const handleClear = () => {
  if (props.multiple) {
    emit('update:modelValue', [])
    emit('change', [])
  } else {
    emit('update:modelValue', '')
    emit('change', '')
  }
  emit('clear')
  query.value = '' // 清空查询
  visible.value = false
}

// 监听 modelValue 以在外部清除或更改时更新 selectedLabel
watch(() => props.modelValue, (val) => {
  if (!props.multiple) {
    if (val === undefined || val === null || val === '') {
      selectedLabel.value = ''
    } else {
      const label = getOptionLabel(val as SelectValue)
      selectedLabel.value = (label ?? val) as string | number
    }
  }
}, { immediate: true })

const removeTag = (val: SelectValue) => {
  if (props.disabled) return
  const newValue = (props.modelValue as SelectValue[]).filter(v => v !== val)
  emit('update:modelValue', newValue)
  emit('change', newValue)
  emit('remove-tag', val)
}

const handleInput = (val: string) => {
  if (!props.filterable) return
  query.value = val
  // TODO: 实现过滤逻辑
}

const handleFocus = (e: FocusEvent) => {
  emit('focus', e)
}

const handleBlur = (e: FocusEvent) => {
  emit('blur', e)
}

const getValueKey = (val: any) => val // Simple identity for now

// Context
const onOptionSelect = (opt: SelectOptionProxy) => {
  if (props.multiple) {
    const current = (props.modelValue as SelectValue[]) || []
    const index = current.indexOf(opt.value)
    let newValue: SelectValue[]
    if (index > -1) {
      newValue = current.filter(v => v !== opt.value)
    } else {
      newValue = [...current, opt.value]
    }
    emit('update:modelValue', newValue)
    emit('change', newValue)
    // 不要在多选模式下关闭菜单
  } else {
    emit('update:modelValue', opt.value)
    emit('change', opt.value)
    selectedLabel.value = opt.label ?? (opt.value as string | number)
    closeMenu()
  }
}

const onOptionDestroy = (val: SelectValue) => {
  optionsMap.delete(val)
}

// 我们需要追踪选项（options）来获取它们的标签（label）
// 这在使用 slot 的情况下会比较棘手
// 我们可以用 provide / inject 来注册这些选项
// 但是 `onOptionSelect` 是由 Option 组件触发的
// 同时，就算某个值从未被点击过（比如首次渲染的默认值），
// 我们也需要知道它对应的 label
// 因此 Option 组件需要在创建时主动把自己注册进来

// 我们来把“注册”这件事加到上下文（context）里
const registerOption = (opt: SelectOptionProxy) => {
  optionsMap.set(opt.value, opt)
  // 如果是单选模式，且当前值等于该选项的值，则更新 selectedLabel
  if (!props.multiple && props.modelValue === opt.value) {
    selectedLabel.value = opt.label ?? (opt.value as string | number)
  }
}

provide(selectContextKey, {
  props,
  onOptionSelect,
  onOptionDestroy,
  selectedLabel,
  registerOption,
  query
} as any)

const emptyText = computed(() => {
  if (props.options && props.options.length === 0 && !slots.default) return t('el.select.noData')
  return null
})

const currentPlaceholder = computed(() => {
  return props.placeholder || t('el.select.placeholder')
})

// 处理 options 属性
const options = computed(() => {
  // 如果提供了 options 属性，我们可以使用它。
  // 但我们也支持 slots。
  // 如果使用 options 属性，我们在模板中渲染 AmuOption。
  return (props as any).options || []
})

</script>
