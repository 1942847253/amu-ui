import type { ExtractPropTypes, PropType, Component } from 'vue'

export interface BreadcrumbRoute {
  path?: string // For manual navigation
  to?: string | Record<string, any> // For vue-router
  title: string
  icon?: Component | string
  disabled?: boolean
  clickable?: boolean
  children?: BreadcrumbRoute[] // For dropdown
  // Enterprise features
  meta?: Record<string, any>
}

export const breadcrumbProps = {
  /**
   * @description 分隔符
   * @en Separator
   */
  separator: {
    type: String,
    default: '/',
  },
  /**
   * @description 分隔符图标
   * @en Separator icon
   */
  separatorIcon: {
    type: [Object, String] as PropType<String | Component>,
  },
  /**
   * @description 路由数组（配置模式）
   * @en Routes array (configuration mode)
   */
  routes: {
    type: Array as PropType<BreadcrumbRoute[]>,
    default: () => [],
  },
  /**
   * @description 最大显示数量，超过折叠
   * @en Maximum number of items to show, collapse if exceeded
   */
  maxItems: {
    type: Number,
    default: 0, // 0 means no limit
  },
} as const

export type BreadcrumbProps = ExtractPropTypes<typeof breadcrumbProps>

export const breadcrumbItemProps = {
  /**
   * @description 路由跳转对象
   * @en Target route of the link
   */
  to: {
    type: [String, Object] as PropType<string | Record<string, any>>,
  },
  /**
   * @description 在使用 to 进行路由跳转时，启用 replace 将不会向 history 添加新记录
   * @en If true, the navigation will not leave a history record
   */
  replace: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 如果设置，将渲染为带下拉菜单的项
   * @en If set, renders as an item with a dropdown menu
   */
  routes: {
    type: Array as PropType<BreadcrumbRoute[]>,
  },
} as const

export type BreadcrumbItemProps = ExtractPropTypes<typeof breadcrumbItemProps>

export const breadcrumbEmits = {}
export const breadcrumbItemEmits = {
  /**
   * @description 点击事件
   * @en Click event
   */
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
}
export const breadcrumbSlots = {
  /**
   * @description 自定义默认内容
   * @en Custom default content
   */
  default: () => true,
}
export const breadcrumbItemSlots = {
  /**
   * @description 自定义默认内容
   * @en Custom default content
   */
  default: () => true,
  /**
   * @description 自定义图标内容
   * @en Custom icon content
   */
  icon: () => true,
}
