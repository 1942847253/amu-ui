import type { PropType, ExtractPropTypes } from 'vue'

export const sliderProps = {
  /**
   * @description 绑定值
   * @en Binding value
   */
  modelValue: {
    type: [Number, Array] as PropType<number | number[]>,
    default: 0
  },
  /**
   * @description 最小值
   * @en Minimum value
   */
  min: {
    type: Number,
    default: 0
  },
  /**
   * @description 最大值
   * @en Maximum value
   */
  max: {
    type: Number,
    default: 100
  },
  /**
   * @description 步长
   * @en Step size
   */
  step: {
    type: Number,
    default: 1
  },
  /**
   * @description 是否为范围选择
   * @en Whether to select a range
   */
  range: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否垂直模式
   * @en Whether vertical mode
   */
  vertical: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否禁用
   * @en Whether disabled
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否显示间断点
   * @en Whether to show stops
   */
  showStops: {
    type: Boolean,
    default: false
  },
  /**
   * @description 刻度标记
   * @en Marks
   */
  marks: {
    type: Object as PropType<Record<number, string>>,
    default: () => ({})
  },
  /**
   * @description 是否显示输入框
   * @en Whether to show input
   */
  showInput: {
    type: Boolean,
    default: false
  }
} as const

export const sliderEmits = {
  /**
   * @description 绑定值变化时触发
   * @en Triggers when the binding value changes
   */
  'update:modelValue': (val: number | number[]) => true,
  /**
   * @description 拖拽结束或点击轨道时触发
   * @en Triggers when dragging ends or the runway is clicked
   */
  change: (val: number | number[]) => true
}

export type SliderProps = ExtractPropTypes<typeof sliderProps>
export type SliderEmits = typeof sliderEmits
