import type { PropType, ExtractPropTypes, InjectionKey, Ref, Component } from 'vue'

export type TabsType = 'line' | 'card' | 'button' | 'editable-card'
export type TabsPosition = 'top' | 'bottom' | 'left' | 'right'
export type TabsSize = 'sm' | 'md' | 'lg'
export type TabsSurface = 'base' | 'elevated'

export const tabsProps = {
  /**
   * @description 绑定值 / 选中标签的 name
   * @en Active key of the tab
   */
  modelValue: {
    type: [String, Number] as PropType<string | number>
  },
  /**
   * @description 默认选中的标签 name
   * @en Default active key
   */
  defaultActiveKey: {
    type: [String, Number] as PropType<string | number>
  },
  /**
   * @description 选项卡风格类型
   * @en Type of the tab
   */
  type: {
    type: String as PropType<TabsType>,
    default: 'line'
  },
  /**
   * @description 选项卡位置
   * @en Position of the tab
   */
  position: {
    type: String as PropType<TabsPosition>,
    default: 'top'
  },
  /**
   * @description 尺寸
   * @en Size of the tab
   */
  size: {
    type: String as PropType<TabsSize>,
    default: 'md'
  },
  /**
   * @description 选项卡表面层级
   * @en Tabs surface level
   */
  surface: {
    type: String as PropType<TabsSurface>,
    default: 'base'
  },
  /**
   * @description 是否可关闭标签
   * @en Whether tabs can be closed
   */
  closable: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否可新增标签
   * @en Whether tabs can be added
   */
  addable: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否可编辑（同时支持新增和关闭）
   * @en Whether tabs can be edited
   */
  editable: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否可拖拽排序
   * @en Whether tabs can be dragged
   */
  draggable: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否启用切换动画
   * @en Whether to enable animation
   */
  animated: {
    type: Boolean,
    default: true
  },
  /**
   * @description 内容是否延迟渲染
   * @en Whether content is lazy loaded
   */
  lazy: {
    type: Boolean,
    default: false
  },
  /**
   * @description 隐藏时不销毁内容
   * @en Whether to destroy content when hidden
   */
  destroyOnHide: {
    type: Boolean,
    default: false
  },
  /**
   * @description 切换标签前的钩子，返回 false 或 Promise.reject 则阻止切换
   * @en Hook function before switching tabs
   */
  beforeLeave: {
    type: Function as PropType<(newKey: string | number, oldKey: string | number) => boolean | Promise<boolean>>
  },
  /**
   * @description 标签栏自定义类名
   * @en Custom class for tab bar
   */
  tabBarClass: {
    type: [String, Array, Object] as PropType<string | any[] | Record<string, any>>
  },
  /**
   * @description 标签栏右侧额外内容
   * @en Extra content slot
   */
  tabBarExtraContent: {
    type: [Object, String] as PropType<any> // Slot or string
  },
  /**
   * @description 标签之间的间距
   * @en Gutter between tabs
   */
  gutter: {
    type: Number,
    default: 0
  }
} as const

export const tabsEmits = {
  /**
   * @description 绑定值变化时触发
   * @en Triggers when the active key changes
   */
  'update:modelValue': (val: string | number) => true,
  /**
   * @description 切换标签时触发
   * @en Triggers when the tab changes
   */
  change: (val: string | number) => true,
  /**
   * @description 点击标签时触发
   * @en Triggers when the tab is clicked
   */
  tabClick: (val: string | number, e: Event) => true,
  /**
   * @description 点击新增/删除按钮时触发
   * @en Triggers when add or remove button is clicked
   */
  edit: (val: string | number | undefined, action: 'add' | 'remove') => true,
  /**
   * @description 点击新增按钮时触发
   * @en Triggers when the add button is clicked
   */
  tabAdd: () => true,
  /**
   * @description 点击关闭按钮时触发
   * @en Triggers when the remove button is clicked
   */
  tabRemove: (val: string | number) => true,
  /**
   * @description 拖拽排序结束时触发
   * @en Triggers when drag sorting ends
   */
  tabDragEnd: (oldIndex: number, newIndex: number) => true
}

export const tabPaneProps = {
  /**
   * @description 标签唯一标识
   * @en Unique key of the tab pane
   */
  // Note: Vue uses 'key' as a reserved prop, so we might need to rely on vnode key or a 'name' prop
  // In many libraries 'name' is used for the identifier.
  name: {
    type: [String, Number] as PropType<string | number>
  },
  /**
   * @description 标签标题
   * @en Title of the tab pane
   */
  title: {
    type: String,
    default: ''
  },
  /**
   * @description 是否禁用
   * @en Disabled state
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否可关闭（覆盖父级）
   * @en Closable state
   */
  closable: {
    type: Boolean,
    default: undefined
  },
  /**
   * @description 图标组件
   * @en Icon component or name
   */
  icon: {
    type: [String, Object] as PropType<string | Component>
  }
} as const

export const tabPaneSlots = {
    /**
     * @description 内容插槽
     * @en Content slot
     */
    default: (props: any) => {},
    /**
     * @description 自定义标题插槽
     * @en Custom title slot
     */
    title: (props: any) => {} // slot for custom title
}

export const tabsSlots = {
    /**
     * @description 默认插槽（TabPane）
     * @en Default slot
     */
    default: (props: any) => {},
    /**
     * @description 标签栏右侧额外内容
     * @en Extra content on the right of the tab bar
     */
    extra: (props: any) => {},
    /**
     * @description 自定义新增按钮图标
     * @en Custom add icon
     */
    addIcon: (props: any) => {},
    /**
     * @description 自定义关闭按钮图标（beta）
     * @en Custom close icon
     */
    closeIcon: (props: any) => {}
}

export type TabsProps = ExtractPropTypes<typeof tabsProps>
export type TabPaneProps = ExtractPropTypes<typeof tabPaneProps>

export interface TabsContext {
  activeKey: Ref<string | number | undefined>
  tabs: Ref<TabPaneContext[]>
  registerTab: (tab: TabPaneContext) => void
  unregisterTab: (name: string | number) => void
  onTabClick: (tab: TabPaneContext, e: Event) => void
  onTabRemove: (tab: TabPaneContext, e: Event) => void
}

export interface TabPaneContext {
  uid: number
  name: string | number
  props: TabPaneProps
  active: boolean
  slots: any
}

export const tabsInjectionKey: InjectionKey<TabsContext> = Symbol('amu-tabs')
