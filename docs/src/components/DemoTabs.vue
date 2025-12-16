<template>
  <section class="demo-card">
    <div class="demo-preview">
      <component :is="activeDemo.component" />
    </div>

    <div class="demo-meta">
      <div class="demo-actions">
        <button
          class="action-btn"
          @click="expanded = !expanded"
          :title="expanded ? 'Hide Code' : 'Show Code'"
          :class="{ active: expanded }"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
        </button>
        <button
          class="action-btn"
          @click="onCopy"
          title="Copy Code"
          :class="{ copied: isCopied }"
        >
          <svg
            v-if="!isCopied"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path
              d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2-2v1"
            ></path>
          </svg>
          <svg
            v-else
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </button>
        <a
          class="action-btn"
          href="https://codesandbox.io/"
          target="_blank"
          title="Open in CodeSandbox"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
            ></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
        </a>
      </div>
    </div>

    <div class="demo-source" v-show="expanded">
      <CodeBlock :code="activeDemo.code" :lang="activeDemo.lang" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import CodeBlock from "./CodeBlock.vue";

export type DemoItem = {
  key: string;
  title: string;
  description?: string;
  component: any;
  code: string;
  lang?: "vue" | "html" | "ts" | "typescript";
};

const props = defineProps<{
  demos: DemoItem[];
}>();

const expanded = ref(false);
const activeIndex = ref(0);
const isCopied = ref(false);

const activeDemo = computed(
  () => props.demos[activeIndex.value] ?? props.demos[0],
);

const onCopy = async () => {
  if (!activeDemo.value) return;
  try {
    await navigator.clipboard.writeText(activeDemo.value.code);
    isCopied.value = true;
    setTimeout(() => {
      isCopied.value = false;
    }, 2000);
  } catch {
    // Fallback
  }
};
</script>

<style scoped>
.demo-card {
  margin: 24px 0;
  transition: all 0.2s;
}

.demo-preview {
  padding: 48px;
  overflow-x: auto;
  border: 1px solid var(--amu-border);
  border-radius: var(--amu-radius);
  background-color: var(--amu-bg-demo);
}

.demo-meta {
  position: relative;
  padding: 8px 0px;
  border-top: 1px dashed var(--amu-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.demo-actions {
  display: flex;
  gap: 8px;
  margin-left: auto;
}

.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  color: var(--amu-text-2);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn svg {
  width: 14px;
  height: 14px;
}

.action-btn:hover {
  background-color: var(--amu-bg-demo-ctrl);
  color: var(--amu-text-1);
}

.action-btn.active {
  background-color: var(--amu-bg-demo-ctrl);
  color: var(--amu-brand);
}

.action-btn.copied {
  color: #00b42a;
  /* Arco Success Green */
}

.demo-source {
  border-top: 1px dashed var(--amu-border);
  background-color: var(--amu-bg-code);
  padding: 12px;
}

/* Override CodeBlock styles */
:deep(.code) {
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
  background: transparent !important;
  font-size: 13px !important;
}
</style>
