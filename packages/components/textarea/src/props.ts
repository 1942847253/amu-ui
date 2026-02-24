import type { PropType, ExtractPropTypes } from 'vue'

export interface TextareaAutosize {
  minRows?: number
  maxRows?: number
}

export const textareaProps = {
  /**
   * @description 绑定值
   * @en Binding value
   */
  modelValue: {
    type: String,
    default: ''
  },
  /**
   * @description 行数
   * @en Rows count
   */
  rows: {
    type: Number,
    default: 2
  },
  /**
   * @description 自适应高度，为 true 时自适应，为对象时可指定 minRows 和 maxRows
   * @en Auto height, when true it matches content height, can be object specifying minRows and maxRows
   */
  autosize: {
    type: [Boolean, Object, String] as PropType<boolean | TextareaAutosize | string>,
    default: false
  },
  /**
   * @description 最大输入长度
   * @en Max length
   */
  maxlength: {
    type: Number,
    default: undefined
  },
  /**
   * @description 是否显示字数统计
   * @en Whether to show word count
   */
  showWordLimit: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否禁用
   * @en Disabled state
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否只读
   * @en Readonly state
   */
  readonly: {
    type: Boolean,
    default: false
  },
  /**
   * @description 占位文本
   * @en Placeholder
   */
  placeholder: {
    type: String,
    default: ''
  },
  /**
   * @description 尺寸
   * @en Size
   */
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: 'medium'
  },
  /**
   * @description 风格变体
   * @en Variant
   */
  variant: {
    type: String as PropType<'outline' | 'filled'>,
    default: 'outline'
  },
  /**
   * @description 状态
   * @en Status
   */
  status: {
    type: String as PropType<'normal' | 'error' | 'warning' | 'success'>,
    default: 'normal'
  },
  /**
   * @description 原生 id 属性
   * @en Native id attribute
   */
  id: {
    type: String,
    default: undefined
  },
  /**
   * @description 原生 name 属性
   * @en Native name attribute
   */
  name: {
    type: String,
    default: undefined
  },
  /**
   * @description 原生 form 属性
   * @en Native form attribute
   */
  form: {
    type: String,
    default: undefined
  },
  /**
   * @description 缩放控制
   * @en Resize control
   */
  resize: {
    type: String as PropType<'none' | 'both' | 'horizontal' | 'vertical'>,
    default: 'vertical'
  }
} as const

export type TextareaProps = ExtractPropTypes<typeof textareaProps>

export const textareaEmits = {
  /**
   * @description 绑定值更新
   * @en Binding value update
   */
  'update:modelValue': (value: string) => true,
  /**
   * @description 仅在输入框失去焦点或用户按下回车时触发
   * @en Triggers only when the input box loses focus or the user presses Enter
   */
  change: (value: string) => true,
  /**
   * @description 在 Input 值改变时触发
   * @en Triggers when the Input value changes
   */
  input: (value: string) => true,
  /**
   * @description 在 Input 获得焦点时触发
   * @en Triggers when the Input obtains focus
   */
  focus: (e: FocusEvent) => true,
  /**
   * @description 在 Input 失去焦点时触发
   * @en Triggers when the Input loses focus
   */
  blur: (e: FocusEvent) => true
}

export const textareaSlots = {
  /**
   * @description 前缀插槽
   * @en Prefix slot
   */
  prefix: {},
  /**
   * @description 后缀插槽
   * @en Suffix slot
   */
  suffix: {},
}

export type TextareaEmits = typeof textareaEmits
