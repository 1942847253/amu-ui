<template>
  <nav v-if="items.length" class="toc">
    <div class="toc__list">
      <a
        v-for="it in items"
        :key="it.id"
        class="toc__link"
        :class="[{ 'is-active': it.id === activeId }, `lvl-${it.level}`]"
        :href="`#${it.id}`"
        @click.prevent="scrollTo(it.id)"
      >
        {{ it.text }}
      </a>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

const props = defineProps<{
  root: HTMLElement | null;
}>();

const route = useRoute();

const items = ref<TocItem[]>([]);
const activeId = ref("");

let observer: IntersectionObserver | null = null;
let mutationObserver: MutationObserver | null = null;

function slugify(raw: string) {
  const s = raw.trim().toLowerCase();
  // 保留中文/英文/数字，其它字符转为 '-'
  return s
    .replace(/\s+/g, "-")
    .replace(/[^\u4e00-\u9fa5a-z0-9\-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function ensureHeadingIds(headings: Element[]) {
  const used = new Set<string>();
  for (const h of headings) {
    const el = h as HTMLElement;
    const text = (el.textContent ?? "").trim();
    if (!text) continue;

    let id = el.id || slugify(text);
    if (!id) continue;

    let unique = id;
    let i = 1;
    while (used.has(unique) || document.getElementById(unique)) {
      unique = `${id}-${i++}`;
    }

    el.id = unique;
    used.add(unique);
  }
}

function cleanupObserver() {
  if (observer) observer.disconnect();
  observer = null;
}

function cleanupMutationObserver() {
  if (mutationObserver) mutationObserver.disconnect();
  mutationObserver = null;
}

async function collect() {
  cleanupObserver();
  // Don't clear items immediately to avoid flicker during updates
  // items.value = []

  await nextTick();

  const root = props.root;
  if (!root) return;

  const headingEls = Array.from(root.querySelectorAll("h2, h3"));
  ensureHeadingIds(headingEls);

  const nextItems: TocItem[] = headingEls
    .map((h) => {
      const el = h as HTMLElement;
      const level = el.tagName === "H3" ? 3 : 2;
      const text = (el.textContent ?? "").trim();
      if (!el.id || !text) return null;
      return { id: el.id, text, level } as TocItem;
    })
    .filter((x): x is TocItem => Boolean(x));

  // Only update if changed to prevent unnecessary re-renders
  if (JSON.stringify(nextItems) !== JSON.stringify(items.value)) {
    items.value = nextItems;
    activeId.value = ""; // Reset active state on content change
  }

  if (!items.value.length) return;

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id;
        }
      });
    },
    { rootMargin: "-60px 0px -80% 0px" },
  );

  headingEls.forEach((el) => observer?.observe(el));
}

function setupMutationObserver() {
  cleanupMutationObserver();
  const root = props.root;
  if (!root) return;

  mutationObserver = new MutationObserver(() => {
    collect();
  });

  mutationObserver.observe(root, {
    childList: true,
    subtree: true,
  });
}

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) {
    window.scrollTo({
      top: el.offsetTop - 80,
      behavior: "smooth",
    });
    activeId.value = id;
    history.replaceState(null, "", `#${id}`);
  }
}

watch(
  () => [props.root, route.path],
  () => {
    collect();
    setupMutationObserver();
  },
  { immediate: true },
);

onMounted(() => {
  collect();
  setupMutationObserver();
});
onBeforeUnmount(() => {
  cleanupObserver();
  cleanupMutationObserver();
});
</script>

<style scoped>
.toc {
  position: relative;
}

.toc__list {
  position: relative;
}

.toc__link {
  display: block;
  padding: 8px 12px;
  font-size: 12px;
  color: var(--amu-text-2);
  line-height: 20px;
  transition: all 0.2s;
  border-radius: var(--amu-radius);
  text-decoration: none;
}

.toc__link:hover {
  color: var(--amu-text-1);
  background-color: var(--amu-bg-code);
}

.toc__link.is-active {
  color: var(--amu-brand);
  background-color: var(--amu-bg-code);
  font-weight: 500;
}

.toc__link.lvl-3 {
  padding-left: 24px;
}
</style>
