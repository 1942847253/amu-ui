import type { ExtractPropTypes, PropType, CSSProperties } from 'vue'
import type { Breakpoint } from '@amu-ui/utils'

export type DescriptionsSize = 'large' | 'default' | 'small'
export type DescriptionsDirection = 'horizontal' | 'vertical'
export type DescriptionsAlign = 'left' | 'center' | 'right'
export type DescriptionsColumn = number | Partial<Record<Breakpoint, number>>

export const descriptionsProps = {
  /**
   * @description 是否显示边框
   * @en Whether to show border
   */
  border: {
    type: Boolean,
    default: false
  },
  /**
   * @description 一行 Descriptions Item 的数量，支持响应式对象
   * @en The number of Descriptions Item in one line, supports responsive object
   */
  column: {
    type: [Number, Object] as PropType<DescriptionsColumn>,
    default: 3
  },
  /**
   * @description 排列方向
   * @en Direction of arrangement
   */
  direction: {
    type: String as PropType<DescriptionsDirection>,
    default: 'horizontal'
  },
  /**
   * @description 列表的尺寸
   * @en Size of the list
   */
  size: {
    type: String as PropType<DescriptionsSize>,
    default: 'default'
  },
  /**
   * @description 标题
   * @en Title
   */
  title: {
    type: String,
    default: ''
  },
  /**
   * @description 操作区域
   * @en Extra operation area
   */
  extra: {
    type: String,
    default: ''
  },
  /**
   * @description 是否在标签后显示冒号
   * @en Whether to show colon after label
   */
  colon: {
    type: Boolean,
    default: false
  },
  /**
   * @description 标签宽度
   * @en Label width
   */
  labelWidth: {
    type: [String, Number] as PropType<string | number>,
    default: ''
  },
  /**
   * @description 标签对齐方式
   * @en Label alignment
   */
  labelAlign: {
    type: String as PropType<DescriptionsAlign>,
    default: ''
  },
  /**
   * @description 内容对齐方式
   * @en Content alignment
   */
  contentAlign: {
    type: String as PropType<DescriptionsAlign>,
    default: 'left'
  },
  /**
   * @description 自定义标签样式
   * @en Custom label style
   */
  labelStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => ({})
  },
  /**
   * @description 自定义内容样式
   * @en Custom content style
   */
  contentStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => ({})
  }
} as const

export const descriptionsItemProps = {
  /**
   * @description 内容描述
   * @en Label text
   */
  label: {
    type: String,
    default: ''
  },
  /**
   * @description 列占位数量
   * @en The number of columns occupied
   */
  span: {
    type: Number,
    default: 1
  },
  /**
   * @description 列宽度
   * @en Column width
   */
  width: {
    type: [String, Number] as PropType<string | number>,
    default: ''
  },
  /**
   * @description 列最小宽度
   * @en Column min width
   */
  minWidth: {
    type: [String, Number] as PropType<string | number>,
    default: ''
  },
  /**
   * @description 内容对齐方式
   * @en Content alignment
   */
  align: {
    type: String as PropType<DescriptionsAlign>,
    default: 'left'
  },
  /**
   * @description 标签对齐方式
   * @en Label alignment
   */
  labelAlign: {
    type: String as PropType<DescriptionsAlign>,
    default: ''
  },
  /**
   * @description 自定义内容类名
   * @en Custom content class name
   */
  className: {
    type: String,
    default: ''
  },
  /**
   * @description 自定义标签类名
   * @en Custom label class name
   */
  labelClassName: {
    type: String,
    default: ''
  },
  /**
   * @description 自定义标签样式
   * @en Custom label style
   */
  labelStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => ({})
  },
  /**
   * @description 自定义内容样式
   * @en Custom content style
   */
  contentStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => ({})
  }
} as const

export const descriptionsEmits = {}
export const descriptionsItemEmits = {}
export const descriptionsSlots = {
  /**
   * @description 默认插槽
   * @en Default slot
   */
  default: {},
  /**
   * @description 标题插槽
   * @en Title slot
   */
  title: {},
  /**
   * @description 额外操作区插槽
   * @en Extra slot
   */
  extra: {},
}
export const descriptionsItemSlots = {
  /**
   * @description 默认插槽
   * @en Default slot
   */
  default: {},
  /**
   * @description 标签插槽
   * @en Label slot
   */
  label: {},
}

export type DescriptionsProps = ExtractPropTypes<typeof descriptionsProps>
export type DescriptionsItemProps = ExtractPropTypes<typeof descriptionsItemProps>
