import type { ExtractPropTypes, PropType } from 'vue'

export type RadioValueType = string | number | boolean

export const radioProps = {
  /**
   * @description 绑定值
   * @en Binding value
   */
  modelValue: {
    type: [String, Number, Boolean] as PropType<RadioValueType>,
    default: undefined,
  },
  /**
   * @description Radio 的 value
   * @en The value of Radio
   */
  label: {
    type: [String, Number, Boolean] as PropType<RadioValueType>,
    default: '',
  },
  /**
   * @description 是否禁用
   * @en Whether to disable
   */
  disabled: Boolean,
  /**
   * @description 原生 name 属性
   * @en Native name attribute
   */
  name: {
    type: String,
    default: '',
  },
  /**
   * @description 是否显示边框
   * @en Whether to show border
   */
  border: Boolean,
  /**
   * @description Radio 的尺寸
   * @en Size of the Radio
   */
  size: {
    type: String as PropType<'small' | 'large' | 'default'>,
    default: undefined,
  },
} as const

export type RadioProps = ExtractPropTypes<typeof radioProps>

export const radioEmits = {
  /**
   * @description 绑定值变化时触发
   * @en Triggers when the binding value changes
   */
  'update:modelValue': (val: RadioValueType) => true,
  /**
   * @description 绑定值变化时触发
   * @en Triggers when the binding value changes
   */
  change: (val: RadioValueType) => true,
}

export const radioGroupProps = {
  /**
   * @description 绑定值
   * @en Binding value
   */
  modelValue: {
    type: [String, Number, Boolean] as PropType<RadioValueType>,
    default: undefined,
  },
  /**
   * @description 是否禁用
   * @en Whether to disable
   */
  disabled: Boolean,
  /**
   * @description 原生 name 属性
   * @en Native name attribute
   */
  name: {
    type: String,
    default: undefined,
  },
  /**
   * @description Radio 的尺寸
   * @en Size of the Radio
   */
  size: {
    type: String as PropType<'small' | 'large' | 'default'>,
    default: 'default',
  },
  /**
   * @description 按钮形式的 Radio 激活时的文本颜色
   * @en Text color of active button-style Radio
   */
  textColor: {
    type: String,
    default: '',
  },
  /**
   * @description 按钮形式的 Radio 激活时的填充色和边框色
   * @en Fill color and border color of active button-style Radio
   */
  fill: {
    type: String,
    default: '',
  },
} as const

export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>

export const radioGroupEmits = {
  /**
   * @description 绑定值变化时触发
   * @en Triggers when the binding value changes
   */
  'update:modelValue': (val: RadioValueType) => true,
  /**
   * @description 绑定值变化时触发
   * @en Triggers when the binding value changes
   */
  change: (val: RadioValueType) => true,
}

export const radioButtonProps = {
  /**
   * @description Radio 的 value
   * @en The value of Radio
   */
  label: {
    type: [String, Number, Boolean] as PropType<RadioValueType>,
    default: '',
  },
  /**
   * @description 是否禁用
   * @en Whether to disable
   */
  disabled: Boolean,
  /**
   * @description 原生 name 属性
   * @en Native name attribute
   */
  name: {
    type: String,
    default: '',
  },
} as const

export type RadioButtonProps = ExtractPropTypes<typeof radioButtonProps>
