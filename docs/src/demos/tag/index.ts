import type { DemoItem } from "../../components/DemoTabs.vue";
import Basic from './Basic.vue'
import BasicCode from './Basic.vue?raw'
import Size from './Size.vue'
import SizeCode from './Size.vue?raw'
import Shape from './Shape.vue'
import ShapeCode from './Shape.vue?raw'
import Bordered from './Bordered.vue'
import BorderedCode from './Bordered.vue?raw'
import Closable from './Closable.vue'
import ClosableCode from './Closable.vue?raw'
import Color from './Color.vue'
import ColorCode from './Color.vue?raw'
import Dynamic from './Dynamic.vue'
import DynamicCode from './Dynamic.vue?raw'
import Disabled from './Disabled.vue'
import DisabledCode from './Disabled.vue?raw'
import Icon from './Icon.vue'
import IconCode from './Icon.vue?raw'

export const demos: DemoItem[] = [
  {
    key: "basic",
    title: {
      "zh-CN": "基本用法",
      "en-US": "Basic Usage",
    },
    description: {
      "zh-CN": "标签的基本用法。",
      "en-US": "Basic usage of Tag.",
    },
    component: Basic,
    code: BasicCode,
  },
  {
    key: "bordered",
    title: {
      "zh-CN": "带边框",
      "en-US": "Bordered",
    },
    description: {
      "zh-CN": "设置 `bordered` 属性可以显示边框。",
      "en-US": "Set the `bordered` property to show the border.",
    },
    component: Bordered,
    code: BorderedCode,
  },
  {
    key: "size",
    title: {
      "zh-CN": "不同尺寸",
      "en-US": "Different Sizes",
    },
    description: {
      "zh-CN": "提供 small、default、large 三种尺寸。",
      "en-US": "Three sizes are available: small, default, and large.",
    },
    component: Size,
    code: SizeCode,
  },
  {
    key: "shape",
    title: {
      "zh-CN": "不同形状",
      "en-US": "Different Shapes",
    },
    description: {
      "zh-CN": "提供 square、round、mark 三种形状。",
      "en-US": "Three shapes are available: square, round, and mark.",
    },
    component: Shape,
    code: ShapeCode,
  },
  {
    key: "closable",
    title: {
      "zh-CN": "可关闭",
      "en-US": "Closable",
    },
    description: {
      "zh-CN": "设置 `closable` 属性可以定义一个标签是否可移除。",
      "en-US": "Set the `closable` property to define whether a tag can be removed.",
    },
    component: Closable,
    code: ClosableCode,
  },
  {
    key: "color",
    title: {
      "zh-CN": "自定义颜色",
      "en-US": "Custom Color",
    },
    description: {
      "zh-CN": "可以通过 `color` 属性设置标签的背景色。",
      "en-US": "You can set the background color of the tag through the `color` property.",
    },
    component: Color,
    code: ColorCode,
  },
  {
    key: "dynamic",
    title: {
      "zh-CN": "动态编辑",
      "en-US": "Dynamic",
    },
    description: {
      "zh-CN": "通过数组生成一组标签，可以进行动态添加和删除。",
      "en-US": "Generate a set of tags through an array, which can be dynamically added and deleted.",
    },
    component: Dynamic,
    code: DynamicCode,
  },
  {
    key: "disabled",
    title: {
      "zh-CN": "禁用状态",
      "en-US": "Disabled State",
    },
    description: {
      "zh-CN": "禁用状态下无法点击和关闭。",
      "en-US": "Cannot click or close in disabled state.",
    },
    component: Disabled,
    code: DisabledCode,
  },
  {
    key: "icon",
    title: {
      "zh-CN": "图标标签",
      "en-US": "Icon Tag",
    },
    description: {
      "zh-CN": "可以在标签中包含图标。",
      "en-US": "Can include icons in tags.",
    },
    component: Icon,
    code: IconCode,
  }
]
