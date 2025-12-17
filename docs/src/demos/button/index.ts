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
    title: "基本用法",
    description:
      "按钮分为 主要按钮、次要按钮、虚线按钮、线形按钮和文本按钮五种。",
    component: Basic,
    lang: "vue",
    code: BasicCode,
  },
  {
    key: "size",
    title: "按钮尺寸",
    description:
      "按钮分为 mini、small、default、large 四种尺寸。高度分别为：24px、28px、32px、36px。推荐（默认）尺寸为 default。",
    component: Size,
    lang: "vue",
    code: SizeCode,
  },
  {
    key: "shape",
    title: "按钮形状",
    description: "按钮分为矩形（默认）、圆形、全圆角三种形状。",
    component: Shape,
    lang: "vue",
    code: ShapeCode,
  },
  {
    key: "icon",
    title: "图标按钮",
    description: "通过 icon 插槽可以在按钮中嵌入图标。",
    component: Icon,
    lang: "vue",
    code: IconCode,
  },
  {
    key: "status",
    title: "按钮状态",
    description:
      "状态支持 warning、danger、success，可与按钮类型叠加，状态优先级高于类型。",
    component: Status,
    lang: "vue",
    code: StatusCode,
  },
  {
    key: "disabled-states",
    title: "禁用状态",
    description: "全面展示各类型、状态组合下的按钮禁用样式。",
    component: DisabledStates,
    lang: "vue",
    code: DisabledStatesCode,
  },
  {
    key: "loading",
    title: "加载态",
    description: "通过 loading 属性显示加载中状态，自动禁用按钮防止重复提交。",
    component: Loading,
    lang: "vue",
    code: LoadingCode,
  },
  {
    key: "fill",
    title: "填充按钮",
    description: "`fill` 属性可以让按钮填满父容器并保持文字居中显示。",
    component: Fill,
    lang: "vue",
    code: FillCode,
  },
];

export const meta = {
  description: "按钮是一种命令组件，可发起一个即时操作。",
};

export default demos;
