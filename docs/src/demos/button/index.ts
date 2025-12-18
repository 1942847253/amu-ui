import type { DemoItem } from "../../components/DemoTabs.vue";

import Basic from "./Basic.vue";
import BasicCode from "./Basic.vue?raw";
import Shape from "./Shape.vue";
import ShapeCode from "./Shape.vue?raw";
import Size from "./Size.vue";
import SizeCode from "./Size.vue?raw";
import Status from "./Status.vue";
import StatusCode from "./Status.vue?raw";
import DisabledStates from "./DisabledStates.vue";
import DisabledStatesCode from "./DisabledStates.vue?raw";
import Loading from "./Loading.vue";
import LoadingCode from "./Loading.vue?raw";
import Fill from "./Fill.vue";
import FillCode from "./Fill.vue?raw";
import Icon from "./Icon.vue";
import IconCode from "./Icon.vue?raw";

export const demos: DemoItem[] = [
  {
    key: "basic",
    title: {
      "zh-CN": "基本用法",
      "en-US": "Basic Usage",
    },
    description: {
      "zh-CN":
        "按钮分为 主要按钮、次要按钮、虚线按钮、线形按钮和文本按钮五种。",
      "en-US":
        "There are five types of buttons: primary, secondary, dashed, outline, and text.",
    },
    component: Basic,
    lang: "vue",
    code: BasicCode,
  },
  {
    key: "size",
    title: {
      "zh-CN": "按钮尺寸",
      "en-US": "Button Size",
    },
    description: {
      "zh-CN":
        "按钮分为 mini、small、default、large 四种尺寸。高度分别为：24px、28px、32px、36px。推荐（默认）尺寸为 default。",
      "en-US":
        "Buttons come in four sizes: mini, small, default, large. Heights are 24px, 28px, 32px, 36px. Default is recommended.",
    },
    component: Size,
    lang: "vue",
    code: SizeCode,
  },
  {
    key: "shape",
    title: {
      "zh-CN": "按钮形状",
      "en-US": "Button Shape",
    },
    description: {
      "zh-CN": "按钮分为矩形（默认）、圆形、全圆角三种形状。",
      "en-US":
        "Buttons come in three shapes: rectangle (default), circle, and round.",
    },
    component: Shape,
    lang: "vue",
    code: ShapeCode,
  },
  {
    key: "icon",
    title: {
      "zh-CN": "图标按钮",
      "en-US": "Icon Button",
    },
    description: {
      "zh-CN": "通过 icon 插槽可以在按钮中嵌入图标。",
      "en-US": "Icons can be embedded in buttons using the icon slot.",
    },
    component: Icon,
    lang: "vue",
    code: IconCode,
  },
  {
    key: "status",
    title: {
      "zh-CN": "按钮状态",
      "en-US": "Button Status",
    },
    description: {
      "zh-CN":
        "状态支持 warning、danger、success，可与按钮类型叠加，状态优先级高于类型。",
      "en-US":
        "Status supports warning, danger, success, which can be superimposed with button types. Status priority is higher than type.",
    },
    component: Status,
    lang: "vue",
    code: StatusCode,
  },
  {
    key: "disabled-states",
    title: {
      "zh-CN": "禁用状态",
      "en-US": "Disabled State",
    },
    description: {
      "zh-CN": "全面展示各类型、状态组合下的按钮禁用样式。",
      "en-US":
        "Comprehensive display of button disabled styles under various type and status combinations.",
    },
    component: DisabledStates,
    lang: "vue",
    code: DisabledStatesCode,
  },
  {
    key: "loading",
    title: {
      "zh-CN": "加载态",
      "en-US": "Loading State",
    },
    description: {
      "zh-CN":
        "通过 loading 属性显示加载中状态，自动禁用按钮防止重复提交。",
      "en-US":
        "Display loading state via loading property, automatically disable button to prevent repeated submission.",
    },
    component: Loading,
    lang: "vue",
    code: LoadingCode,
  },
  {
    key: "fill",
    title: {
      "zh-CN": "填充按钮",
      "en-US": "Fill Button",
    },
    description: {
      "zh-CN": "`fill` 属性可以让按钮填满父容器并保持文字居中显示。",
      "en-US":
        "The `fill` property allows the button to fill the parent container and keep the text centered.",
    },
    component: Fill,
    lang: "vue",
    code: FillCode,
  },
];

export const meta = {
  description: {
    "zh-CN": "按钮是一种命令组件，可发起一个即时操作。",
    "en-US":
      "Button is a command component that can initiate an instant operation.",
  },
};

export default demos;
