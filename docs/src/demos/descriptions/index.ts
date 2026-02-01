import Basic from './basic.vue?raw'
import Border from './border.vue?raw'
import Size from './size.vue?raw'
import Vertical from './vertical.vue?raw'
import Responsive from './responsive.vue?raw'
import CustomLabel from './custom-label.vue?raw'
import ColonAlign from './colon-align.vue?raw'
import Span from './span.vue?raw'
import CustomStyle from './custom-style.vue?raw'
import SlotsExtra from './slots-extra.vue?raw'
import LabelSlot from './label-slot.vue?raw'

import BasicComp from './basic.vue'
import BorderComp from './border.vue'
import SizeComp from './size.vue'
import VerticalComp from './vertical.vue'
import ResponsiveComp from './responsive.vue'
import CustomLabelComp from './custom-label.vue'
import ColonAlignComp from './colon-align.vue'
import SpanComp from './span.vue'
import CustomStyleComp from './custom-style.vue'
import SlotsExtraComp from './slots-extra.vue'
import LabelSlotComp from './label-slot.vue'

export const demos = [
  {
    title: {
      'zh-CN': '基本用法',
      'en-US': 'Basic Usage'
    },
    description: {
      'zh-CN': '基础的 Descriptions 展示。',
      'en-US': 'Basic Descriptions display.'
    },
    code: Basic,
    component: BasicComp
  },
  {
    title: {
      'zh-CN': '带边框的',
      'en-US': 'Bordered'
    },
    description: {
      'zh-CN': '通过 `border` 展示带边框的列表。',
      'en-US': 'Use `border` to show bordered list.'
    },
    code: Border,
    component: BorderComp
  },
  {
    title: {
      'zh-CN': '自定义尺寸',
      'en-US': 'Custom Size'
    },
    description: {
      'zh-CN': '通过 `size` 调整整体密度。',
      'en-US': 'Adjust density via `size`.'
    },
    code: Size,
    component: SizeComp
  },
  {
    title: {
      'zh-CN': '垂直排列',
      'en-US': 'Vertical'
    },
    description: {
      'zh-CN': '通过 `direction="vertical"` 展示垂直布局。',
      'en-US': 'Use `direction="vertical"` for vertical layout.'
    },
    code: Vertical,
    component: VerticalComp
  },
  {
    title: {
      'zh-CN': '响应式列数',
      'en-US': 'Responsive Columns'
    },
    description: {
      'zh-CN': '使用 `column` 响应式对象与 `labelWidth` 控制列数与标签宽度。',
      'en-US': 'Use responsive `column` and `labelWidth` to control layout.'
    },
    code: Responsive,
    component: ResponsiveComp
  },
  {
    title: {
      'zh-CN': '自定义标签',
      'en-US': 'Custom Label'
    },
    description: {
      'zh-CN': '通过 `label` 插槽与 `colon` 实现自定义标签展示。',
      'en-US': 'Customize labels with `label` slot and `colon`.'
    },
    code: CustomLabel,
    component: CustomLabelComp
  },
  {
    title: {
      'zh-CN': '冒号与对齐',
      'en-US': 'Colon and Align'
    },
    description: {
      'zh-CN': '使用 `colon`、`labelAlign`、`contentAlign` 对齐展示。',
      'en-US': 'Use `colon`, `labelAlign`, `contentAlign` for alignment.'
    },
    code: ColonAlign,
    component: ColonAlignComp
  },
  {
    title: {
      'zh-CN': '跨列展示',
      'en-US': 'Span Columns'
    },
    description: {
      'zh-CN': '通过 `span` 合并列，适合长文本。',
      'en-US': 'Use `span` to merge columns for long text.'
    },
    code: Span,
    component: SpanComp
  },
  {
    title: {
      'zh-CN': '样式定制',
      'en-US': 'Custom Style'
    },
    description: {
      'zh-CN': '配合 `labelStyle` 与 `contentStyle` 做细节调整。',
      'en-US': 'Fine tune styles with `labelStyle` and `contentStyle`.'
    },
    code: CustomStyle,
    component: CustomStyleComp
  },
  {
    title: {
      'zh-CN': '标题与操作区',
      'en-US': 'Title and Extra'
    },
    description: {
      'zh-CN': '通过 `title` 和 `extra` 插槽扩展头部区域。',
      'en-US': 'Use `title` and `extra` slots for header area.'
    },
    code: SlotsExtra,
    component: SlotsExtraComp
  },
  {
    title: {
      'zh-CN': '标签插槽',
      'en-US': 'Label Slot'
    },
    description: {
      'zh-CN': '使用 `label` 插槽自定义标签内容。',
      'en-US': 'Customize labels with `label` slot.'
    },
    code: LabelSlot,
    component: LabelSlotComp
  }
]

export const meta = {
  description: {
    'zh-CN': '成组展示多个只读字段，支持 `border`、`column`、`direction` 等配置。',
    'en-US': 'Display multiple read-only fields with `border`, `column`, and `direction`.'
  }
}
