import type { ExtractPropTypes, PropType, InjectionKey, Ref } from 'vue'

export type SelectValue = string | number | boolean | object
export type SelectModelValue = SelectValue | SelectValue[]

export const selectProps = {
  /**
   * @description 绑定值
   * @en Binding value
   */
  modelValue: {
    type: [String, Number, Boolean, Object, Array] as PropType<SelectModelValue>,
    default: undefined,
  },
  /**
   * @description 是否多选
   * @en Whether multiple-select is activated
   */
  multiple: Boolean,
  /**
   * @description 是否禁用
   * @en Whether is disabled
   */
  disabled: Boolean,
  /**
   * @description 是否可以清空选项
   * @en Whether the select is clearable
   */
  clearable: Boolean,
  /**
   * @description 占位符
   * @en Placeholder
   */
  placeholder: {
    type: String,
    default: 'Select',
  },
  /**
   * @description 是否可搜索
   * @en Whether the select is filterable
   */
  filterable: Boolean,
  /**
   * @description 尺寸
   * @en Size of Input
   */
  size: {
    type: String as PropType<'small' | 'large' | 'default'>,
    default: 'default',
  },
  /**
   * @description 弹窗位置
   * @en Placement of dropdown
   */
  placement: {
    type: String as PropType<'bottom' | 'top' | 'bottom-start' | 'top-start' | 'bottom-end' | 'top-end'>,
    default: 'bottom-start',
  },
  /**
   * @description 选项数据，如果设置则不需要手动写 amu-option
   * @en Options data, if set, no need to write amu-option manually
   */
  options: {
    type: Array as PropType<Array<{ label: string | number; value: SelectValue; disabled?: boolean }>>,
    default: () => [],
  },
} as const

export type SelectProps = ExtractPropTypes<typeof selectProps>

export const selectEmits = {
  /**
   * @description 值变化时触发（v-model）
   * @en Triggered when modelValue updates (v-model)
   */
  'update:modelValue': (val: SelectModelValue) => true,
  /**
   * @description 选中值变化后触发
   * @en Triggered when selected value changes
   */
  change: (val: SelectModelValue) => true,
  /**
   * @description 点击清空按钮后触发
   * @en Triggered after clicking clear button
   */
  clear: () => true,
  /**
   * @description 下拉菜单显示状态变化时触发
   * @en Triggered when dropdown visibility changes
   */
  'visible-change': (visible: boolean) => true,
  /**
   * @description 多选模式下移除某个标签时触发
   * @en Triggered when a tag is removed in multiple mode
   */
  'remove-tag': (val: SelectValue) => true,
  /**
   * @description 输入框获得焦点时触发
   * @en Triggered when input gets focus
   */
  focus: (e: FocusEvent) => true,
  /**
   * @description 输入框失去焦点时触发
   * @en Triggered when input loses focus
   */
  blur: (e: FocusEvent) => true,
}

export const optionProps = {
  /**
   * @description 选项的值
   * @en Value of option
   */
  value: {
    type: [String, Number, Boolean, Object] as PropType<SelectValue>,
    required: true,
  },
  /**
   * @description 选项的标签，若不设置则默认与 value 相同
   * @en Label of option, same as value if omitted
   */
  label: {
    type: [String, Number] as PropType<string | number>,
    default: undefined,
  },
  /**
   * @description 是否禁用该选项
   * @en Whether option is disabled
   */
  disabled: Boolean,
} as const

export type OptionProps = ExtractPropTypes<typeof optionProps>

export interface SelectOptionProxy {
  value: SelectValue
  label?: string | number
  disabled?: boolean
}

export interface SelectContext {
  props: SelectProps
  onOptionSelect: (item: SelectOptionProxy) => void
  onOptionDestroy: (value: SelectValue) => void
  registerOption: (item: SelectOptionProxy) => void
  selectedLabel: Ref<string | number>
  query: Ref<string>
}

export const selectContextKey: InjectionKey<SelectContext> = Symbol('selectContextKey')
