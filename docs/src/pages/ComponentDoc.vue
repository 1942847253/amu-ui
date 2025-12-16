<template>
  <article v-if="entry" class="doc-content">
    <header class="doc-header">
      <div class="breadcrumbs">组件 / 通用</div>
      <h1>{{ displayTitle }}</h1>
      <p v-if="entry.description" class="doc-desc">{{ entry.description }}</p>
    </header>

    <div class="doc-body">
      <section v-for="d in entry.demos" :key="d.key" class="doc-section">
        <h2>{{ d.title }}</h2>
        <p v-if="d.description">{{ d.description }}</p>
        <DemoTabs :demos="[d]" />
      </section>

      <section class="doc-section" v-if="propsRows.length > 0">
        <h2>API Reference</h2>
        <PropsTable :rows="propsRows" />
      </section>
    </div>
  </article>

  <article v-else class="doc-empty">
    <h1>Component Not Found</h1>
    <p>The documentation for this component could not be found.</p>
    <RouterLink to="/components" class="link">Back to Components</RouterLink>
  </article>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";

import DemoTabs from "../components/DemoTabs.vue";
import PropsTable from "../components/PropsTable.vue";

import api from "virtual:amu-docs-api";
import nav from "virtual:amu-docs-nav";

type DocEntry = {
  name: string;
  title: string;
  description?: string;
  demos: any[];
};

const demoModules = import.meta.glob("../demos/*/index.ts");

const route = useRoute();
const name = computed(() => String(route.params.name || ""));

const demos = ref<any[]>([]);
const description = ref("");

const title = computed(() => {
  const found = nav.components.find((c) => c.name === name.value);
  return found?.title ?? name.value;
});

const entry = computed<DocEntry | null>(() => {
  if (!name.value) return null;
  return {
    name: name.value,
    title: title.value,
    description: description.value || undefined,
    demos: demos.value,
  };
});

const displayTitle = computed(() => {
  const t = entry.value?.title || "";
  const map: Record<string, string> = {
    Button: "按钮 Button",
  };
  return map[t] || t;
});

const propsRows = computed(() => api.components[name.value]?.props ?? []);

function findDemoLoaderKey(componentName: string) {
  const suffix = `/demos/${componentName}/index.ts`;
  const keys = Object.keys(demoModules);
  return keys.find((k) => k.endsWith(suffix));
}

watch(
  name,
  async (n) => {
    demos.value = [];
    description.value = "";
    if (!n) return;

    const key = findDemoLoaderKey(n);
    const loader = key
      ? (demoModules as Record<string, () => Promise<any>>)[key]
      : undefined;
    if (!loader) return;

    const mod = await loader();
    demos.value = mod.demos ?? mod.default ?? [];
    description.value = mod.meta?.description ?? "";
  },
  { immediate: true },
);
</script>

<style scoped>
.doc-header {
  margin-bottom: 48px;
}

.breadcrumbs {
  font-size: 12px;
  color: var(--amu-text-2);
  margin-bottom: 12px;
}

.doc-desc {
  font-size: 18px;
  line-height: 1.6;
  color: var(--amu-text-2);
  margin-top: 16px;
}

.doc-section {
  margin-bottom: 48px;
}

.doc-empty {
  padding: 48px 0;
  text-align: center;
}
</style>
