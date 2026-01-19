import type { CSSProperties, ExtractPropTypes, PropType } from 'vue'
import type { CardSize, CardShadow } from './types'

export const cardProps = {
  /**
   * @description 卡片标题
   * @en Card title
   */
  title: {
    type: String,
  },
  /**
   * @description 卡片尺寸，可选值：'default', 'small'
   * @en Card size, optional values: 'default', 'small'
   */
  size: {
    type: String as PropType<CardSize>,
    default: 'default',
  },
  /**
   * @description 是否有边框
   * @en Whether to show border
   */
  bordered: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 阴影显示时机，可选值：'always', 'hover', 'never'
   * @en Shadow display timing, optional values: 'always', 'hover', 'never'
   */
  shadow: {
    type: String as PropType<CardShadow>,
    default: 'always',
  },
  /**
   * @description 卡片是否可悬浮
   * @en Whether the card is hoverable
   */
  hoverable: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 当卡片处于加载状态时显示占位图
   * @en Shows a placeholder when the card is in the loading state
   */
  loading: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 自定义标题区域样式
   * @en Custom title area style
   */
  headStyle: {
    type: Object as PropType<CSSProperties>,
  },
  /**
   * @description 自定义内容区域样式
   * @en Custom content area style
   */
  bodyStyle: {
    type: Object as PropType<CSSProperties>,
  },
  /**
   * @description 是否可折叠，仅在有 header 时有效
   * @en Whether to be collapsible, only valid when header exists
   */
  collapsible: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否默认折叠（v-model）
   * @en Whether default collapsed (v-model)
   */
  collapsed: {
    type: Boolean,
    default: undefined,
  },
  /**
   * @description 是否支持全屏最大化
   * @en Whether to support full screen maximization
   */
  maximizable: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否支持关闭
   * @en Whether to support closing
   */
  closable: {
    type: Boolean,
    default: false,
  },
} as const

export const cardEmits = {
  /**
   * @description 折叠状态改变时触发
   * @en Triggered when collapse state changes
   */
  'update:collapsed': (value: boolean) => typeof value === 'boolean',
  /**
   * @description 点击关闭按钮时触发
   * @en Triggered when the close button is clicked
   */
  close: () => true,
  /**
   * @description 点击最大化按钮时触发
   * @en Triggered when the maximize button is clicked
   */
  maximize: (value: boolean) => typeof value === 'boolean',
}

export const cardTabsProps = {
  // Tabs integration can be complex, usually passed as slot or separate component
}

export type CardProps = ExtractPropTypes<typeof cardProps>

// CardGrid Props
export const cardGridProps = {
  /**
   * @description 是否鼠标悬停提升
   * @en Whether to lift on hover
   */
  hoverable: {
    type: Boolean,
    default: true,
  },
} as const
export type CardGridProps = ExtractPropTypes<typeof cardGridProps>

// CardMeta Props
export const cardMetaProps = {
  /**
   * @description 标题
   * @en Title
   */
  title: String,
  /**
   * @description 描述
   * @en Description
   */
  description: String,
} as const
export type CardMetaProps = ExtractPropTypes<typeof cardMetaProps>

// Important: Export empty emits/slots for API generator if not used, or real ones
export const cardGridEmits = {}
export const cardGridSlots = {}
export const cardMetaEmits = {}
export const cardMetaSlots = {}

export const cardSlots = {
  /**
   * @description 卡片内容
   * @en Card content
   */
  default: () => true,
  /**
   * @description 自定义标题区域
   * @en Custom title area
   */
  header: () => true,
  /**
   * @description 卡片底部
   * @en Card footer
   */
  footer: () => true,
  /**
   * @description 头部右侧额外操作区
   * @en Extra operation area on the right side of the header
   */
  extra: () => true,
  /**
   * @description 封面图
   * @en Cover image
   */
  cover: () => true,
  /**
   * @description 底部操作按钮区
   * @en Action button area at the bottom
   */
  actions: () => true,
}
