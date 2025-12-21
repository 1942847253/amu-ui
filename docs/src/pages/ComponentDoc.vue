<template>
  <article v-if="entry" class="doc-content">
    <header class="doc-header">
      <div class="breadcrumbs">{{ breadcrumbs }}</div>
      <h1>{{ displayTitle }}</h1>
      <p v-if="entry.description" class="doc-desc">{{ entry.description }}</p>
    </header>

    <div class="doc-body">
      <section v-for="d in entry.demos" :key="d.key" class="doc-section">
        <h2>{{ d.title }}</h2>
        <p v-if="d.description">{{ d.description }}</p>
        <DemoTabs :demos="[d]" />
      </section>

      <section class="doc-section" v-if="Object.keys(apiData).length > 0">
        <h2>{{ t.componentDoc.apiReference }}</h2>
        
        <div v-for="(subApi, subName) in apiData" :key="subName" class="api-group">
          <h3 v-if="Object.keys(apiData).length > 1">{{ subName }}</h3>

          <div v-if="subApi.props.length > 0">
            <h4 v-if="Object.keys(apiData).length > 1">Props</h4>
            <PropsTable :rows="subApi.props" />
          </div>

          <div v-if="subApi.events.length > 0">
            <h4 v-if="Object.keys(apiData).length > 1">Events</h4>
            <EventsTable :rows="subApi.events" />
          </div>

          <div v-if="subApi.slots.length > 0">
            <h4 v-if="Object.keys(apiData).length > 1">Slots</h4>
            <SlotsTable :rows="subApi.slots" />
          </div>
        </div>
      </section>
    </div>
  </article>

  <article v-else class="doc-empty">
    <h1>{{ t.componentDoc.notFound }}</h1>
    <p>{{ t.componentDoc.notFoundDesc }}</p>
    <RouterLink to="/components" class="link">{{
      t.componentDoc.back
    }}</RouterLink>
  </article>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";

import DemoTabs from "../components/DemoTabs.vue";
import PropsTable from "../components/PropsTable.vue";
import EventsTable from "../components/EventsTable.vue";
import SlotsTable from "../components/SlotsTable.vue";

import api from "virtual:amu-docs-api";
import nav from "virtual:amu-docs-nav";
import { useLanguage } from "../composables/useLanguage";
import { messages } from "../locales";

const { lang } = useLanguage();
const t = computed(() => messages[lang.value]);

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
const description = ref<string | Record<string, string>>("");

const title = computed(() => {
  const found = nav.components.find((c) => c.name === name.value);
  return found?.title ?? name.value;
});

function resolveLocale(
  val: string | Record<string, string> | undefined,
): string {
  if (!val) return "";
  if (typeof val === "string") return val;
  return val[lang.value] || val["zh-CN"] || "";
}

const entry = computed<DocEntry | null>(() => {
  if (!name.value) return null;

  const resolvedDemos = demos.value.map((d) => ({
    ...d,
    title: resolveLocale(d.title),
    description: resolveLocale(d.description),
  }));

  return {
    name: name.value,
    title: title.value,
    description: resolveLocale(description.value) || undefined,
    demos: resolvedDemos,
  };
});

const displayTitle = computed(() => {
  const componentName = name.value;
  const comps = t.value.components as Record<string, string>;
  return comps[componentName] || entry.value?.title || componentName;
});

const breadcrumbs = computed(() => {
  const category = t.value.nav.components;
  return `${category} / ${displayTitle.value}`;
});

const apiData = computed(() => api.components[name.value] ?? {});

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
