import type { DemoItem } from '../../types'
import CollapseBasic from './CollapseBasic.vue?raw'
import CollapseBasicComp from './CollapseBasic.vue'
import CollapseAccordion from './CollapseAccordion.vue?raw'
import CollapseAccordionComp from './CollapseAccordion.vue'
import CollapseNested from './CollapseNested.vue?raw'
import CollapseNestedComp from './CollapseNested.vue'
import CollapseCustom from './CollapseCustom.vue?raw'
import CollapseCustomComp from './CollapseCustom.vue'
import CollapseAdvanced from './CollapseAdvanced.vue?raw'
import CollapseAdvancedComp from './CollapseAdvanced.vue'

export const demos: DemoItem[] = [
  {
    key: 'basic',
    title: {
      'zh-CN': '基础用法',
      'en-US': 'Basic Usage',
    },
    description: {
      'zh-CN': '可同时展开多个面板，面板之间不影响',
      'en-US': 'Expand multiple panels simultaneously, panels do not affect each other',
    },
    code: CollapseBasic,
    component: CollapseBasicComp,
  },
  {
    key: 'accordion',
    title: {
      'zh-CN': '手风琴效果',
      'en-US': 'Accordion Effect',
    },
    description: {
      'zh-CN': '每次只能展开一个面板',
      'en-US': 'Only one panel can be expanded at a time',
    },
    code: CollapseAccordion,
    component: CollapseAccordionComp,
  },
  {
    key: 'nested',
    title: {
      'zh-CN': '嵌套面板',
      'en-US': 'Nested Panel',
    },
    description: {
      'zh-CN': '折叠面板可以进行嵌套',
      'en-US': 'Collapse panels can be nested',
    },
    code: CollapseNested,
    component: CollapseNestedComp,
  },
  {
    key: 'custom',
    title: {
      'zh-CN': '自定义标题',
      'en-US': 'Custom Title',
    },
    description: {
      'zh-CN': '除了可以通过 `title` 属性指定标题外，还可以使用具名 slot 来实现自定义面板的标题内容',
      'en-US': 'In addition to the `title` attribute, you can also use named slots to implement custom panel title content',
    },
    code: CollapseCustom,
    component: CollapseCustomComp,
  },
  {
    key: 'advanced',
    title: {
      'zh-CN': '高级用法',
      'en-US': 'Advanced Usage',
    },
    description: {
      'zh-CN': '包含自定义操作区、无边框模式、箭头位置控制及仅图标触发等功能',
      'en-US': 'Includes custom action area, borderless mode, arrow placement control, and icon-only trigger',
    },
    code: CollapseAdvanced,
    component: CollapseAdvancedComp,
  },
]

export const meta = {
  description: {
    'zh-CN': '通过折叠面板收纳内容区域',
    'en-US': 'Store content areas through collapse panels',
  },
}
