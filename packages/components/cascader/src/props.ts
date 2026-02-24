import type { ExtractPropTypes, PropType } from 'vue'

export type CascaderValue = string | number
export type CascaderPath = CascaderValue[]
export type CascaderModelValue = CascaderPath | CascaderPath[]
export type CascaderChangeOption = CascaderOption[] | CascaderOption[][]

export interface CascaderOption {
  value: CascaderValue
  label: string
  children?: CascaderOption[]
  disabled?: boolean
  isLeaf?: boolean
}

export const cascaderProps = {
  /**
   * @description 绑定值（由每一层的 value 组成）
   * @en Binding value composed of each level values
   */
  modelValue: {
    type: Array as PropType<CascaderModelValue>,
    default: undefined,
  },
  /**
   * @description 是否多选
   * @en Whether multiple select
   */
  multiple: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 选项数据
   * @en Options data
   */
  options: {
    type: Array as PropType<CascaderOption[]>,
    default: () => [],
  },
  /**
   * @description 占位符
   * @en Placeholder
   */
  placeholder: {
    type: String,
    default: '',
  },
  /**
   * @description 是否禁用
   * @en Whether disabled
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否可清空
   * @en Whether clearable
   */
  clearable: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 尺寸
   * @en Size
   */
  size: {
    type: String as PropType<'small' | 'medium' | 'large'>,
    default: undefined,
  },
  /**
   * @description 分隔符
   * @en Separator
   */
  separator: {
    type: String,
    default: '/',
  },
  /**
   * @description 是否显示完整路径
   * @en Whether to show full path
   */
  showAllLevels: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 展开子级的触发方式
   * @en Trigger to expand sub-menu
   */
  expandTrigger: {
    type: String as PropType<'click' | 'hover'>,
    default: 'click',
  },
  /**
   * @description 是否可选任意层级
   * @en Whether any level can be selected
   */
  checkStrictly: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 弹出层位置
   * @en Popup placement
   */
  placement: {
    type: String as PropType<'bottom' | 'top' | 'bottom-start' | 'top-start' | 'bottom-end' | 'top-end'>,
    default: 'bottom-start',
  },
  /**
   * @description 空数据提示
   * @en Empty text
   */
  emptyText: {
    type: String,
    default: '暂无数据',
  },
} as const

export type CascaderProps = ExtractPropTypes<typeof cascaderProps>

export const cascaderEmits = {
  /**
   * @description 绑定值变化时触发
   * @en Triggered when modelValue updates
   */
  'update:modelValue': (val: CascaderModelValue) => Array.isArray(val),
  /**
   * @description 选中值变化后触发
   * @en Triggered when selection changes
   */
  change: (val: CascaderModelValue, options: CascaderChangeOption) => Array.isArray(val) && Array.isArray(options),
  /**
   * @description 清空后触发
   * @en Triggered after clearing
   */
  clear: () => true,
  /**
   * @description 多选模式下移除某个标签时触发
   * @en Triggered when a tag is removed in multiple mode
   */
  'remove-tag': (val: CascaderPath) => Array.isArray(val),
  /**
   * @description 展开路径变化时触发
   * @en Triggered when expanded path changes
   */
  'expand-change': (options: CascaderOption[], val: CascaderPath) => Array.isArray(options) && Array.isArray(val),
  /**
   * @description 下拉显示状态变化时触发
   * @en Triggered when dropdown visibility changes
   */
  'visible-change': (visible: boolean) => typeof visible === 'boolean',
}

export const cascaderSlots = {
  /**
   * @description 自定义触发器内容
   * @en Custom trigger content
   */
  default: {},
  /**
   * @description 自定义选项内容
   * @en Custom option content
   */
  option: {},
  /**
   * @description 空状态内容
   * @en Empty content
   */
  empty: {},
}

export type CascaderEmits = typeof cascaderEmits
