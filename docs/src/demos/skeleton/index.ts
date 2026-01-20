import Basic from './Basic.vue?raw'
import Animated from './Animated.vue?raw'
import Variant from './Variant.vue?raw'
import Complex from './Complex.vue?raw'

import BasicComp from './Basic.vue'
import AnimatedComp from './Animated.vue'
import VariantComp from './Variant.vue'
import ComplexComp from './Complex.vue'

export const demos = [
  {
    title: {
      'zh-CN': '基础用法',
      'en-US': 'Basic Usage',
    },
    description: {
      'zh-CN': '最简单的占位效果。',
      'en-US': 'The simplest placeholder effect.',
    },
    component: BasicComp,
    code: Basic,
  },
  {
    title: {
      'zh-CN': '动画效果',
      'en-US': 'Animation',
    },
    description: {
      'zh-CN': '通过 `animated` 属性开启显示动画。',
      'en-US': 'Enable display animation via `animated` prop.',
    },
    component: AnimatedComp,
    code: Animated,
  },
  {
    title: {
      'zh-CN': '多样化形状',
      'en-US': 'Variants',
    },
    description: {
      'zh-CN': '`amu-skeleton-item` 提供了 `variant` 属性来渲染不同形状。',
      'en-US': '`amu-skeleton-item` provides the `variant` prop to render different shapes.',
    },
    component: VariantComp,
    code: Variant,
  },
  {
    title: {
      'zh-CN': '复杂组合与切换',
      'en-US': 'Complex Combination',
    },
    description: {
      'zh-CN': '配合 `template` 插槽构建复杂的骨架结构，并控制 `loading` 状态。',
      'en-US': 'Use `template` slot to build complex skeleton structures and control `loading` state.',
    },
    component: ComplexComp,
    code: Complex,
  },
]

export const meta = {
  description: {
    'zh-CN': '在需要等待加载内容的位置提供一个占位图形组合。',
    'en-US': 'Provide a placeholder shape combination where you need to wait for content to load.',
  },
}
