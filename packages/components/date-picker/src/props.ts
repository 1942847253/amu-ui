import type { ExtractPropTypes, PropType } from 'vue'

export type DatePickerType = 'date' | 'datetime' | 'daterange' | 'datetimerange'
export type DatePickerSize = 'small' | 'medium' | 'large'
export type DatePickerStatus = 'normal' | 'error'

export type DatePickerModelValue = Date | [Date, Date] | null

export type DatePickerShortcut = {
  /**
   * @description 快捷项文本
   * @en Shortcut label
   */
  label: string
  /**
   * @description 计算快捷值的函数
   * @en Value factory
   */
  value: () => Date | [Date, Date]
}

export type TimeStep = {
  /**
   * @description 小时步长
   * @en Hour step
   */
  hour?: number
  /**
   * @description 分钟步长
   * @en Minute step
   */
  minute?: number
  /**
   * @description 秒步长
   * @en Second step
   */
  second?: number
}

export const datePickerProps = {
  /**
   * @description 绑定值
   * @en Binding value
   */
  modelValue: {
    type: [Date, Array] as PropType<DatePickerModelValue>,
    default: null,
  },
  /**
   * @description 选择器类型
   * @en Picker type
   */
  type: {
    type: String as PropType<DatePickerType>,
    default: 'date',
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
   * @description 是否只读（仍可聚焦，但不允许修改）
   * @en Whether readonly (focusable but not editable)
   */
  readonly: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 最小可选日期
   * @en Minimum selectable date
   */
  minDate: {
    type: Date as PropType<Date>,
    default: undefined,
  },
  /**
   * @description 最大可选日期
   * @en Maximum selectable date
   */
  maxDate: {
    type: Date as PropType<Date>,
    default: undefined,
  },
  /**
   * @description 禁用日期规则
   * @en Disabled date rule
   */
  disabledDate: {
    type: Function as PropType<(date: Date) => boolean>,
    default: undefined,
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
   * @description 占位符
   * @en Placeholder
   */
  placeholder: {
    type: String,
    default: '',
  },
  /**
   * @description 显示格式。支持 dayjs format 字符串或自定义函数
   * @en Display format. Supports dayjs format string or custom function
   */
  format: {
    type: [String, Function] as PropType<string | ((date: Date) => string)>,
    default: undefined,
  },
  /**
   * @description 是否显示时间选择
   * @en Whether to show time panel
   */
  showTime: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否使用 12 小时制
   * @en Whether to use 12-hour clock
   */
  use12Hours: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 时间步长
   * @en Time step
   */
  step: {
    type: Object as PropType<TimeStep>,
    default: () => ({ hour: 1, minute: 1, second: 1 }),
  },
  /**
   * @description 尺寸
   * @en Size
   */
  size: {
    type: String as PropType<DatePickerSize>,
    default: 'medium',
  },
  /**
   * @description 状态
   * @en Status
   */
  status: {
    type: String as PropType<DatePickerStatus>,
    default: 'normal',
  },
  /**
   * @description 周起始日（0=Sunday，1=Monday）
   * @en Week start day (0=Sunday, 1=Monday)
   */
  weekStart: {
    type: Number as PropType<0 | 1>,
    default: 0,
  },
  /**
   * @description 时区设置。支持 'local' | 'utc' | IANA 时区字符串（如 'Asia/Shanghai'）
   * @en Timezone. Supports 'local' | 'utc' | IANA timezone string
   */
  timezone: {
    type: String as PropType<'local' | 'utc' | string>,
    default: 'local',
  },
  /**
   * @description 快捷选项
   * @en Shortcuts
   */
  shortcuts: {
    type: Array as PropType<DatePickerShortcut[]>,
    default: undefined,
  },
  /**
   * @description 是否加载中（可选）
   * @en Whether in loading state
   */
  loading: {
    type: Boolean,
    default: false,
  },
} as const

export const datePickerEmits = {
  'update:modelValue': (value: DatePickerModelValue) => true,
  change: (value: DatePickerModelValue) => true,
  focus: (e: FocusEvent) => true,
  blur: (e: FocusEvent) => true,
  open: () => true,
  close: () => true,
  clear: () => true,
  selectShortcut: (option: DatePickerShortcut) => true,
}

export const datePickerSlots = {
  /**
   * @description 弹窗底部区域
   * @en Popup footer area
   */
  footer: () => true,
}

export type DatePickerProps = ExtractPropTypes<typeof datePickerProps>
export type DatePickerEmits = typeof datePickerEmits
