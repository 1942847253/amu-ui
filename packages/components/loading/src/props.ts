import { type PropType, type VNode } from 'vue'

export const loadingProps = {
  /**
   * @description 是否显示
   * @en Whether to show
   */
  loading: {
    type: Boolean,
    default: false
  },
  /**
   * @description 加载文案
   * @en Loading text
   */
  text: String,
  /**
   * @description 自定义加载图标
   * @en Custom spinner icon
   */
  spinner: {
    type: Object as PropType<VNode | string>,
  },
  /**
   * @description 加载图标的大小，支持 CSS 长度字符串或数字（单位 px）
   * @en Loading icon size, supports CSS length string or number (unit: px)
   */
  size: {
    type: [String, Number] as PropType<string | number>,
    default: 25
  },
  /**
   * @description 遮罩背景色
   * @en Background color of the mask
   */
  background: String,
  /**
   * @description 是否全屏
   * @en Whether to be fullscreen
   */
  fullscreen: {
    type: Boolean,
    default: false
  },
  /**
   * @description 自定义类名
   * @en Custom class name
   */
  customClass: String,
  /**
   * @description 是否可见（用于服务调用控制）
   * @en Whether it is visible (for service call control)
   */
  visible: {
    type: Boolean,
    default: false
  }
} as const

export const loadingEmits = {}
export const loadingSlots = {}
