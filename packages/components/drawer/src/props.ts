import type { ExtractPropTypes, PropType, CSSProperties } from 'vue'

export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom'

export const drawerProps = {
  /**
   * @description 是否显示 Drawer
   * @en Whether to show the Drawer.
   */
  modelValue: {
    type: Boolean,
    default: false,
  },
  /**
   * @description Drawer 的标题
   * @en Title of the Drawer.
   */
  title: String,
  /**
   * @description Drawer 打开的方向
   * @en Placement of the Drawer.
   * @values 'left' | 'right' | 'top' | 'bottom'
   */
  placement: {
    type: String as PropType<DrawerPlacement>,
    default: 'right',
  },
  /**
   * @description Drawer 的尺寸。可以是数字（px）或字符串（如 '30%', '500px'）。
   * @en Size of the Drawer. Can be number (px) or string (e.g. '30%', '500px').
   */
  size: {
    type: [Number, String] as PropType<number | string>,
    default: '30%',
  },
  /**
   * @description 允许调整的最小尺寸
   * @en Min size allowed when resizing.
   */
  minSize: {
    type: Number,
  },
  /**
   * @description 允许调整的最大尺寸
   * @en Max size allowed when resizing.
   */
  maxSize: {
    type: Number,
  },
  /**
   * @description 是否允许拖拽调整尺寸
   * @en Whether the Drawer is resizable.
   */
  resizable: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 内容区域是否可滚动
   * @en Whether the Drawer body is scrollable.
   */
  bodyScrollable: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否为模态层（显示遮罩）
   * @en Whether to show modal mask.
   */
  modal: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 是否显示遮罩
   * @en Whether to show mask.
   */
  mask: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 点击遮罩是否关闭 Drawer
   * @en Whether to close the drawer when mask is clicked.
   */
  maskClosable: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 按下 ESC 键是否关闭 Drawer
   * @en Whether to close the drawer when ESC is pressed.
   */
  closeOnEsc: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 头部是否可拖拽（暂未实现）
   * @en Whether the Drawer (Header) is draggable (Not implemented in current version, reserved).
   */
  draggable: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 关闭前的回调，返回 false 或 Promise<false> 可阻止关闭
   * @en Callback triggered before close. Returning false or Promise<false> will cancel close.
   */
  beforeClose: {
    type: Function as PropType<() => boolean | Promise<boolean>>,
  },
  /**
   * @description 关闭时是否销毁子元素
   * @en Whether to destroy content when closed.
   */
  destroyOnClose: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否保持组件状态（配合 KeepAlive 使用）
   * @en Whether to keep alive content (uses `<KeepAlive>` internally logic if implemented, currently similar to !destroyOnClose but reserved).
   */
  keepAlive: {
    type: Boolean,
    default: false,
  },
  /**
   * @description Teleport 挂载节点
   * @en Target element to teleport to.
   */
  teleportTo: {
    type: [String, Object, Function] as PropType<string | HTMLElement | (() => HTMLElement)>,
    default: 'body',
  },
  /**
   * @description 组件层级 z-index
   * @en Z-index of the Drawer.
   */
  zIndex: {
    type: Number,
  },
  /**
   * @description 是否显示头部
   * @en Whether to show header.
   */
  showHeader: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 是否显示底部
   * @en Whether to show footer.
   */
  showFooter: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否显示关闭按钮
   * @en Whether to show close button.
   */
  showClose: {
    type: Boolean,
    default: true,
  },
} as const

export const drawerEmits = {
  'update:modelValue': (value: boolean) => typeof value === 'boolean',
  /**
   * @description Drawer 打开时触发
   * @en Triggered when drawer opens.
   */
  open: () => true,
  /**
   * @description Drawer 打开动画结束时触发
   * @en Triggered when drawer is fully opened (animation done).
   */
  opened: () => true,
  /**
   * @description Drawer 关闭时触发
   * @en Triggered when drawer closes.
   */
  close: () => true,
  /**
   * @description Drawer 关闭动画结束时触发
   * @en Triggered when drawer is fully closed (animation done).
   */
  closed: () => true,
  /**
   * @description Drawer 尺寸改变时触发
   * @en Triggered when drawer is resized.
   */
  resize: (size: { width: number; height: number }) => true,
}

export const drawerSlots = {
  /**
   * @description Drawer 的内容
   * @en Content of the Drawer.
   */
  default: () => true,
  /**
   * @description Drawer 的头部区域
   * @en Header of the Drawer.
   */
  header: () => true,
  /**
   * @description 头部区域的标题插槽
   * @en Title slot in Header.
   */
  title: () => true,
  /**
   * @description 自定义关闭按钮
   * @en Customize close button/icon.
   */
  close: () => true,
  /**
   * @description Drawer 的底部区域
   * @en Footer of the Drawer.
   */
  footer: () => true,
}

export type DrawerProps = ExtractPropTypes<typeof drawerProps>
export type DrawerEmits = typeof drawerEmits
