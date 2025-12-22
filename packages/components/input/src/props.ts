import type { PropType, ExtractPropTypes } from 'vue'

export type InputSize = 'small' | 'medium' | 'large'
export type InputStatus = 'error' | 'warning' | 'success' | 'normal'
export type InputAlign = 'left' | 'center' | 'right'

export const inputProps = {
  /**
   * @description 绑定值
   * @en Binding value
   */
  modelValue: {
    type: [String, Number] as PropType<string | number>,
    default: ''
  },
  /**
   * @description 输入框类型，同原生 input type
   * @en Input type, same as native input type
   */
  type: {
    type: String,
    default: 'text'
  },
  /**
   * @description 输入框尺寸
   * @en Input size
   */
  size: {
    type: String as PropType<InputSize>,
    default: 'medium'
  },
  /**
   * @description 输入框风格变体
   * @en Input variant style
   */
  variant: {
    type: String as PropType<'outline' | 'filled'>,
    default: 'outline'
  },
  /**
   * @description 是否禁用
   * @en Whether the input is disabled
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否只读
   * @en Whether the input is read-only
   */
  readonly: {
    type: Boolean,
    default: false
  },
  /**
   * @description 占位文本
   * @en Placeholder text
   */
  placeholder: {
    type: String,
    default: undefined
  },
  /**
   * @description 是否显示清空按钮
   * @en Whether to show clear button
   */
  clearable: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否显示密码显隐按钮
   * @en Whether to show password toggle button
   */
  showPassword: {
    type: Boolean,
    default: false
  },
  /**
   * @description 文本对齐方式
   * @en Text alignment
   */
  align: {
    type: String as PropType<InputAlign>,
    default: 'left'
  },
  /**
   * @description 宽度是否随内容自适应
   * @en Whether width adapts to content
   */
  autoWidth: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否无边框
   * @en Whether to remove border
   */
  borderless: {
    type: Boolean,
    default: false
  },
  /**
   * @description 原生 maxlength 属性
   * @en Native maxlength attribute
   */
  maxlength: {
    type: [Number, String] as PropType<number | string>
  },
  /**
   * @description 最大字符数（中文算 2 字符）
   * @en Maximum character count (Chinese counts as 2)
   */
  maxcharacter: {
    type: [Number, String] as PropType<number | string>
  },
  /**
   * @description 是否允许超出限制后继续输入
   * @en Whether to allow input when limit is exceeded
   */
  allowInputOverMax: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否显示字数统计
   * @en Whether to show word limit count
   */
  showLimitNumber: {
    type: Boolean,
    default: false
  },
  /**
   * @description 校验状态
   * @en Validation status
   */
  status: {
    type: String as PropType<InputStatus>,
    default: 'normal'
  },
  /**
   * @description 显示值的格式化函数
   * @en Format function for display value
   */
  formatter: {
    type: Function as PropType<(value: string) => string>
  },
  /**
   * @description 模型值的解析函数
   * @en Parse function for model value
   */
  parser: {
    type: Function as PropType<(value: string) => string>
  },
  /**
   * @description 是否在失焦时触发格式化
   * @en Whether to trigger format on blur
   */
  formatOnBlur: {
    type: Boolean,
    default: true
  }
} as const

export type InputProps = ExtractPropTypes<typeof inputProps>

export const inputEmits = {
  /**
   * @description 值改变时触发
   * @en Triggered when value changes
   */
  'update:modelValue': (value: string | number) => true,
  /**
   * @description 输入框值改变时触发
   * @en Triggered when input value changes
   */
  input: (value: string) => true,
  /**
   * @description 输入框失焦或回车时触发
   * @en Triggered when input loses focus or enter is pressed
   */
  change: (value: string) => true,
  /**
   * @description 输入框获得焦点时触发
   * @en Triggered when input gets focus
   */
  focus: (evt: FocusEvent) => true,
  /**
   * @description 输入框失去焦点时触发
   * @en Triggered when input loses focus
   */
  blur: (evt: FocusEvent) => true,
  /**
   * @description 点击清空按钮时触发
   * @en Triggered when clear button is clicked
   */
  clear: () => true,
  /**
   * @description 按下回车键时触发
   * @en Triggered when enter key is pressed
   */
  enter: (evt: KeyboardEvent) => true
}

export const inputSlots = {
  /**
   * @description 前缀内容
   * @en Prefix content
   */
  prefix: {},
  /**
   * @description 后缀内容
   * @en Suffix content
   */
  suffix: {},
  /**
   * @description 前置内容
   * @en Prepend content
   */
  prepend: {},
  /**
   * @description 后置内容
   * @en Append content
   */
  append: {}
}

export type InputEmits = typeof inputEmits
