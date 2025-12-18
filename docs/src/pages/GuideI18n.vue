<template>
  <article>
    <h1>{{ t.title }}</h1>
    <p>{{ t.desc }}</p>

    <section>
      <h2>{{ t.usage }}</h2>
      <p>{{ t.usageDesc }}</p>
      <CodeBlock lang="ts" :code="usageCode" />
    </section>

    <section>
      <h2>{{ t.toggle }}</h2>
      <p>{{ t.toggleDesc }}</p>
      <BasicDemo />
      <CodeBlock lang="vue" :code="toggleCode" />
    </section>
  </article>
</template>

<script setup lang="ts">
import { computed } from "vue";
import CodeBlock from "../components/CodeBlock.vue";
import { useLanguage } from "../composables/useLanguage";
import BasicDemo from "../demos/i18n/Basic.vue";

const { lang } = useLanguage();

const messages = {
  "zh-CN": {
    title: "国际化",
    desc: "amu-ui 提供了一个 Vue 组件 ConfigProvider 用于全局配置国际化文案。",
    usage: "使用方法",
    usageDesc: "使用 ConfigProvider 包裹你的应用，并设置 locale 属性。",
    toggle: "语言切换",
    toggleDesc: "你可以通过动态改变 locale 属性来实现语言切换。",
  },
  "en-US": {
    title: "Internationalization",
    desc: "amu-ui provides a Vue component ConfigProvider for global configuration of internationalization text.",
    usage: "Usage",
    usageDesc: "Wrap your application with ConfigProvider and set the locale property.",
    toggle: "Language Switching",
    toggleDesc: "You can implement language switching by dynamically changing the locale property.",
  },
};

const t = computed(() => messages[lang.value]);

const usageCode = `import { createApp } from 'vue'
import App from './App.vue'
import { AmuConfigProvider } from 'amu-ui'
import { zhCn } from '@amu-ui/locale'

// 在 App.vue 中使用
// <AmuConfigProvider :locale='zhCn'>
//   <App />
// </AmuConfigProvider>
`

const toggleCode = `<template>
  <AmuConfigProvider :locale='locale'>
    <button @click='toggle'>Switch Language</button>
    <AmuButton>Button</AmuButton>
  </AmuConfigProvider>
</template>

<script setup>
import { ref } from 'vue'
import { en, zhCn } from '@amu-ui/locale'

const locale = ref(zhCn)
const toggle = () => {
  locale.value = locale.value.name === 'zh-cn' ? en : zhCn
}
` + '<' + '/script>'
</script>

<style scoped>
section {
  padding: 6px 0;
}
</style>
