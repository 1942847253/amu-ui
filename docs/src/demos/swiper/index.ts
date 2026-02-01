import Basic from './demo-basic.vue'
import Autoplay from './demo-autoplay.vue'
import Vertical from './demo-vertical.vue'
import Indicator from './demo-indicator.vue'
import State from './demo-state.vue'
import Event from './demo-event.vue'
import NoControls from './demo-no-controls.vue'
import Height from './demo-height.vue'
import LoadingSlot from './demo-loading-slot.vue'
import Controls from './demo-controls.vue'
import Images from './demo-images.vue'

export const demos = [
  {
    key: 'basic',
    title: {
      'zh-CN': '基础用法',
      'en-US': 'Basic Usage'
    },
    description: {
      'zh-CN': '最基础的轮播图用法，通过 `v-model` 绑定当前索引。',
      'en-US': 'Basic swiper usage with `v-model` binding for active index.'
    },
    component: Basic,
    code: (await import('./demo-basic.vue?raw')).default
  },
  {
    key: 'autoplay',
    title: {
      'zh-CN': '自动播放',
      'en-US': 'Autoplay'
    },
    description: {
      'zh-CN': '设置 `autoplay` 与 `interval` 实现自动切换，可在悬停时暂停。',
      'en-US': 'Enable `autoplay` with `interval` for auto switching and pause on hover.'
    },
    component: Autoplay,
    code: (await import('./demo-autoplay.vue?raw')).default
  },
  {
    key: 'vertical',
    title: {
      'zh-CN': '垂直方向',
      'en-US': 'Vertical Direction'
    },
    description: {
      'zh-CN': '设置 `direction="vertical"` 并指定 `height` 进行纵向轮播。',
      'en-US': 'Use `direction="vertical"` with `height` for vertical sliding.'
    },
    component: Vertical,
    code: (await import('./demo-vertical.vue?raw')).default
  },
  {
    key: 'indicator',
    title: {
      'zh-CN': '自定义指示器',
      'en-US': 'Custom Indicator'
    },
    description: {
      'zh-CN': '通过 `indicator` 插槽与 `indicator-trigger` 自定义指示器外观与触发方式。',
      'en-US': 'Customize indicator style and trigger using the `indicator` slot and `indicator-trigger`.'
    },
    component: Indicator,
    code: (await import('./demo-indicator.vue?raw')).default
  },
  {
    key: 'state',
    title: {
      'zh-CN': '禁用与加载',
      'en-US': 'Disabled and Loading'
    },
    description: {
      'zh-CN': '设置 `disabled` 或 `loading` 控制交互与加载态。',
      'en-US': 'Use `disabled` or `loading` to control interaction and loading state.'
    },
    component: State,
    code: (await import('./demo-state.vue?raw')).default
  },
  {
    key: 'event',
    title: {
      'zh-CN': '事件与控制',
      'en-US': 'Events and Control'
    },
    description: {
      'zh-CN': '使用 `@change` 监听切换事件，并通过外部按钮控制索引。',
      'en-US': 'Listen to `@change` and control the active index with external actions.'
    },
    component: Event,
    code: (await import('./demo-event.vue?raw')).default
  },
  {
    key: 'no-controls',
    title: {
      'zh-CN': '纯展示模式',
      'en-US': 'Display Only'
    },
    description: {
      'zh-CN': '通过设置 `show-arrows` 与 `show-indicators` 为 `false` 隐藏控制器。',
      'en-US': 'Hide controls by setting `show-arrows` and `show-indicators` to `false`.'
    },
    component: NoControls,
    code: (await import('./demo-no-controls.vue?raw')).default
  },
  {
    key: 'height',
    title: {
      'zh-CN': '自定义高度',
      'en-US': 'Custom Height'
    },
    description: {
      'zh-CN': '通过 `height` 设置轮播区域高度。',
      'en-US': 'Set the swiper height with `height`.'
    },
    component: Height,
    code: (await import('./demo-height.vue?raw')).default
  },
  {
    key: 'loading-slot',
    title: {
      'zh-CN': '自定义加载内容',
      'en-US': 'Custom Loading'
    },
    description: {
      'zh-CN': '通过 `loading` 插槽与 `loading-text` 自定义加载展示。',
      'en-US': 'Customize loading with the `loading` slot and `loading-text`.'
    },
    component: LoadingSlot,
    code: (await import('./demo-loading-slot.vue?raw')).default
  },
  {
    key: 'controls',
    title: {
      'zh-CN': '动态配置',
      'en-US': 'Dynamic Controls'
    },
    description: {
      'zh-CN': '通过开关与单选按钮实时调整 `autoplay`、`loop`、`direction` 等参数。',
      'en-US': 'Adjust `autoplay`, `loop`, `direction` and more in real time.'
    },
    component: Controls,
    code: (await import('./demo-controls.vue?raw')).default
  },
  {
    key: 'images',
    title: {
      'zh-CN': '真实图片',
      'en-US': 'Real Images'
    },
    description: {
      'zh-CN': '使用真实图片资源构建轮播，并开启 `autoplay` 展示。',
      'en-US': 'Use real images with `autoplay` enabled.'
    },
    component: Images,
    code: (await import('./demo-images.vue?raw')).default
  }
]

export const meta = {
  description: {
    'zh-CN': '轮播图组件，用于展示多个内容面板的切换效果。',
    'en-US': 'Swiper component for displaying and switching between multiple panels.'
  }
}
