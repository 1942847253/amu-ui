import type { PropType } from 'vue'

/**
 * Layout 组件的 Props
 * Layout component props
 * @en Layout component props
 */
export const layoutProps = {
  /**
   * 布局方向，horizontal 为水平布局，vertical 为垂直布局
   * @en Layout direction, horizontal for horizontal layout, vertical for vertical layout
   */
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: undefined
  },
  /**
   * 是否有侧边栏（用于自动判断布局方向）
   * @en Whether has sider (used to auto-detect layout direction)
   */
  hasSider: {
    type: Boolean,
    default: false
  }
}

/**
 * Header 组件的 Props
 * Header component props
 * @en Header component props
 */
export const headerProps = {
  /**
   * 高度
   * @en Height
   */
  height: {
    type: [String, Number],
    default: undefined
  }
}

/**
 * Sider 组件的 Props
 * Sider component props
 * @en Sider component props
 */
export const siderProps = {
  /**
   * 宽度（未折叠时）
   * @en Width (when not collapsed)
   */
  width: {
    type: [String, Number],
    default: 200
  },
  /**
   * 折叠后的宽度
   * @en Width when collapsed
   */
  collapsedWidth: {
    type: [String, Number],
    default: 80
  },
  /**
   * 是否折叠
   * @en Whether collapsed
   */
  collapsed: {
    type: Boolean,
    default: false
  },
  /**
   * 侧边栏位置
   * @en Sider position
   */
  position: {
    type: String as PropType<'left' | 'right'>,
    default: 'left'
  }
}

/**
 * Sider 组件的 Emits
 * Sider component emits
 * @en Sider component emits
 */
export const siderEmits = {}

/**
 * Content 组件的 Props
 * Content component props
 * @en Content component props
 */
export const contentProps = {}

/**
 * Footer 组件的 Props
 * Footer component props
 * @en Footer component props
 */
export const footerProps = {
  /**
   * 高度
   * @en Height
   */
  height: {
    type: [String, Number],
    default: undefined
  }
}

export type LayoutProps = Readonly<typeof layoutProps>
export type HeaderProps = Readonly<typeof headerProps>
export type SiderProps = Readonly<typeof siderProps>
export type SiderEmits = typeof siderEmits
export type ContentProps = Readonly<typeof contentProps>
export type FooterProps = Readonly<typeof footerProps>
