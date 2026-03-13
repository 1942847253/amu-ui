<template>
  <main class="playground-shell">
    <header class="playground-header">
      <div>
        <p class="playground-eyebrow">amu-ui</p>
        <h1 class="playground-title">SFC Playground</h1>
      </div>
      <p class="playground-subtitle">
        {{ statusText }}
      </p>
    </header>

    <section v-if="errorMessage" class="playground-empty">
      <h2>无法加载示例</h2>
      <p>{{ errorMessage }}</p>
    </section>

    <section v-else-if="isEmpty" class="playground-empty">
      <h2>等待示例代码</h2>
      <p>请从 docs 示例卡片点击“Open in Local Playground”进入当前页面。</p>
    </section>

    <section v-else class="playground-repl">
      <Repl
        :store="store"
        :editor="CodeMirror"
        layout="horizontal"
        :showCompileOutput="true"
        :showImportMap="true"
        :showOpenSourceMap="false"
        :showSsrOutput="false"
        :showTsConfig="false"
        :clearConsole="false"
      />
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { strFromU8, unzlibSync } from 'fflate'
import { Repl, useStore } from '@vue/repl'
import CodeMirror from '@vue/repl/codemirror-editor'

type PlaygroundFiles = Record<string, string>
type DecodedPayload = {
  files: PlaygroundFiles
  importMap: Record<string, unknown> | null
  activeFile: string | null
}

const playgroundBaseToken = '__AMU_SFC_PLAYGROUND_BASE__'
const playgroundMetaFilename = '__playground_meta__.json'

const isReady = ref(false)
const isEmpty = ref(false)
const errorMessage = ref('')
const builtinImportMap = ref({ imports: {} as Record<string, string> })

const store = useStore({
  builtinImportMap,
  showOutput: ref(true),
  outputMode: ref('preview'),
})

const statusText = computed(() => {
  if (errorMessage.value) return '当前示例未能完成解析。'
  if (isEmpty.value) return '等待 docs 侧传入示例代码。'
  if (!isReady.value) return '正在初始化本地 REPL...'
  return '当前页面使用本地 sfc-playground 承载示例。'
})

function decodeHashPayload(hash: string) {
  const raw = hash.replace(/^#/, '').trim()
  if (!raw) return null

  const binary = atob(raw)
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0))
  const json = strFromU8(unzlibSync(bytes))

  return JSON.parse(json) as PlaygroundFiles
}

function resolveRuntimeBase() {
  return new URL(import.meta.env.BASE_URL, window.location.origin).toString()
}

function replacePlaygroundBaseToken(code: string, runtimeBase: string) {
  return code.replaceAll(playgroundBaseToken, runtimeBase)
}

function normalizeDecodedFiles(rawFiles: PlaygroundFiles): DecodedPayload {
  const runtimeBase = resolveRuntimeBase()
  const files = Object.fromEntries(
    Object.entries(rawFiles).map(([filePath, code]) => [filePath, replacePlaygroundBaseToken(code, runtimeBase)]),
  ) as PlaygroundFiles

  const importMapText = files['import-map.json']
  const importMap = importMapText ? (JSON.parse(importMapText) as Record<string, unknown>) : null
  const metaText = files[playgroundMetaFilename]
  const meta = metaText ? (JSON.parse(metaText) as { activeFile?: string }) : null

  delete files['import-map.json']
  delete files[playgroundMetaFilename]

  return {
    files,
    importMap,
    activeFile: meta?.activeFile || null,
  }
}

function toStoreFilename(filePath: string) {
  return filePath.startsWith('src/') ? filePath : `src/${filePath}`
}

async function loadFromHash() {
  errorMessage.value = ''
  isReady.value = false

  try {
    const decoded = decodeHashPayload(window.location.hash)

    if (!decoded) {
      isEmpty.value = true
      return
    }

    isEmpty.value = false
    const payload = normalizeDecodedFiles(decoded)
    await store.setFiles(payload.files, payload.files['App.vue'] ? 'App.vue' : Object.keys(payload.files)[0])

    if (payload.importMap) {
      store.setImportMap(payload.importMap)
    }

    if (payload.activeFile) {
      const activeFilename = toStoreFilename(payload.activeFile)
      if (store.files[activeFilename]) {
        store.setActive(activeFilename)
      }
    }

    isReady.value = true
  } catch (error) {
    console.error(error)
    errorMessage.value = error instanceof Error ? error.message : '示例代码解析失败。'
  }
}

onMounted(async () => {
  await loadFromHash()
  window.addEventListener('hashchange', loadFromHash)
})
</script>

<style scoped>
.playground-shell {
  min-height: 100vh;
  padding: 20px;
  background:
    radial-gradient(circle at top left, rgba(36, 99, 235, 0.12), transparent 28%),
    radial-gradient(circle at top right, rgba(16, 185, 129, 0.12), transparent 24%),
    #f3f6fb;
  color: #10233f;
}

.playground-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin: 0 auto 16px;
  max-width: 1600px;
}

.playground-eyebrow {
  margin: 0 0 6px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #315efb;
}

.playground-title {
  margin: 0;
  font-size: 28px;
  line-height: 1.1;
}

.playground-subtitle {
  margin: 0;
  font-size: 14px;
  color: #50627d;
}

.playground-repl,
.playground-empty {
  max-width: 1600px;
  margin: 0 auto;
  min-height: calc(100vh - 120px);
  border: 1px solid rgba(16, 35, 63, 0.08);
  border-radius: 20px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.08);
}

.playground-empty {
  display: grid;
  place-items: center;
  padding: 40px;
  text-align: center;
}

.playground-empty h2 {
  margin: 0 0 8px;
  font-size: 24px;
}

.playground-empty p {
  margin: 0;
  color: #50627d;
}

:deep(.vue-repl) {
  height: calc(100vh - 120px);
}

@media (max-width: 960px) {
  .playground-shell {
    padding: 12px;
  }

  .playground-header {
    align-items: flex-start;
    flex-direction: column;
  }

  :deep(.vue-repl) {
    height: calc(100vh - 152px);
  }
}
</style>