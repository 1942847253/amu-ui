<template>
  <article>
    <h1>{{ t.quickStart.title }}</h1>

    <section>
      <h2>{{ t.quickStart.install }}</h2>
      <CodeBlock lang="bash" code="pnpm add amu-ui vue" />
      <p class="hint">{{ t.quickStart.installHint }}</p>
    </section>

    <section>
      <h2>{{ t.quickStart.importTheme }}</h2>
      <CodeBlock lang="ts" code="import 'amu-ui/theme'" />
    </section>

    <section>
      <h2>{{ t.quickStart.onDemand }}</h2>
      <CodeBlock lang="ts" code="import AmuButton from 'amu-ui/button'" />
    </section>

    <section>
      <h2>{{ t.quickStart.fullImport }}</h2>
      <CodeBlock
        lang="ts"
        code="import { createApp } from 'vue'
import AmuUI from 'amu-ui'
import 'amu-ui/theme'

createApp(App).use(AmuUI).mount('#app')"
      />
    </section>

    <section>
      <h2>{{ t.quickStart.darkMode }}</h2>
      <CodeBlock lang="html" code='<html data-amu-theme="dark">' />
      <p class="hint">
        {{ t.quickStart.darkModeHint }}
      </p>
    </section>

    <section>
      <h2>{{ t.quickStart.customTheme }}</h2>
      <CodeBlock
        lang="css"
        code=":root {
  --amu-color-primary: #7c3aed;
  --amu-radius: 10px;
}"
      />
    </section>
  </article>
</template>

<script setup lang="ts">
import { computed } from "vue";
import CodeBlock from "../components/CodeBlock.vue";
import { useLanguage } from "../composables/useLanguage";
import { messages } from "../locales";

const { lang } = useLanguage();
const t = computed(() => messages[lang.value]);
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
