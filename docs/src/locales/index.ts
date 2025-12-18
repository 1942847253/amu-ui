export const messages = {
  'zh-CN': {
    nav: {
      design: '设计',
      develop: '开发',
      ecosystem: '生态产品',
      guide: '开发指南',
      components: '通用',
      quickStart: '快速上手',
      i18n: '国际化',
    },
    home: {
      subtitle: '一个全面的 Vue 3 组件库',
      desc: '专为效率和灵活性设计。支持 Tree-shaking、ESM+CJS、TypeScript 和暗黑模式。',
      getStarted: '快速开始',
      features: {
        performance: '高性能',
        performanceDesc: '为速度优化，支持 Tree-shaking，包体积极小。',
        themeable: '主题定制',
        themeableDesc: '内置暗黑模式支持，提供丰富的 CSS 变量定制。',
        typescript: 'TypeScript',
        typescriptDesc: '使用 TypeScript 编写，提供完整的类型定义，提升开发体验。',
      }
    },
    quickStart: {
      title: '快速开始',
      install: '安装',
      installHint: 'vue 是 peer dependency，需要由业务项目自行提供。',
      importTheme: '引入主题',
      onDemand: '按需引入',
      fullImport: '全量注册',
      darkMode: '暗黑模式',
      darkModeHint: '未设置 data-amu-theme 时，会跟随系统 prefers-color-scheme。',
      customTheme: '自定义主题',
    },
    componentDoc: {
      breadcrumbs: '组件 / 通用',
      apiReference: 'API 参考',
      notFound: '未找到组件',
      notFoundDesc: '无法找到该组件的文档。',
      back: '返回组件列表',
    },
    components: {
      button: 'Button 按钮',
      icon: 'Icon 图标',
    }
  },
  'en-US': {
    nav: {
      design: 'Design',
      develop: 'Develop',
      ecosystem: 'Ecosystem',
      guide: 'Guide',
      components: 'Components',
      quickStart: 'Quick Start',
      i18n: 'Internationalization',
    },
    home: {
      subtitle: 'A Comprehensive Vue 3 Component Library',
      desc: 'Designed for efficiency and flexibility. Supports Tree-shaking, ESM+CJS, TypeScript, and Dark Mode.',
      getStarted: 'Get Started',
      features: {
        performance: 'High Performance',
        performanceDesc: 'Optimized for speed with tree-shaking support and minimal bundle size.',
        themeable: 'Themeable',
        themeableDesc: 'Built-in dark mode support and extensive CSS variable customization.',
        typescript: 'TypeScript',
        typescriptDesc: 'Written in TypeScript with complete type definitions for better DX.',
      }
    },
    quickStart: {
      title: 'Quick Start',
      install: 'Installation',
      installHint: 'vue is a peer dependency and must be provided by the consuming project.',
      importTheme: 'Import Theme',
      onDemand: 'On-demand Import',
      fullImport: 'Full Registration',
      darkMode: 'Dark Mode',
      darkModeHint: 'When data-amu-theme is not set, it follows the system prefers-color-scheme.',
      customTheme: 'Custom Theme',
    },
    componentDoc: {
      breadcrumbs: 'Components / General',
      apiReference: 'API Reference',
      notFound: 'Component Not Found',
      notFoundDesc: 'The documentation for this component could not be found.',
      back: 'Back to Components',
    },
    components: {
      button: 'Button',
      icon: 'Icon',
    }
  }
} as const

export type LocaleKey = keyof typeof messages['zh-CN']['nav']
