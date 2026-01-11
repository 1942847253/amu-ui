import type { PropType, InjectionKey, Ref } from 'vue'

export type DropdownTrigger = 'click' | 'hover' | 'contextmenu' | 'manual'
export type DropdownPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'

export const dropdownProps = {
  /**
   * 触发下拉的行为。
   * @en Trigger mode.
   */
  trigger: {
    type: String as PropType<DropdownTrigger>,
    default: 'click',
  },
  /**
   * 菜单弹出位置。
   * @en Menu placement.
   */
  placement: {
    type: String as PropType<DropdownPlacement>,
    default: 'bottom',
  },
  /**
   * 是否禁用。
   * @en Whether to disable the dropdown.
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 绑定值（控制显示隐藏）。
   * @en Visibility state.
   */
  visible: {
    type: Boolean,
    default: undefined,
  },
  /**
   * 默认是否显示（非受控模式）。
   * @en Default visibility (uncontrolled).
   */
  defaultVisible: {
    type: Boolean,
    default: false,
  },
  /**
   * 点击菜单项后是否隐藏菜单。
   * @en Whether to hide menu after clicking an item.
   */
  hideOnClick: {
    type: Boolean,
    default: true,
  },
  /**
   * 展开延时（毫秒）。
   * @en Delay before showing (ms).
   */
  showTimeout: {
    type: Number,
    default: 150,
  },
  /**
   * 关闭延时（毫秒）。
   * @en Delay before hiding (ms).
   */
  hideTimeout: {
    type: Number,
    default: 150,
  },
  /**
   * 下拉菜单自定义类名。
   * @en Custom class name for the dropdown menu.
   */
  overlayClassName: {
    type: String,
    default: '',
  },
  /**
   * 下拉菜单自定义样式。
   * @en Custom style for the dropdown menu.
   */
  overlayStyle: {
    type: [String, Object] as PropType<string | Record<string, any>>,
    default: '',
  },
  /**
   * 菜单宽度是否与触发元素一致。
   * @en Whether width matches trigger element.
   */
  autoWidth: {
    type: Boolean,
    default: false,
  },
  /**
   * 弹出层 Teleport 目标。
   * @en Teleport target.
   */
  teleportTo: {
    type: [String, Object] as PropType<string | HTMLElement>,
    default: 'body',
  },
} as const

export const dropdownEmits = {
  /**
   * 绑定值（可见性）变化时触发。
   * @en Triggered when the visible state changes.
   */
  'update:visible': (visible: boolean) => typeof visible === 'boolean',
  /**
   * 选中菜单项时触发。
   * @en Triggered when a menu item is selected.
   */
  select: (command: string | number | object | undefined, event: Event) => true,
  /**
   * 下拉菜单打开时触发。
   * @en Triggered when the dropdown opens.
   */
  open: () => true,
  /**
   * 下拉菜单关闭时触发。
   * @en Triggered when the dropdown closes.
   */
  close: () => true,
  /**
   * 可见性变化时触发。
   * @en Triggered when visibility changes.
   */
  visibleChange: (visible: boolean) => typeof visible === 'boolean',
}

export const dropdownMenuProps = {
  // 目前主要作为容器，可能不需要太多 Props
} as const

export const dropdownItemProps = {
  /**
   * 派发的指令，在 select 事件中回调。
   * @en Command to be emitted in select event.
   */
  command: {
    type: [String, Number, Object] as PropType<string | number | object>,
    default: undefined,
  },
  /**
   * 是否禁用。
   * @en Whether the item is disabled.
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否为分割线。
   * @en Whether to display a divider.
   */
  divided: {
    type: Boolean,
    default: false,
  },
  /**
   * 图标组件或图标类名。
   * @en Icon component or class name.
   */
  icon: {
    type: [String, Object] as PropType<string | object>, // simplified
  },
  /**
   * 快捷键提示文本。
   * @en Shortcut text.
   */
  shortcut: {
    type: String,
  },
  /**
   * 是否激活状态。
   * @en Whether the item is active.
   */
  active: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否为分组标题。
   * @en Whether it is a group title.
   */
  isTitle: {
    type: Boolean,
    default: false,
  },
} as const

export const dropdownItemEmits = {
  /**
   * 点击时触发。
   * @en Triggered when clicked.
   */
  click: (e: MouseEvent) => e instanceof MouseEvent,
  /**
   * 鼠标移入时触发。
   * @en Triggered when pointer enters.
   */
  pointerenter: (e: PointerEvent) => e instanceof PointerEvent,
  /**
   * 鼠标移出时触发。
   * @en Triggered when pointer leaves.
   */
  pointerleave: (e: PointerEvent) => e instanceof PointerEvent,
}

export interface DropdownContext {
  hideOnClick: Ref<boolean>
  handleItemClick: (command: string | number | object | undefined, event: Event) => void
  visible: Ref<boolean>
}

export const DROPDOWN_KEY: InjectionKey<DropdownContext> = Symbol('amu-dropdown')
