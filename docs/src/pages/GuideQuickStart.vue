<template>
  <article>
    <h1>快速开始</h1>

    <section>
      <h2>安装</h2>
      <CodeBlock lang="bash" code="pnpm add amu-ui vue" />
      <p class="hint">vue 是 peer dependency，需要由业务项目自行提供。</p>
    </section>

    <section>
      <h2>引入主题</h2>
      <CodeBlock lang="ts" code="import 'amu-ui/theme'" />
    </section>

    <section>
      <h2>按需引入</h2>
      <CodeBlock lang="ts" code="import AmuButton from 'amu-ui/button'" />
    </section>

    <section>
      <h2>全量注册</h2>
      <CodeBlock lang="ts" code="import { createApp } from 'vue'
import AmuUI from 'amu-ui'
import 'amu-ui/theme'

createApp(App).use(AmuUI).mount('#app')" />
    </section>

    <section>
      <h2>暗黑模式</h2>
      <CodeBlock lang="html" code='<html data-amu-theme="dark">' />
      <p class="hint">未设置 data-amu-theme 时，会跟随系统 prefers-color-scheme。</p>
    </section>

    <section>
      <h2>自定义主题</h2>
      <CodeBlock lang="css" code=":root {
  --amu-color-primary: #7c3aed;
  --amu-radius: 10px;
}" />
    </section>
  </article>
</template>

<script setup lang="ts">
import CodeBlock from '../components/CodeBlock.vue'
</script>

<style scoped>
section {
  padding: 6px 0;
}

.hint {
  margin: 8px 0 0;
  color: var(--amu-text-2);
}
</style>
