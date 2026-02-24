import { type PropType, type ExtractPropTypes } from 'vue'

export type ProgressType = 'line' | 'circle' | 'dashboard'
export type ProgressStatus = 'success' | 'exception' | 'warning' | 'active' | 'normal'
export type ProgressStrokeLinecap = 'butt' | 'round' | 'square'

export interface ProgressColor {
  color: string
  percentage: number
}

export type ProgressColorType = string | ProgressColor[] | ((percentage: number) => string)

export type ProgressFormat = (percentage: number) => string

export const progressProps = {
  /**
   * @description 进度百分比 (0-100)
   * @en Percentage of progress (0-100)
   */
  percentage: {
    type: Number,
    default: 0,
    required: true,
    validator: (val: number) => val >= 0 && val <= 100
  },
  /**
   * @description 进度条类型
   * @en The type of progress bar
   * @values 'line', 'circle', 'dashboard'
   */
  type: {
    type: String as PropType<ProgressType>,
    default: 'line'
  },
  /**
   * @description 进度条状态
   * @en The status of progress bar
   * @values 'success', 'exception', 'warning', 'active', 'normal'
   */
  status: {
    type: String as PropType<ProgressStatus>,
    default: 'normal'
  },
  /**
   * @description 进度条宽度 (线条高度)
   * @en The width of progress bar (stroke width)
   */
  strokeWidth: {
    type: Number,
    default: 6
  },
  /**
   * @description 环形进度条画布宽度
   * @en The canvas width of circle progress bar
   */
  width: {
    type: Number,
    default: 126
  },
  /**
   * @description 进度条颜色，支持字符串、数组、函数
   * @en The color of progress bar, support string, array, function
   */
  color: {
    type: [String, Array, Function] as PropType<ProgressColorType>,
    default: ''
  },
  /**
   * @description 进度条底色
   * @en The background color of progress bar
   */
  trackColor: {
    type: String,
    default: ''
  },
  /**
   * @description 是否显示文字
   * @en Whether to show text
   */
  showText: {
    type: Boolean,
    default: true
  },
  /**
   * @description 文字显示格式化函数
   * @en Content format function
   */
  format: {
    type: Function as PropType<ProgressFormat>,
    default: (percentage: number) => `${percentage}%`
  },
  /**
   * @description 路径两端形状
   * @en The shape of the end of the path
   * @values 'butt', 'round', 'square'
   */
  strokeLinecap: {
    type: String as PropType<ProgressStrokeLinecap>,
    default: 'round'
  },
  /**
   * @description 是否开启流动动画 (仅 line 类型有效)
   * @en Whether to enable flow animation (only valid for line type)
   */
  indeterminate: {
    type: Boolean,
    default: false
  },
  /**
   * @description 动画时长 (秒)
   * @en Animation duration (seconds)
   */
  duration: {
    type: Number,
    default: 3
  },
  /**
   * @description 是否显示内部文字 (仅 line 类型且 height >= 12 时建议使用)
   * @en Whether to show text inside the progress bar
   */
  textInside: {
    type: Boolean,
    default: false
  }
} as const

export const progressEmits = {}

export const progressSlots = {
  /**
   * @description 自定义文字内容插槽
   * @en Custom text content slot
   */
  default: {},
}

export type ProgressProps = ExtractPropTypes<typeof progressProps>
