<template>
  <pre class="code"><code ref="codeEl" class="hljs" /></pre>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import hljs from 'highlight.js/lib/core'
import xml from 'highlight.js/lib/languages/xml'
import typescript from 'highlight.js/lib/languages/typescript'
import css from 'highlight.js/lib/languages/css'
import bash from 'highlight.js/lib/languages/bash'
import json from 'highlight.js/lib/languages/json'

hljs.registerLanguage('vue', xml)
hljs.registerLanguage('html', xml)
hljs.registerLanguage('ts', typescript)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('css', css)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('json', json)

const props = defineProps<{
  code: string
  lang?: string
}>()

const codeEl = ref<HTMLElement | null>(null)

const render = () => {
  if (!codeEl.value) return
  const lang = props.lang ?? 'vue'
  const html = hljs.highlight(props.code, { language: lang }).value
  codeEl.value.innerHTML = html
}

onMounted(render)
watch(() => [props.code, props.lang], render)
</script>

<style scoped>
.code {
  margin: 0;
  padding: 12px;
  overflow: auto;
  border: none;
  border-radius: var(--amu-radius);
  color: var(--amu-text-1);
}
</style>
