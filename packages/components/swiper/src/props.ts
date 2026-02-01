import type { ExtractPropTypes, PropType } from 'vue'

export const swiperProps = {
  /**
   * @description 绑定值
   * @en Binding value
   */
  modelValue: {
    type: Number,
    default: 0
  },
  /**
   * @description 是否自动播放
   * @en Whether to autoplay
   */
  autoplay: {
    type: Boolean,
    default: false
  },
  /**
   * @description 自动播放间隔时间（毫秒）
   * @en Autoplay interval in milliseconds
   */
  interval: {
    type: Number,
    default: 3000
  },
  /**
   * @description 切换动画时长（毫秒）
   * @en Transition duration in milliseconds
   */
  duration: {
    type: Number,
    default: 300
  },
  /**
   * @description 是否循环播放
   * @en Whether to loop
   */
  loop: {
    type: Boolean,
    default: true
  },
  /**
   * @description 切换方向
   * @en Switch direction
   */
  direction: {
    type: String as PropType<'horizontal' | 'vertical'>,
    default: 'horizontal'
  },
  /**
   * @description 是否显示指示器
   * @en Whether to show indicators
   */
  showIndicators: {
    type: Boolean,
    default: true
  },
  /**
   * @description 是否显示箭头
   * @en Whether to show arrows
   */
  showArrows: {
    type: Boolean,
    default: true
  },
  /**
   * @description 指示器触发方式
   * @en Indicator trigger mode
   */
  indicatorTrigger: {
    type: String as PropType<'click' | 'hover'>,
    default: 'click'
  },
  /**
   * @description 鼠标悬停时是否暂停
   * @en Whether to pause on hover
   */
  pauseOnHover: {
    type: Boolean,
    default: true
  },
  /**
   * @description 轮播区域高度
   * @en Swiper height
   */
  height: {
    type: [String, Number] as PropType<string | number>,
    default: '240px'
  },
  /**
   * @description 是否禁用
   * @en Whether disabled
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * @description 是否加载中
   * @en Whether loading
   */
  loading: {
    type: Boolean,
    default: false
  },
  /**
   * @description 加载中提示文本
   * @en Loading text
   */
  loadingText: {
    type: String,
    default: ''
  },
  /**
   * @description 加载图标尺寸
   * @en Loading icon size
   */
  loadingSize: {
    type: [String, Number] as PropType<string | number>,
    default: 20
  }
} as const

export const swiperEmits = {
  /**
   * @description 绑定值变化时触发
   * @en Triggers when the binding value changes
   */
  'update:modelValue': (val: number) => true,
  /**
   * @description 切换面板时触发
   * @en Triggers when slide changes
   */
  change: (val: number) => true
}

export const swiperSlots = {
  /**
   * @description 默认插槽（SwiperItem）
   * @en Default slot (SwiperItem)
   */
  default: (props: any) => {},
  /**
   * @description 自定义指示器
   * @en Custom indicator
   */
  indicator: (props: { index: number; active: boolean }) => {},
  /**
   * @description 自定义上一页按钮
   * @en Custom previous arrow
   */
  prev: (props: any) => {},
  /**
   * @description 自定义下一页按钮
   * @en Custom next arrow
   */
  next: (props: any) => {},
  /**
   * @description 自定义加载中内容
   * @en Custom loading content
   */
  loading: (props: any) => {}
}

export const swiperItemProps = {} as const

export const swiperItemEmits = {}

export const swiperItemSlots = {
  /**
   * @description 默认插槽
   * @en Default slot
   */
  default: (props: any) => {}
}

export type SwiperProps = ExtractPropTypes<typeof swiperProps>
export type SwiperEmits = typeof swiperEmits
export type SwiperItemProps = ExtractPropTypes<typeof swiperItemProps>
export type SwiperItemEmits = typeof swiperItemEmits
