import type { PropType, StyleValue, ExtractPropTypes } from 'vue'

export const scrollbarProps = {
  /**
   * 滚动条组件的高度
   * @en Height of the scrollbar
   */
  height: {
    type: [String, Number] as PropType<string | number>,
    default: '',
  },
  /**
   * 滚动条组件的最大高度
   * @en Max height of the scrollbar
   */
  maxHeight: {
    type: [String, Number] as PropType<string | number>,
    default: '',
  },
  /**
   * 是否使用原生滚动条
   * @en Whether to use the native scrollbar
   */
  native: {
    type: Boolean,
    default: false,
  },
  /**
   * 包裹容器的自定义样式
   * @en Custom style for the wrap container
   */
  wrapStyle: {
    type: [String, Object, Array] as PropType<StyleValue>,
    default: '',
  },
  /**
   * 包裹容器的自定义类名
   * @en Custom class for the wrap container
   */
  wrapClass: {
    type: [String, Array] as PropType<string | string[]>,
    default: '',
  },
  /**
   * 视图容器的自定义样式
   * @en Custom style for the view container
   */
  viewStyle: {
    type: [String, Object, Array] as PropType<StyleValue>,
    default: '',
  },
  /**
   * 视图容器的自定义类名
   * @en Custom class for the view container
   */
  viewClass: {
    type: [String, Array] as PropType<string | string[]>,
    default: '',
  },
  /**
   * 是否不响应容器尺寸变化（如果为 true，容器尺寸变化时不会更新滚动条大小）
   * @en Whether to stop responding to container size changes
   */
  noresize: Boolean,
  /**
   * 视图的标签元素
   * @en Tag of the view element
   */
  tag: {
    type: String,
    default: 'div',
  },
  /**
   * 滚动条是否一直显示
   * @en Whether the scrollbar is always displayed
   */
  always: Boolean,
  /**
   * 滚动条滑块的最小尺寸
   * @en Minimum size of the scrollbar thumb
   */
  minSize: {
    type: Number,
    default: 20,
  },
} as const

export type ScrollbarProps = ExtractPropTypes<typeof scrollbarProps>

export const scrollbarEmits = {
  /**
   * 滚动时触发
   * @en Triggers when scrolling
   */
  scroll: ({ scrollTop, scrollLeft }: { scrollTop: number; scrollLeft: number }) =>
    typeof scrollTop === 'number' && typeof scrollLeft === 'number',
}
export type ScrollbarEmits = typeof scrollbarEmits
