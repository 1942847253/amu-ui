import type { DemoItem } from "../../components/DemoTabs.vue";

import Basic from "./Basic.vue";
import BasicCode from "./Basic.vue?raw";
import Range from "./Range.vue";
import RangeCode from "./Range.vue?raw";
import DateTime from "./DateTime.vue";
import DateTimeCode from "./DateTime.vue?raw";
import Shortcuts from "./Shortcuts.vue";
import ShortcutsCode from "./Shortcuts.vue?raw";
import DisabledDates from "./DisabledDates.vue";
import DisabledDatesCode from "./DisabledDates.vue?raw";
import FormValidate from "./FormValidate.vue";
import FormValidateCode from "./FormValidate.vue?raw";
import I18n from "./I18n.vue";
import I18nCode from "./I18n.vue?raw";

export const meta = {
  description: {
    'zh-CN': 'DatePicker 日期选择器示例集合。',
    'en-US': 'A collection of DatePicker demos.',
  },
}

export const demos: DemoItem[] = [
  {
    key: "basic",
    title: {
      "zh-CN": "基础用法",
      "en-US": "Basic Usage",
    },
    description: {
      "zh-CN": "选择单个日期。",
      "en-US": "Select a single date.",
    },
    component: Basic,
    lang: "vue",
    code: BasicCode,
  },
  {
    key: "range",
    title: {
      "zh-CN": "日期范围",
      "en-US": "Date Range",
    },
    description: {
      "zh-CN": "选择起止日期，支持 `clearable` 清空。",
      "en-US": "Select a date range with `clearable`.",
    },
    component: Range,
    lang: "vue",
    code: RangeCode,
  },
  {
    key: "datetime",
    title: {
      "zh-CN": "带时间",
      "en-US": "DateTime",
    },
    description: {
      "zh-CN": "通过 `type=\"datetime\"` 或 `showTime` 启用时间选择。",
      "en-US": "Enable time selection via `type=\"datetime\"` or `showTime`.",
    },
    component: DateTime,
    lang: "vue",
    code: DateTimeCode,
  },
  {
    key: "shortcuts",
    title: {
      "zh-CN": "快捷选项",
      "en-US": "Shortcuts",
    },
    description: {
      "zh-CN": "通过 `shortcuts` 自定义快捷选择。",
      "en-US": "Customize shortcuts via `shortcuts`.",
    },
    component: Shortcuts,
    lang: "vue",
    code: ShortcutsCode,
  },
  {
    key: "disabled-dates",
    title: {
      "zh-CN": "禁用日期",
      "en-US": "Disabled Dates",
    },
    description: {
      "zh-CN": "通过 `disabledDate` 动态禁用日期。",
      "en-US": "Disable dates dynamically via `disabledDate`.",
    },
    component: DisabledDates,
    lang: "vue",
    code: DisabledDatesCode,
  },
  {
    key: "form-validate",
    title: {
      "zh-CN": "表单校验",
      "en-US": "Form Validation",
    },
    description: {
      "zh-CN": "用 `status=\"error\"` 演示校验失败状态。",
      "en-US": "Use `status=\"error\"` to show validation error.",
    },
    component: FormValidate,
    lang: "vue",
    code: FormValidateCode,
  },
  {
    key: "i18n",
    title: {
      "zh-CN": "国际化",
      "en-US": "Internationalization",
    },
    description: {
      "zh-CN": "通过 `AmuConfigProvider` 切换 locale。",
      "en-US": "Switch locale via `AmuConfigProvider`.",
    },
    component: I18n,
    lang: "vue",
    code: I18nCode,
  },
];

export default demos;
