import type { DemoItem } from "../../components/DemoTabs.vue";

import Basic from "./Basic.vue";
import BasicCode from "./Basic.vue?raw";
import Drag from "./Drag.vue";
import DragCode from "./Drag.vue?raw";
import ListType from "./ListType.vue";
import ListTypeCode from "./ListType.vue?raw";
import Manual from "./Manual.vue";
import ManualCode from "./Manual.vue?raw";
import LimitValidate from "./LimitValidate.vue";
import LimitValidateCode from "./LimitValidate.vue?raw";
import CustomRequest from "./CustomRequest.vue";
import CustomRequestCode from "./CustomRequest.vue?raw";
import HiddenList from "./HiddenList.vue";
import HiddenListCode from "./HiddenList.vue?raw";
import CustomFileSlot from "./CustomFileSlot.vue";
import CustomFileSlotCode from "./CustomFileSlot.vue?raw";

export const demos: DemoItem[] = [
  {
    key: "basic",
    title: {
      "zh-CN": "基础用法",
      "en-US": "Basic Usage",
    },
    description: {
      "zh-CN": "使用 `action` 指定上传地址，并通过 `headers`、`data`、`name` 扩展请求参数。",
      "en-US":
        "Specify upload URL with `action`, and extend request via `headers`, `data`, and `name`.",
    },
    component: Basic,
    lang: "vue",
    code: BasicCode,
  },
  {
    key: "drag",
    title: {
      "zh-CN": "拖拽上传",
      "en-US": "Drag Upload",
    },
    description: {
      "zh-CN": "开启 `drag` 后可拖拽上传，配合 `accept` 限制文件类型。",
      "en-US":
        "Enable `drag` to upload by drag-and-drop, and use `accept` to limit file types.",
    },
    component: Drag,
    lang: "vue",
    code: DragCode,
  },
  {
    key: "list-type",
    title: {
      "zh-CN": "列表类型",
      "en-US": "List Type",
    },
    description: {
      "zh-CN": "通过 `listType` 展示文本、图片或卡片列表。",
      "en-US":
        "Use `listType` to display text, picture, or picture-card lists.",
    },
    component: ListType,
    lang: "vue",
    code: ListTypeCode,
  },
  {
    key: "manual",
    title: {
      "zh-CN": "手动上传",
      "en-US": "Manual Upload",
    },
    description: {
      "zh-CN": "关闭 `autoUpload` 后，可通过 `submit` 主动触发上传。",
      "en-US":
        "Disable `autoUpload`, then call `submit` to trigger upload manually.",
    },
    component: Manual,
    lang: "vue",
    code: ManualCode,
  },
  {
    key: "limit-validate",
    title: {
      "zh-CN": "数量与校验",
      "en-US": "Limit & Validate",
    },
    description: {
      "zh-CN": "结合 `limit`、`beforeUpload`、`beforeRemove` 实现数量限制与校验拦截。",
      "en-US":
        "Combine `limit`, `beforeUpload`, and `beforeRemove` for validation and limits.",
    },
    component: LimitValidate,
    lang: "vue",
    code: LimitValidateCode,
  },
  {
    key: "custom-request",
    title: {
      "zh-CN": "自定义请求",
      "en-US": "Custom Request",
    },
    description: {
      "zh-CN": "使用 `httpRequest` 自定义上传逻辑，并接收 `progress` 回调。",
      "en-US":
        "Customize upload logic with `httpRequest` and receive `progress` callback.",
    },
    component: CustomRequest,
    lang: "vue",
    code: CustomRequestCode,
  },
  {
    key: "hidden-list",
    title: {
      "zh-CN": "隐藏列表与禁用",
      "en-US": "Hidden List & Disabled",
    },
    description: {
      "zh-CN": "通过 `showFileList` 隐藏文件列表，并使用 `disabled` 控制禁用状态。",
      "en-US":
        "Hide file list with `showFileList`, and control disabled state via `disabled`.",
    },
    component: HiddenList,
    lang: "vue",
    code: HiddenListCode,
  },
  {
    key: "custom-file-slot",
    title: {
      "zh-CN": "自定义文件项",
      "en-US": "Custom File Item",
    },
    description: {
      "zh-CN": "使用 `file` 插槽定制列表渲染，并在点击时触发预览。",
      "en-US":
        "Use `file` slot to customize list rendering and trigger preview on click.",
    },
    component: CustomFileSlot,
    lang: "vue",
    code: CustomFileSlotCode,
  },
];

export const meta = {
  description: {
    "zh-CN": "Upload 用于文件或图片的选择与上传，支持多种列表形态与拦截逻辑。",
    "en-US":
      "Upload provides file selection and uploading with multiple list types and hooks.",
  },
};

export default demos;
