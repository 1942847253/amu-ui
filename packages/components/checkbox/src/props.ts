import type { PropType } from 'vue'
import type { InjectionKey } from 'vue'

/**
 * Checkbox 组件尺寸
 * @description 控制复选框的大小
 * @en Checkbox size
 */
export type CheckboxSize = 'small' | 'medium' | 'large'

/**
 * Checkbox 选项配置
 * @description 用于 CheckboxGroup 的快速选项配置
 * @en Checkbox option configuration for CheckboxGroup
 */
export interface CheckboxOption {
  /**
   * 选项显示文本
   * @description 复选框的标签文本
   * @en Option label text
   */
  label: string
  /**
   * 选项值
   * @description 选中时的值
   * @en Option value when checked
   */
  value: string | number
  /**
   * 是否禁用
   * @description 单个选项的禁用状态
   * @en Whether the option is disabled
   */
  disabled?: boolean
}

/**
 * Checkbox 组件 Props
 */
export const checkboxProps = {
  /**
   * 绑定值（v-model）
   * @description 复选框选中状态
   * @en Checkbox checked state
   */
  modelValue: {
    type: [Boolean, Number, String] as PropType<boolean | number | string>,
    default: undefined,
  },
  /**
   * 复选框的值
   * @description 在 CheckboxGroup 中使用时的唯一标识
   * @en Checkbox value, used as identifier in CheckboxGroup
   */
  value: {
    type: [Number, String] as PropType<number | string>,
    default: undefined,
  },
  /**
   * 是否选中（非受控）
   * @description 默认选中状态，优先级低于 modelValue
   * @en Default checked state (uncontrolled)
   */
  checked: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否禁用
   * @description 禁用复选框，不可交互
   * @en Whether the checkbox is disabled
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否半选状态
   * @description 常用于全选场景，表示部分选中
   * @en Whether in indeterminate state (partial selection)
   */
  indeterminate: {
    type: Boolean,
    default: false,
  },
  /**
   * 尺寸
   * @description 控制复选框大小
   * @en Checkbox size
   */
  size: {
    type: String as PropType<CheckboxSize>,
    default: 'medium',
  },
  /**
   * 是否显示错误状态
   * @description 表单校验失败时的视觉反馈
   * @en Whether to show error state
   */
  error: {
    type: Boolean,
    default: false,
  },
  /**
   * 标签文本
   * @description 复选框的标签内容
   * @en Checkbox label text
   */
  label: {
    type: String,
    default: '',
  },
} as const

/**
 * Checkbox 组件 Emits
 */
export const checkboxEmits = {
  /**
   * 值变化事件
   * @description 选中状态改变时触发
   * @en Emitted when checked state changes
   */
  'update:modelValue': (value: boolean | number | string) => true,
  /**
   * 改变事件
   * @description 选中状态改变时触发，提供选中状态和值
   * @en Emitted when checked state changes with checked state and value
   */
  change: (checked: boolean, value?: string | number) => true,
  /**
   * 点击事件
   * @description 点击复选框时触发
   * @en Emitted when checkbox is clicked
   */
  click: (event: MouseEvent) => event instanceof MouseEvent,
  /**
   * 获得焦点事件
   * @description 复选框获得焦点时触发
   * @en Emitted when checkbox gets focus
   */
  focus: (event: FocusEvent) => event instanceof FocusEvent,
  /**
   * 失去焦点事件
   * @description 复选框失去焦点时触发
   * @en Emitted when checkbox loses focus
   */
  blur: (event: FocusEvent) => event instanceof FocusEvent,
}

/**
 * Checkbox 组件 Slots
 */
export const checkboxSlots = {
  /**
   * 默认插槽
   * @description 自定义复选框标签内容
   * @en Custom checkbox label content
   */
  default: null,
}

/**
 * CheckboxGroup 组件 Props
 */
export const checkboxGroupProps = {
  /**
   * 绑定值（v-model）
   * @description 选中项的值数组
   * @en Array of checked values
   */
  modelValue: {
    type: Array as PropType<Array<string | number>>,
    default: () => [],
  },
  /**
   * 选项配置
   * @description 快速生成复选框组的配置数组
   * @en Options array for generating checkboxes
   */
  options: {
    type: Array as PropType<CheckboxOption[]>,
    default: undefined,
  },
  /**
   * 是否禁用整组
   * @description 禁用组内所有复选框
   * @en Whether to disable all checkboxes in group
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 最小选中数量
   * @description 限制最少选中的项目数
   * @en Minimum number of checked items
   */
  min: {
    type: Number,
    default: undefined,
  },
  /**
   * 最大选中数量
   * @description 限制最多选中的项目数
   * @en Maximum number of checked items
   */
  max: {
    type: Number,
    default: undefined,
  },
  /**
   * 尺寸
   * @description 控制组内所有复选框的大小
   * @en Size for all checkboxes in group
   */
  size: {
    type: String as PropType<CheckboxSize>,
    default: 'medium',
  },
} as const

/**
 * CheckboxGroup 组件 Emits
 */
export const checkboxGroupEmits = {
  /**
   * 值变化事件
   * @description 选中值数组改变时触发
   * @en Emitted when checked values array changes
   */
  'update:modelValue': (value: Array<string | number>) => Array.isArray(value),
  /**
   * 改变事件
   * @description 选中值数组改变时触发
   * @en Emitted when checked values array changes
   */
  change: (value: Array<string | number>) => Array.isArray(value),
}

/**
 * CheckboxGroup 组件 Slots
 */
export const checkboxGroupSlots = {
  /**
   * 默认插槽
   * @description 自定义复选框组内容，通常放置 Checkbox 组件
   * @en Custom checkbox group content, usually contains Checkbox components
   */
  default: null,
}

/**
 * CheckboxGroup 上下文类型
 */
export interface CheckboxGroupContext {
  modelValue: Array<string | number>
  disabled: boolean
  size: CheckboxSize
  min?: number
  max?: number
  changeValue: (value: string | number, checked: boolean) => void
}

/**
 * CheckboxGroup 注入 Key
 */
export const checkboxGroupKey: InjectionKey<CheckboxGroupContext> =
  Symbol('checkboxGroup')
