<template>
  <AmuPopup
    ref="popupInstance"
    v-model="visible"
    trigger="manual"
    :placement="placement"
    :offset="4"
    :show-arrow="false"
    :match-width="false"
    :force-render="true"
    transition="amu-zoom-in-top"
    class="amu-cascader__popper"
    @click.stop
  >
    <template #reference>
      <div
        ref="cascaderRef"
        class="amu-cascader"
        :class="{
          'is-disabled': cascaderDisabled,
          'is-clearable': clearable,
          'is-focused': visible,
          [`amu-cascader--${cascaderSize}`]: cascaderSize,
        }"
        @click.stop="toggleMenu"
        v-bind="$attrs"
      >
        <div class="amu-cascader__wrapper">
          <div class="amu-cascader__selection">
            <slot
              v-if="$slots.default"
              :selected-options="selectedOptions"
              :selected-values="selectedValues"
              :selected-labels="selectedLabels"
            />
            <template v-else>
              <template v-if="multiple && selectedPaths.length">
                <amu-tag
                  v-for="path in selectedPaths"
                  :key="path.join('__')"
                  closable
                  size="small"
                  @close="removeTag(path)"
                >
                  {{ formatPathLabel(path) }}
                </amu-tag>
              </template>
              <amu-input
                class="amu-cascader__input"
                :class="{ 'is-transparent': multiple && selectedPaths.length }"
                :readonly="true"
                :disabled="cascaderDisabled"
                :placeholder="showPlaceholder ? placeholder : ''"
                :model-value="displayLabel"
                :borderless="true"
              />
            </template>
          </div>
          <div class="amu-cascader__suffix">
            <amu-icon
              v-if="showClear"
              class="amu-cascader__icon amu-cascader__clear"
              @click.stop="handleClear"
            >
              <icon-x />
            </amu-icon>
            <amu-icon
              v-else
              class="amu-cascader__icon amu-cascader__arrow"
              :class="{ 'is-reverse': visible }"
            >
              <icon-chevron-down />
            </amu-icon>
          </div>
        </div>
      </div>
    </template>

    <div class="amu-cascader__content" @click.stop>
      <template v-if="menus.length">
        <div
          v-for="(menu, level) in menus"
          :key="level"
          class="amu-cascader__menu"
        >
          <div
            v-for="option in menu"
            :key="option.value"
            class="amu-cascader__option"
            :class="{
              'is-active': isActive(option, level),
              'is-selected': isSelected(option, level),
              'is-disabled': option.disabled,
            }"
            @mouseenter="handleOptionEnter(option, level)"
            @click="handleOptionClick(option, level)"
          >
            <div class="amu-cascader__option-label">
              <span
                v-if="multiple"
                class="amu-cascader__option-checkbox"
                @click.stop
                @mousedown.stop
              >
                <AmuCheckbox
                  :model-value="isOptionChecked(option, level)"
                  :indeterminate="isOptionIndeterminate(option, level)"
                  :disabled="option.disabled || !isOptionSelectable(option, level)"
                  @update:modelValue="handleOptionCheckbox(option, level)"
                />
              </span>
              <slot
                name="option"
                :option="option"
                :level="level"
                :selected="isOptionChecked(option, level)"
                :is-leaf="isOptionLeaf(option)"
              >
                {{ option.label ?? option.value }}
              </slot>
            </div>
            <amu-icon
              v-if="!isOptionLeaf(option)"
              class="amu-cascader__option-arrow"
            >
              <icon-chevron-right />
            </amu-icon>
          </div>
        </div>
      </template>
      <div v-else class="amu-cascader__empty">
        <slot name="empty">
          {{ emptyText }}
        </slot>
      </div>
    </div>
  </AmuPopup>
</template>

<script setup lang="ts">
import { ref, computed, watch, inject } from 'vue'
import { cascaderProps, cascaderEmits, type CascaderOption, type CascaderValue, type CascaderPath, type CascaderModelValue } from './props'
import { AmuPopup } from '../../popup'
import { AmuInput } from '../../input'
import { AmuIcon } from '../../icon'
import { AmuTag } from '../../tag'
import { AmuCheckbox } from '../../checkbox'
import { IconChevronDown, IconChevronRight, IconX } from '@amu-ui/icons'
import { formContextKey } from '../../form/src/constants'

defineOptions({
  name: 'AmuCascader',
  inheritAttrs: false,
})

const props = defineProps(cascaderProps)
const emit = defineEmits(cascaderEmits)
const formContext = inject(formContextKey, undefined)

const cascaderRef = ref<HTMLElement>()
const visible = ref(false)

const cascaderSize = computed(() => props.size || formContext?.props.size || 'medium')
const cascaderDisabled = computed(() => props.disabled || formContext?.props.disabled || false)

const singleValue = ref<CascaderPath>(normalizeSingleValue(props.modelValue))
const multipleValues = ref<CascaderPath[]>(normalizeMultipleValue(props.modelValue))
const activeValues = ref<CascaderPath>([])

watch(
  () => props.modelValue,
  (val) => {
    singleValue.value = normalizeSingleValue(val)
    multipleValues.value = normalizeMultipleValue(val)
  }
)

watch(visible, (val) => {
  emit('visible-change', val)
  if (val) {
    activeValues.value = props.multiple
      ? (multipleValues.value[multipleValues.value.length - 1] ?? [])
      : singleValue.value
  }
})

const selectedOptions = computed(() => {
  if (props.multiple) return multipleValues.value.map((path) => getPathOptions(props.options, path))
  return getPathOptions(props.options, singleValue.value)
})

const selectedLabels = computed(() => {
  if (props.multiple) {
    return multipleValues.value.map((path) =>
      getPathOptions(props.options, path).map((item) => item.label ?? String(item.value))
    )
  }
  return getPathOptions(props.options, singleValue.value).map((item) => item.label ?? String(item.value))
})

const selectedValues = computed<CascaderModelValue>(() => {
  return props.multiple ? multipleValues.value : singleValue.value
})

const selectedPaths = computed(() => multipleValues.value)

const displayLabel = computed(() => {
  if (props.multiple) return ''
  const labels = selectedLabels.value as string[]
  if (!labels.length) return ''
  return props.showAllLevels
    ? labels.join(props.separator)
    : labels[labels.length - 1]
})

const showPlaceholder = computed(() => !displayLabel.value)
const showClear = computed(() => {
  if (!props.clearable || cascaderDisabled.value) return false
  return props.multiple ? multipleValues.value.length > 0 : singleValue.value.length > 0
})

const menus = computed(() => {
  const result: CascaderOption[][] = []
  const root = props.options || []
  if (!root.length) return result
  result.push(root)

  const activeOptions = getPathOptions(props.options, activeValues.value)
  for (const option of activeOptions) {
    if (option.children && option.children.length) {
      result.push(option.children)
    } else {
      break
    }
  }
  return result
})

const toggleMenu = () => {
  if (cascaderDisabled.value) return
  visible.value = !visible.value
}

const handleClear = () => {
  if (cascaderDisabled.value) return
  singleValue.value = []
  multipleValues.value = []
  activeValues.value = []
  emit('update:modelValue', [])
  emit('change', [], [])
  emit('clear')
}

const handleOptionEnter = (option: CascaderOption, level: number) => {
  if (cascaderDisabled.value || option.disabled) return
  if (props.expandTrigger === 'hover') {
    setActivePath(option, level)
  }
}

const handleOptionClick = (option: CascaderOption, level: number) => {
  if (cascaderDisabled.value || option.disabled) return
  setActivePath(option, level)
  const leaf = isOptionLeaf(option)
  if (props.multiple) {
    if (!props.checkStrictly && !leaf) {
      toggleMultipleSelection(option, level)
      return
    }
    if (leaf) selectOption(option, level)
    return
  }
  if (leaf) selectOption(option, level)
}

const handleOptionCheckbox = (option: CascaderOption, level: number) => {
  if (cascaderDisabled.value || option.disabled) return
  setActivePath(option, level)
  const leaf = isOptionLeaf(option)
  if (props.multiple && !props.checkStrictly && !leaf) {
    toggleMultipleSelection(option, level)
    return
  }
  selectOption(option, level)
}

const selectOption = (option: CascaderOption, level: number) => {
  const values = [...activeValues.value.slice(0, level), option.value]
  if (props.multiple) {
    const exists = multipleValues.value.some((path) => isSamePath(path, values))
    const next = exists
      ? multipleValues.value.filter((path) => !isSamePath(path, values))
      : [...multipleValues.value, values]
    multipleValues.value = next
    emit('update:modelValue', next)
    emit('change', next, next.map((path) => getPathOptions(props.options, path)))
    return
  }
  singleValue.value = values
  emit('update:modelValue', values)
  emit('change', values, getPathOptions(props.options, values))
  visible.value = false
}

const setActivePath = (option: CascaderOption, level: number) => {
  activeValues.value = [...activeValues.value.slice(0, level), option.value]
  emit('expand-change', getPathOptions(props.options, activeValues.value), [...activeValues.value])
}

const isSelected = (option: CascaderOption, level: number) => {
  if (!props.multiple) return singleValue.value[level] === option.value
  return isOptionChecked(option, level)
}

const isActive = (option: CascaderOption, level: number) => {
  return activeValues.value[level] === option.value
}

const isOptionLeaf = (option: CascaderOption) => {
  return option.isLeaf ?? (!option.children || option.children.length === 0)
}

const isOptionSelectable = (option: CascaderOption, level: number) => {
  if (props.checkStrictly) return true
  const paths = getLeafPaths(option, level)
  return paths.length > 0
}

const isOptionChecked = (option: CascaderOption, level: number) => {
  const path = getOptionPath(option, level)
  if (!props.multiple) return singleValue.value[level] === option.value
  if (props.checkStrictly) return multipleValues.value.some((item) => isSamePath(item, path))
  const leafPaths = getLeafPaths(option, level)
  if (!leafPaths.length) return false
  return leafPaths.every((item) => isPathSelected(item))
}

const isOptionIndeterminate = (option: CascaderOption, level: number) => {
  if (!props.multiple || props.checkStrictly) return false
  const leafPaths = getLeafPaths(option, level)
  if (!leafPaths.length) return false
  const selectedCount = leafPaths.filter((item) => isPathSelected(item)).length
  return selectedCount > 0 && selectedCount < leafPaths.length
}

const getPathOptions = (options: CascaderOption[], values: CascaderValue[]) => {
  const result: CascaderOption[] = []
  let current = options
  for (const value of values) {
    const match = current.find((item) => item.value === value)
    if (!match) break
    result.push(match)
    current = match.children || []
  }
  return result
}

const formatPathLabel = (path: CascaderPath) => {
  const labels = getPathOptions(props.options, path).map((item) => item.label ?? String(item.value))
  return props.showAllLevels ? labels.join(props.separator) : (labels[labels.length - 1] ?? '')
}

const removeTag = (path: CascaderPath) => {
  if (cascaderDisabled.value) return
  const next = multipleValues.value.filter((item) => !isSamePath(item, path))
  multipleValues.value = next
  emit('update:modelValue', next)
  emit('change', next, next.map((item) => getPathOptions(props.options, item)))
  emit('remove-tag', path)
}

const isSamePath = (a: CascaderPath, b: CascaderPath) => {
  if (a.length !== b.length) return false
  return a.every((val, idx) => val === b[idx])
}

const isPathSelected = (path: CascaderPath) => {
  return multipleValues.value.some((item) => isSamePath(item, path))
}

const getOptionPath = (option: CascaderOption, level: number) => {
  return [...activeValues.value.slice(0, level), option.value]
}

const getLeafPaths = (option: CascaderOption, level: number) => {
  const basePath = getOptionPath(option, level)
  return collectLeafPaths(option, basePath)
}

const collectLeafPaths = (option: CascaderOption, basePath: CascaderPath) => {
  if (option.disabled) return []
  const children = option.children || []
  const isLeaf = option.isLeaf ?? children.length === 0
  if (isLeaf) return [basePath]
  const result: CascaderPath[] = []
  for (const child of children) {
    result.push(...collectLeafPaths(child, [...basePath, child.value]))
  }
  return result
}

const toggleMultipleSelection = (option: CascaderOption, level: number) => {
  const leafPaths = getLeafPaths(option, level)
  if (!leafPaths.length) return
  const allSelected = leafPaths.every((item) => isPathSelected(item))
  const next = allSelected
    ? multipleValues.value.filter((item) => !leafPaths.some((leaf) => isSamePath(leaf, item)))
    : [...multipleValues.value, ...leafPaths.filter((leaf) => !isPathSelected(leaf))]
  multipleValues.value = next
  emit('update:modelValue', next)
  emit('change', next, next.map((item) => getPathOptions(props.options, item)))
}

function normalizeSingleValue(val: CascaderModelValue | undefined) {
  if (!Array.isArray(val)) return []
  if (val.length === 0) return []
  if (Array.isArray(val[0])) return []
  return val as CascaderPath
}

function normalizeMultipleValue(val: CascaderModelValue | undefined) {
  if (!Array.isArray(val)) return []
  if (val.length === 0) return []
  if (Array.isArray(val[0])) return val as CascaderPath[]
  return []
}
</script>
