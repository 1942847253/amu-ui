import type { ExtractPropTypes, PropType, TeleportProps, CSSProperties } from 'vue'

export const imageViewerProps = {
  /**
   * 图片链接列表。
   * @en Image URL list.
   */
  urlList: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  /**
   * 初始展示的图片索引，从 0 开始。
   * @en The index of the initially displayed image, starting from 0.
   */
  initialIndex: {
    type: Number,
    default: 0,
  },
  /**
   * 是否显示。
   * @en Whether to show the viewer.
   */
  visible: {
    type: Boolean,
    default: false,
  },
  /**
   * 是否支持无限循环切换。
   * @en Whether to support infinite switching.
   */
  infinite: {
    type: Boolean,
    default: true,
  },
  /**
   * 点击遮罩层是否关闭。
   * @en Whether to close when clicking the mask.
   */
  hideOnClickModal: {
    type: Boolean,
    default: false,
  },
  /**
   * 指定挂载节点。
   * @en Specify the mount node.
   */
  teleport: {
    type: [String, Object] as PropType<TeleportProps['to']>,
    default: 'body',
  },
  /**
   * 设置 z-index。
   * @en Set z-index.
   */
  zIndex: {
    type: Number,
    default: 2000,
  },
  /**
   * 是否使用 ESC 关闭。
   * @en Whether to close by pressing ESC.
   */
  closeOnPressEscape: {
    type: Boolean,
    default: true,
  },
  /**
   * 遮罩层的样式。
   * @en Style of the mask.
   */
  maskStyle: {
    type: Object as PropType<CSSProperties>,
  },
  /**
   * @description 是否使用小窗口模式。
   * @en Whether to use windowed mode.
   */
  windowed: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 小窗口宽度。
   * @en Window width.
   */
  windowWidth: {
    type: [Number, String] as PropType<number | string>,
  },
  /**
   * @description 小窗口高度。
   * @en Window height.
   */
  windowHeight: {
    type: [Number, String] as PropType<number | string>,
  },
  /**
   * @description 打开动效的原点坐标。
   * @en Origin point for the open animation.
   */
  transitionOrigin: {
    type: Object as PropType<{ x: number; y: number }>,
  },
} as const

export const previewImageProps = {
  /**
   * @description 缩略图地址。
   * @en Thumbnail image url.
   */
  src: {
    type: String,
    default: '',
  },
  /**
   * @description 预览图片列表。
   * @en Preview image list.
   */
  urlList: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  /**
   * @description 初始预览索引。
   * @en Initial preview index.
   */
  initialIndex: {
    type: Number,
    default: 0,
  },
  /**
   * @description 宽度。
   * @en Width.
   */
  width: {
    type: [Number, String] as PropType<number | string>,
  },
  /**
   * @description 高度。
   * @en Height.
   */
  height: {
    type: [Number, String] as PropType<number | string>,
  },
  /**
   * @description 图片填充模式。
   * @en Image fit mode.
   */
  fit: {
    type: String as PropType<'fill' | 'contain' | 'cover' | 'none' | 'scale-down'>,
    default: 'cover',
  },
  /**
   * @description 预览提示文本。
   * @en Preview text.
   */
  previewText: {
    type: String,
    default: '',
  },
  /**
   * @description 是否禁用。
   * @en Whether to disable.
   */
  disabled: {
    type: Boolean,
    default: false,
  },
} as const

export const imageViewerEmits = {
  /**
   * 关闭时触发。
   * @en Triggered when closed.
   */
  close: () => true,
  /**
   * 旋转图片时触发。
   * @en Triggered when the image is rotated.
   */
  rotate: (deg: number) => typeof deg === 'number',
  /**
   * 切换图片时触发。
   * @en Triggered when the image is switched.
   */
  change: (index: number) => true,
  /**
   * 可见性改变时触发。
   * @en Triggered when visibility changes.
   */
  'update:visible': (visible: boolean) => true,
}

export const previewImageEmits = {
  /**
   * @description 点击预览时触发。
   * @en Triggered when preview is clicked.
   */
  preview: (url: string, index: number) => typeof url === 'string' && typeof index === 'number',
}

export const previewImageSlots = {
  /**
   * @description 自定义预览遮罩内容。
   * @en Custom preview mask content.
   */
  mask: () => true,
}

export type ImageViewerProps = ExtractPropTypes<typeof imageViewerProps>
export type ImageViewerEmits = typeof imageViewerEmits
export type PreviewImageProps = ExtractPropTypes<typeof previewImageProps>
export type PreviewImageEmits = typeof previewImageEmits
