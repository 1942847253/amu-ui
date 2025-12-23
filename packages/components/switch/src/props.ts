import type { ExtractPropTypes, PropType } from 'vue'

export type SwitchSize = 'small' | 'medium' | 'large'

export const switchProps = {
  /**
   * input 元素的 name 属性
   * @en Name attribute of the input element
   */
  name: {
    type: String,
    default: ''
  },
  /**
   * 绑定值，是否选中
   * @en Binding value, whether checked
   */
  modelValue: {
    type: Boolean,
    default: false
  },
  /**
   * 是否禁用
   * @en Whether to disable
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * 是否处于加载中状态
   * @en Whether in loading state
   */
  loading: {
    type: Boolean,
    default: false
  },
  /**
   * 开关尺寸
   * @en Switch size
   */
  size: {
    type: String as PropType<SwitchSize>,
    default: 'medium'
  },
  /**
   * 打开时的文案
   * @en Text when checked
   */
  checkedText: {
    type: String,
    default: ''
  },
  /**
   * 关闭时的文案
   * @en Text when unchecked
   */
  uncheckedText: {
    type: String,
    default: ''
  },
  /**
   * 打开时的背景色
   * @en Background color when checked
   */
  checkedColor: {
    type: String,
    default: ''
  },
  /**
   * 关闭时的背景色
   * @en Background color when unchecked
   */
  uncheckedColor: {
    type: String,
    default: ''
  },
  /**
   * 状态改变前的钩子，返回 false 或返回 Promise 且被 reject 则停止切换
   * @en Hook before state change, stop switching if returns false or returns Promise and is rejected
   */
  beforeChange: {
    type: Function as PropType<() => Promise<boolean | void> | boolean | void>,
    default: undefined
  }
} as const

export const switchEmits = {
  'update:modelValue': (value: boolean) => true,
  change: (value: boolean) => true
}

export type SwitchProps = ExtractPropTypes<typeof switchProps>
export type SwitchEmits = typeof switchEmits
