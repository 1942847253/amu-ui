import type { DemoItem } from "../../components/DemoTabs.vue";

import Basic from "./Basic.vue";
import BasicCode from "./Basic.vue?raw";
import Thumbnail from "./Thumbnail.vue";
import ThumbnailCode from "./Thumbnail.vue?raw";
import ThumbnailCustomText from "./ThumbnailCustomText.vue";
import ThumbnailCustomTextCode from "./ThumbnailCustomText.vue?raw";
import ThumbnailMaskSlot from "./ThumbnailMaskSlot.vue";
import ThumbnailMaskSlotCode from "./ThumbnailMaskSlot.vue?raw";
import ThumbnailDisabled from "./ThumbnailDisabled.vue";
import ThumbnailDisabledCode from "./ThumbnailDisabled.vue?raw";
import ThumbnailListIndex from "./ThumbnailListIndex.vue";
import ThumbnailListIndexCode from "./ThumbnailListIndex.vue?raw";
import ViewerBehavior from "./ViewerBehavior.vue";
import ViewerBehaviorCode from "./ViewerBehavior.vue?raw";
import ViewerTeleportMask from "./ViewerTeleportMask.vue";
import ViewerTeleportMaskCode from "./ViewerTeleportMask.vue?raw";
import ViewerWindowed from "./ViewerWindowed.vue";
import ViewerWindowedCode from "./ViewerWindowed.vue?raw";
import Method from "./Function.vue";
import MethodCode from "./Function.vue?raw";

export const demos: DemoItem[] = [
  {
    component: Thumbnail,
    code: ThumbnailCode,
    title: {
      "zh-CN": "缩略图预览",
      "en-US": "Thumbnail Preview"
    },
    description: {
      "zh-CN": "通过缩略图进行预览，悬浮展示 `预览` 蒙层。",
      "en-US": "Preview via thumbnail with a `Preview` overlay on hover."
    }
  },
  {
    component: ThumbnailCustomText,
    code: ThumbnailCustomTextCode,
    title: {
      "zh-CN": "尺寸与文案",
      "en-US": "Size and Text"
    },
    description: {
      "zh-CN": "配置 `width`、`height`、`fit` 与 `previewText`。",
      "en-US": "Configure `width`, `height`, `fit`, and `previewText`."
    }
  },
  {
    component: ThumbnailMaskSlot,
    code: ThumbnailMaskSlotCode,
    title: {
      "zh-CN": "自定义遮罩",
      "en-US": "Custom Mask"
    },
    description: {
      "zh-CN": "使用 `mask` 插槽替换默认遮罩内容。",
      "en-US": "Replace default mask content via `mask` slot."
    }
  },
  {
    component: ThumbnailDisabled,
    code: ThumbnailDisabledCode,
    title: {
      "zh-CN": "禁用状态",
      "en-US": "Disabled"
    },
    description: {
      "zh-CN": "设置 `disabled` 禁止点击预览。",
      "en-US": "Disable preview by setting `disabled`."
    }
  },
  {
    component: ThumbnailListIndex,
    code: ThumbnailListIndexCode,
    title: {
      "zh-CN": "图片列表与索引",
      "en-US": "List and Index"
    },
    description: {
      "zh-CN": "使用 `urlList`、`initialIndex` 并监听 `preview` 事件。",
      "en-US": "Use `urlList`, `initialIndex`, and listen to `preview`."
    }
  },
  {
    component: Basic,
    code: BasicCode,
    title: {
      "zh-CN": "基础用法",
      "en-US": "Basic Usage"
    },
    description: {
      "zh-CN": "组件式调用，通过 `v-model:visible` 控制显示。",
      "en-US": "Component usage, control display via `v-model:visible`."
    }
  },
  {
    component: ViewerBehavior,
    code: ViewerBehaviorCode,
    title: {
      "zh-CN": "交互行为",
      "en-US": "Behavior"
    },
    description: {
      "zh-CN": "演示 `infinite`、`hideOnClickModal`、`closeOnPressEscape` 与事件 `change`、`rotate`、`close`。",
      "en-US": "Show `infinite`, `hideOnClickModal`, `closeOnPressEscape` and events `change`, `rotate`, `close`."
    }
  },
  {
    component: ViewerWindowed,
    code: ViewerWindowedCode,
    title: {
      "zh-CN": "小窗口预览",
      "en-US": "Windowed Preview"
    },
    description: {
      "zh-CN": "使用 `windowed`、`windowWidth` 与 `windowHeight` 开启小窗口模式。",
      "en-US": "Enable windowed mode with `windowed`, `windowWidth`, and `windowHeight`."
    }
  },
  {
    component: ViewerTeleportMask,
    code: ViewerTeleportMaskCode,
    title: {
      "zh-CN": "挂载与遮罩",
      "en-US": "Teleport and Mask"
    },
    description: {
      "zh-CN": "配置 `teleport`、`zIndex` 与 `maskStyle`。",
      "en-US": "Configure `teleport`, `zIndex`, and `maskStyle`."
    }
  },
  {
    component: Method,
    code: MethodCode,
    title: {
      "zh-CN": "函数式调用",
      "en-US": "Functional Call"
    },
    description: {
      "zh-CN": "直接调用 `previewImage` 方法预览。",
      "en-US": "Call `previewImage` directly to preview."
    }
  }
]

export const meta = {
  description: {
    "zh-CN": "图片预览组件，支持缩放、旋转、切换。",
    "en-US": "Image Viewer component, supports zoom, rotate, and switch."
  }
}
