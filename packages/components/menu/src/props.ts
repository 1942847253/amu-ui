import type { PropType, ExtractPropTypes, InjectionKey, Ref, ComputedRef } from 'vue'

// Avoid introducing dependency on vue-router for types only
type RouteLocationRaw = string | Record<string, any>

export type MenuMode = 'vertical' | 'horizontal' | 'inline'
export type MenuTheme = 'light' | 'dark'
export type MenuTrigger = 'hover' | 'click'

export const menuProps = {
  /**
   * @description 菜单模式
   * @en Menu mode
   */
  mode: {
    type: String as PropType<MenuMode>,
    default: 'vertical'
  },
  /**
   * @description 主题色
   * @en Theme color
   */
  theme: {
    type: String as PropType<MenuTheme>,
    default: 'light'
  },
  /**
   * @description 是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）
   * @en Whether the menu is collapsed (inline mode only)
   */
  collapsed: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否开启手风琴模式
   * @en Whether to enable accordion mode
   */
  accordion: {
    type: Boolean,
    default: false
  },
  /**
   * @description 当前选中的菜单项 key 数组
   * @en Currently selected keys (controlled)
   */
  selectedKeys: {
    type: Array as PropType<string[]>,
    default: undefined
  },
  /**
   * @description 初始选中的菜单项 key (alias for defaultSelectedKeys)
   * @en Initial selected key (alias for defaultSelectedKeys)
   */
  defaultValue: {
    type: [String, Number, Array] as PropType<string | number | string[]>,
    default: undefined
  },
  /**
   * @description 当前展开的 SubMenu 数组
   * @en Currently open keys (controlled)
   */
  openKeys: {
    type: Array as PropType<string[]>,
    default: undefined
  },
  /**
   * @description 初始选中的菜单项 key 数组
   * @en Default selected keys
   */
  defaultSelectedKeys: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  /**
   * @description 初始展开的 SubMenu 数组
   * @en Default open keys
   */
  defaultOpenKeys: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  /**
   * @description SubMenu 展开/关闭的触发方式
   * @en SubMenu trigger mode
   */
  trigger: {
    type: String as PropType<MenuTrigger>,
    default: 'hover'
  },
  /**
   * @description 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
   * @en Whether to enable vue-router integration
   */
  router: {
    type: Boolean,
    default: false
  },
  /**
   * @description 菜单的唯一标识
   * @en Unique key of the menu (optional)
   */
  id: String,
  /**
   * @description 是否显示折叠按钮（仅在 vertical 模式下有效）
   * @en Whether to show the collapse button (vertical mode only)
   */
  showCollapseButton: {
    type: Boolean,
    default: false
  }
} as const

export const menuItemProps = {
  /**
   * @description 唯一标志
   * @en Unique index of the menu item
   */
  index: {
    type: String,
    required: true
  },
  /**
   * @description 是否禁用
   * @en Whether the item is disabled
   */
  disabled: Boolean,
  /**
   * @description Vue Router 对象
   * @en Vue Router object
   */
  route: {
    type: [String, Object] as PropType<RouteLocationRaw>,
    default: null
  }
} as const

export const subMenuProps = {
  /**
   * @description 唯一标志
   * @en Unique index of the sub-menu
   */
  index: {
    type: String,
    required: true
  },
  /**
   * @description 是否禁用
   * @en Whether the sub-menu is disabled
   */
  disabled: Boolean,
  /**
   * @description 子菜单标题
   * @en Title of the sub-menu
   */
  title: String
} as const

export const menuGroupProps = {
  /**
   * @description 分组标题
   * @en Group title
   */
  title: String
} as const

export const menuEmits = {
  /**
   * @description 选中项发生改变时触发
   * @en Triggered when selected items change
   */
  'update:selectedKeys': (keys: string[]) => true,
  /**
   * @description 展开项发生改变时触发
   * @en Triggered when open items change
   */
  'update:openKeys': (keys: string[]) => true,
  /**
   * @description 折叠状态改变时触发
   * @en Triggered when collapsed state changes
   */
  'update:collapsed': (collapsed: boolean) => true,
  /**
   * @description 菜单项被选中时触发
   * @en Triggered when a menu item is selected
   */
  select: (key: string, indexPath: string[]) => true,
  /**
   * @description 展开的 SubMenu 改变时触发
   * @en Triggered when opened SubMenus change
   */
  openChange: (key: string, openKeys: string[]) => true,
  /**
   * @description SubMenu 关闭时触发
   * @en Triggered when a SubMenu closes
   */
  close: (key: string, indexPath: string[]) => true,
  /**
   * @description SubMenu 展开时触发
   * @en Triggered when a SubMenu opens
   */
  open: (key: string, indexPath: string[]) => true
}

export const menuItemEmits = {
  /**
   * @description 点击菜单项时触发
   * @en Triggered when the menu item is clicked
   */
  click: (item: any) => true
}

export const subMenuEmits = {
  /**
   * @description 点击子菜单标题时触发
   * @en Triggered when the sub-menu title is clicked
   */
  click: (item: any) => true // mainly for title click
}

export const menuSlots = {
  /**
   * @description 菜单默认内容
   * @en Default content of the menu
   */
  default: {},
  /**
   * @description 菜单 Logo 区域（仅侧边栏模式）
   * @en Logo area of the menu (sidebar mode only)
   */
  logo: {},
  /**
   * @description 菜单底部操作区域（仅侧边栏模式）
   * @en Operations area at the bottom of the menu (sidebar mode only)
   */
  operations: {}
} as const

export const subMenuSlots = {
  /**
   * @description 子菜单默认内容
   * @en Default content of the sub-menu
   */
  default: {},
  /**
   * @description 子菜单标题插槽
   * @en Custom title slot for sub-menu
   */
  title: {},
  /**
   * @description 子菜单图标插槽
   * @en Icon slot for sub-menu
   */
  icon: {}
} as const

export const menuItemSlots = {
  /**
   * @description 菜单项默认内容
   * @en Default content of the menu item
   */
  default: {},
  /**
   * @description 菜单项图标插槽
   * @en Icon slot for menu item
   */
  icon: {}
} as const
