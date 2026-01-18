import Basic from './Basic.vue'
import Service from './Service.vue'
import Size from './Size.vue'
import BasicCode from './Basic.vue?raw'
import ServiceCode from './Service.vue?raw'
import SizeCode from './Size.vue?raw'

export const demos = [
  {
    path: 'basic',
    title: {
      'zh-CN': '基础用法',
      'en-US': 'Basic Usage'
    },
    description: {
      'zh-CN': '使用 `v-loading` 指令控制加载状态。',
      'en-US': 'Use `v-loading` directive to control loading state.'
    },
    component: Basic,
    code: BasicCode
  },
  {
    path: 'size',
    title: {
      'zh-CN': '自定义大小',
      'en-US': 'Custom Size'
    },
    description: {
      'zh-CN': '使用 `amu-loading-size` 属性或 `size` prop 自定义图标大小。默认大小已调整为 42px。',
      'en-US': 'Use `amu-loading-size` attribute or `size` prop to customize icon size. Default size is 42px.'
    },
    component: Size,
    code: SizeCode
  },
  {
    path: 'service',
    title: {
      'zh-CN': '服务调用',
      'en-US': 'Service Usage'
    },
    description: {
      'zh-CN': '引入 `AmuLoadingService` 进行全屏加载。',
      'en-US': 'Import `AmuLoadingService` for full screen loading.'
    },
    component: Service,
    code: ServiceCode
  }
]

export const meta = {
  description: {
    'zh-CN': '加载数据时显示动效。',
    'en-US': 'Show animation while loading data.'
  }
}
