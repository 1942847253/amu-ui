<template>
  <section class="demo">
    <div class="demo__header">
      <div class="demo__title">
        <slot name="title">{{ title }}</slot>
      </div>

      <div class="demo__actions">
        <button class="demo__btn" type="button" @click="onCopy">复制</button>
        <button class="demo__btn" type="button" @click="expanded = !expanded">
          {{ expanded ? '收起代码' : '查看代码' }}
        </button>
      </div>
    </div>

    <div class="demo__preview">
      <slot />
    </div>

    <div v-if="expanded" class="demo__code">
      <CodeBlock :code="code" lang="vue" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CodeBlock from './CodeBlock.vue'

const props = defineProps<{
  title?: string
  code: string
}>()

const expanded = ref(false)

const onCopy = async () => {
  try {
    await navigator.clipboard.writeText(props.code)
  } catch {
    // 兜底：部分环境不支持 clipboard API
    const textarea = document.createElement('textarea')
    textarea.value = props.code
    textarea.style.position = 'fixed'
    textarea.style.left = '-9999px'
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
  }
}
</script>

<style scoped>
.demo {
  border: 1px solid var(--amu-border);
  border-radius: var(--amu-radius);
  background: var(--amu-bg-demo);
  overflow: hidden;
  margin-bottom: 24px;
}

.demo__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--amu-border);
}

.demo__title {
  font-weight: 600;
  color: var(--amu-text-1);
}

.demo__actions {
  display: flex;
  gap: 8px;
}

.demo__btn {
  height: 28px;
  padding: 0 10px;
  border-radius: var(--amu-radius);
  border: 1px solid var(--amu-border);
  background: var(--amu-bg-demo-ctrl);
  color: var(--amu-text-2);
  cursor: pointer;
  transition: all 0.2s;
}

.demo__btn:hover {
  border-color: var(--amu-text-1);
  color: var(--amu-text-1);
}

.demo__preview {
  padding: 24px;
  background: var(--amu-bg-body);
}

.demo__code {
  border-top: 1px solid var(--amu-border);
  background: var(--amu-bg-code);
}
</style>
