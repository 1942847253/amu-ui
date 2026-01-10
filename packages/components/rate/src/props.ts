import type { ExtractPropTypes, PropType, Component } from 'vue'

export const rateProps = {
  /**
   * @description 绑定值
   * @en binding value
   */
  modelValue: {
    type: Number,
    default: 0,
  },
  /**
   * @description 最大分值
   * @en max rating score
   */
  max: {
    type: Number,
    default: 5,
  },
  /**
   * @description 是否允许半选
   * @en whether to allow semi selection
   */
  allowHalf: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 步长。默认为 1。如果 allowHalf 为 true，此项被忽略（或视为 0.5）
   * @en step size. Default is 1. If allowHalf is true, this is ignored (or treated as 0.5)
   */
  step: {
    type: Number,
    default: 1,
  },
  /**
   * @description 是否允许重置值为 0
   * @en whether to allow resetting value to 0
   */
  allowClear: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 是否只读
   * @en whether read-only
   */
  readonly: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否禁用
   * @en whether disabled
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否显示辅助文字
   * @en whether to display texts
   */
  showText: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否显示当前分数。show-score 和 show-text 不能同时为 true
   * @en whether to display current score. show-score and show-text cannot be true at the same time
   */
  showScore: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 辅助文字的颜色
   * @en color of text
   */
  textColor: {
    type: String,
  },
  /**
   * @description 辅助文字数组
   * @en text array
   */
  texts: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  /**
   * @description 分数显示模板
   * @en score template
   */
  scoreTemplate: {
    type: String,
    default: '{value}',
  },
  /**
   * @description 自定义图标组件。可以是对象映射或数组
   * @en custom icons. Can be an object mapping or array
   */
  icons: {
    type: [Object, Array] as PropType<Record<number, Component> | Component[]>,
  },
  /**
   * @description 未选中时的图标组件
   * @en void icon
   */
  voidIcon: {
    type: [String, Object] as PropType<string | Component>,
  },
  /**
   * @description 禁用状态下的未选中图标组件
   * @en disabled void icon
   */
  disabledVoidIcon: {
    type: [String, Object] as PropType<string | Component>,
  },
  /**
   * @description 自定义颜色。可以是对象映射或数组
   * @en custom colors. Can be an object mapping or array
   */
  colors: {
    type: [Object, Array] as PropType<Record<number, string> | string[]>,
  },
  /**
   * @description 未选中时的颜色
   * @en void color
   */
  voidColor: {
    type: String,
  },
  /**
   * @description 禁用状态下的未选中颜色
   * @en disabled void color
   */
  disabledVoidColor: {
    type: String,
  },
  /**
   * @description 组件尺寸
   * @en custom size of component.
   */
  size: {
    type: String as PropType<'sm' | 'md' | 'lg'>,
    default: 'md',
  },
  /**
   * @description 组件 id
   * @en custom id
   */
  id: {
    type: String,
  },
  /**
   * @description 无障碍标签
   * @en accessible label
   */
  label: {
    type: String,
  },
} as const

export const rateEmits = {
  'update:modelValue': (value: number) => typeof value === 'number',
  change: (value: number) => typeof value === 'number',
}

export type RateProps = ExtractPropTypes<typeof rateProps>
export type RateEmits = typeof rateEmits
