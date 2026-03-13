<template>
  <section class="demo-card">
    <div class="demo-preview">
      <component :is="activeDemo.component" />
    </div>

    <div class="demo-meta" v-if="activeDemo.code !== ''">
      <div class="demo-actions">
        <AmuPopup trigger="hover" placement="top" class="demo-tooltip">
          <template #reference>
            <button
              class="action-btn"
              @click="expanded = !expanded"
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
          </template>
          <div class="demo-tooltip-content">
            {{ expanded ? "Hide Code" : "Show Code" }}
          </div>
        </AmuPopup>

        <AmuPopup trigger="hover" placement="top" class="demo-tooltip">
          <template #reference>
            <button
              class="action-btn"
              @click="onCopy"
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
          </template>
          <div class="demo-tooltip-content">
            {{ isCopied ? "Copied!" : "Copy Code" }}
          </div>
        </AmuPopup>

        <AmuPopup trigger="hover" placement="top" class="demo-tooltip">
          <template #reference>
            <button class="action-btn" @click="handleOpenStackBlitz">
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
                <polygon
                  points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"
                ></polygon>
              </svg>
            </button>
          </template>
          <div class="demo-tooltip-content">Open in StackBlitz</div>
        </AmuPopup>

        <AmuPopup trigger="hover" placement="top" class="demo-tooltip">
          <template #reference>
            <button class="action-btn" @click="handleOpenVuePlayground">
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
                <path d="M2 3l10 18L22 3"></path>
                <path d="M6 3l6 10 6-10"></path>
              </svg>
            </button>
          </template>
          <div class="demo-tooltip-content">Open in Local Playground</div>
        </AmuPopup>
      </div>
    </div>

    <div class="demo-source" v-show="expanded">
      <CodeBlock :code="activeDemo.code" :lang="activeDemo.lang" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { AmuPopup } from "amu-ui";
import CodeBlock from "./CodeBlock.vue";
import { openInStackBlitz } from "../utils/open-in-stackblitz";
import { openInVuePlayground } from "../utils/open-in-vue-playground";

export type DemoItem = {
  key: string;
  title: string | Record<string, string>;
  description?: string | Record<string, string>;
  component: any;
  code: string;
  lang?: "vue" | "html" | "ts" | "typescript";
};

const props = defineProps<{
  demos: DemoItem[];
  componentName: string;
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

const openSandboxWindow = () => {
  const popup = window.open("about:blank", "_blank");
  if (popup?.document) {
    popup.document.write("<title>Loading demo...</title><p style=\"font-family: sans-serif; padding: 16px;\">Opening local demo...</p>");
  }
  return popup;
};

const handleOpenStackBlitz = async () => {
  if (!activeDemo.value) return;
  const popup = openSandboxWindow();

  try {
    await openInStackBlitz({
      componentName: props.componentName,
      demoKey: activeDemo.value.key,
      code: activeDemo.value.code,
      title: activeDemo.value.key,
      popup,
    });
  } catch (error) {
    popup?.close();
    console.error(error);
  }
};

const handleOpenVuePlayground = async () => {
  if (!activeDemo.value) return;

  const popup = openSandboxWindow();

  try {
    await openInVuePlayground({
      componentName: props.componentName,
      demoKey: activeDemo.value.key,
      code: activeDemo.value.code,
      title: activeDemo.value.key,
      popup,
    });
  } catch (error) {
    popup?.close();
    console.error(error);
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

.demo-tooltip-content {
  padding: 4px 8px;
  font-size: 12px;
  background: var(--amu-text-1);
  color: var(--amu-text-inverse);
  border-radius: 4px;
}
</style>

<style>
/* Global styles for the tooltip popper */
.demo-tooltip .amu-popup__arrow {
  background: var(--amu-text-1) !important;
}
.demo-tooltip::before {
  background: var(--amu-text-1) !important;
}
</style>
