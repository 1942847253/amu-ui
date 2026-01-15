import type { PropType, ExtractPropTypes } from 'vue'

export const inputNumberProps = {
  /**
   * @description 绑定值
   * @en Binding value
   */
  modelValue: {
    type: Number,
    default: undefined,
  },
  /**
   * @description 设置计数器允许的最小值
   * @en The minimum allowed value
   */
  min: {
    type: Number,
    default: -Infinity,
  },
  /**
   * @description 设置计数器允许的最大值
   * @en The maximum allowed value
   */
  max: {
    type: Number,
    default: Infinity,
  },
  /**
   * @description 计数器步长
   * @en The step increment of the controls
   */
  step: {
    type: Number,
    default: 1,
  },
  /**
   * @description 是否只能输入 step 的倍数
   * @en Whether input value must be a multiple of step
   */
  stepStrictly: {
    type: Boolean,
    default: false
  },
  /**
   * @description 数值精度
   * @en Precision of input value
   */
  precision: {
    type: Number,
    validator: (val: number) => val >= 0 && val === parseInt(`${val}`, 10),
  },
  /**
   * @description 是否禁用计数器
   * @en Whether the component is disabled
   */
  disabled: Boolean,
  /**
   * @description 是否只读
   * @en Whether the component is read-only
   */
  readonly: Boolean,
  /**
   * @description 是否允许空值
   * @en Whether to allow empty value
   */
  allowEmpty: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否使用控制按钮
   * @en Whether to enable the control buttons
   */
  controls: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 控制按钮位置
   * @en Position of the control buttons
   */
  controlsPosition: {
    type: String,
    default: '', // 'right' or empty
    values: ['', 'right'],
  },
  /**
   * @description 计数器尺寸
   * @en Size of the component
   */
  size: {
    type: String,
    values: ['small', 'medium', 'large'],
    default: undefined,
  },
  /**
   * @description 验证状态
   * @en Validation status
   */
  status: {
    type: String,
    values: ['', 'error', 'warning', 'success'],
    default: '',
  },
  /**
   * @description 输入框占位文本
   * @en Placeholder text
   */
  placeholder: String,
  /**
   * @description 原生 name 属性
   * @en Native name attribute
   */
  name: String,
  /**
   * @description 关联的 label 文本
   * @en Label text
   */
  label: String,
  /**
   * @description 原生 id 属性
   * @en Native id attribute
   */
  id: String,
  /**
   * @description 格式化显示值
   * @en Format the display value
   */
  formatter: Function,
  /**
   * @description 指定从格式化值解析为数值的方法
   * @en Specify how to parse the number from the formatted value
   */
  parser: Function,
  /**
   * @description 是否触发表单验证
   * @en Whether to trigger form validation
   */
  validateEvent: {
    type: Boolean,
    default: true,
  },
} as const

export const inputNumberEmits = {
  'update:modelValue': (value: number | undefined) => true,
  'change': (cur: number | undefined, prev: number | undefined) => true,
  'blur': (e: FocusEvent) => true,
  'focus': (e: FocusEvent) => true,
  'input': (val: number | undefined) => true,
}
