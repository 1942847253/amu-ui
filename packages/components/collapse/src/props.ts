import type { ExtractPropTypes, InjectionKey, PropType, Ref } from 'vue'

export type CollapseModelValue = string | number | (string | number)[]

export const collapseProps = {
  /**
   * @description 折叠面板的绑定值，可以是字符串、数字或数组
   * @en Model value of the collapse, can be a string, number or array of them
   */
  modelValue: {
    type: [Array, String, Number] as PropType<CollapseModelValue>,
    default: () => [],
  },
  /**
   * @description 是否开启手风琴模式
   * @en Whether to active accordion mode
   */
  accordion: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否显示边框
   * @en Whether to show border
   */
  border: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 箭头位置
   * @en Position of the arrow
   */
  arrowPlacement: {
    type: String as PropType<'left' | 'right'>,
    default: 'right',
  },
} as const

export const collapseEmits = {
  /**
   * @description 绑定值变化时触发
   * @en Triggers when the model value changes
   */
  'update:modelValue': (value: CollapseModelValue) => true,
  /**
   * @description 当前激活面板改变时触发
   * @en Triggers when the active panels change
   */
  change: (value: CollapseModelValue) => true,
}

export const collapseItemProps = {
  /**
   * @description 面板的唯一标识符
   * @en Unique identification of the panel
   */
  name: {
    type: [String, Number] as PropType<string | number>,
    default: undefined,
  },
  /**
   * @description 面板标题
   * @en Title of the panel
   */
  title: {
    type: String,
    default: '',
  },
  /**
   * @description 是否禁用面板
   * @en Disable the panel
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 是否显示箭头
   * @en Whether to show the arrow
   */
  showArrow: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 切换面板的触发区域
   * @en Trigger region for toggling the panel
   */
  trigger: {
    type: String as PropType<'header' | 'icon'>,
    default: 'header',
  },
} as const

export type CollapseProps = ExtractPropTypes<typeof collapseProps>
export type CollapseItemProps = ExtractPropTypes<typeof collapseItemProps>
