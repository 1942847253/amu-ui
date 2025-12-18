import Basic from './Basic.vue'
import BasicCode from './Basic.vue?raw'

import Size from './Size.vue'
import SizeCode from './Size.vue?raw'

import Color from './Color.vue'
import ColorCode from './Color.vue?raw'

import Stroke from './Stroke.vue'
import StrokeCode from './Stroke.vue?raw'

import Spin from './Spin.vue'
import SpinCode from './Spin.vue?raw'

import List from './List.vue'

export const demos = [
  {
    title: {
      "zh-CN": "基础用法",
      "en-US": "Basic Usage",
    },
    description: {
      "zh-CN": "Icon 组件的基础用法。",
      "en-US": "Basic usage of Icon component.",
    },
    component: Basic,
    code: BasicCode,
  },
  {
    title: {
      "zh-CN": "尺寸",
      "en-US": "Size",
    },
    description: {
      "zh-CN": "可以通过 size 属性调整图标尺寸。",
      "en-US": "Adjust icon size via size property.",
    },
    component: Size,
    code: SizeCode,
  },
  {
    title: {
      "zh-CN": "颜色",
      "en-US": "Color",
    },
    description: {
      "zh-CN": "可以通过 color 属性调整图标颜色。",
      "en-US": "Adjust icon color via color property.",
    },
    component: Color,
    code: ColorCode,
  },
  {
    title: {
      "zh-CN": "线条粗细",
      "en-US": "Stroke Width",
    },
    description: {
      "zh-CN": "调整图标的线条粗细。",
      "en-US": "Adjust the stroke width of the icon.",
    },
    component: Stroke,
    code: StrokeCode,
  },
  {
    title: {
      "zh-CN": "旋转",
      "en-US": "Spin",
    },
    description: {
      "zh-CN": "可以通过 spin 属性让图标旋转。",
      "en-US": "Rotate the icon via spin property.",
    },
    component: Spin,
    code: SpinCode,
  },
  {
    title: {
      "zh-CN": "图标列表",
      "en-US": "Icon List",
    },
    description: {
      "zh-CN": "所有可用图标的列表。",
      "en-US": "List of all available icons.",
    },
    component: List,
    code: "",
  },
];
export const meta = {
  description: {
    "zh-CN": "语义化的矢量图形。",
    "en-US": "Semantic vector graphics.",
  },
};
