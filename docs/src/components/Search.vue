<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useMagicKeys, onClickOutside } from '@vueuse/core'
import Fuse from 'fuse.js'
import { useLanguage } from '../composables/useLanguage'
import searchIndex from 'virtual:amu-docs-search-index'

const router = useRouter()
const { lang } = useLanguage()

const i18n = {
  'zh-CN': {
    placeholder: '搜索',
    inputPlaceholder: '搜索文档...',
    noResults: '无搜索结果',
    select: '选择',
    navigate: '切换',
    close: '关闭',
  },
  'en-US': {
    placeholder: 'Search',
    inputPlaceholder: 'Search docs...',
    noResults: 'No results',
    select: 'Select',
    navigate: 'Navigate',
    close: 'Close',
  }
}

const t = computed(() => i18n[lang.value])

const visible = ref(false)
const query = ref('')
const activeIndex = ref(0)
const searchInput = ref<HTMLInputElement>()
const modalRef = ref<HTMLElement>()

const fuse = new Fuse(searchIndex, {
  keys: ['title', 'titleZh', 'keywords'],
  threshold: 0.3,
})

const results = computed(() => {
  if (!query.value) return []
  return fuse.search(query.value).map(r => r.item)
})

const { Meta_K, Ctrl_K } = useMagicKeys()

watch([Meta_K, Ctrl_K], ([meta, ctrl]) => {
  if (meta || ctrl) {
    visible.value = true
    nextTick(() => searchInput.value?.focus())
  }
})

function open() {
  visible.value = true
  nextTick(() => searchInput.value?.focus())
}

function close() {
  visible.value = false
  query.value = ''
}

function onSelect(item: any) {
  router.push(item.route)
  close()
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    if (results.value.length) {
      activeIndex.value = (activeIndex.value + 1) % results.value.length
    }
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    if (results.value.length) {
      activeIndex.value = (activeIndex.value - 1 + results.value.length) % results.value.length
    }
  } else if (e.key === 'Enter') {
    e.preventDefault()
    if (results.value[activeIndex.value]) {
      onSelect(results.value[activeIndex.value])
    }
  } else if (e.key === 'Escape') {
    close()
  }
}

onClickOutside(modalRef, close)
</script>

<template>
  <div class="search-trigger" @click="open">
    <span class="search__icon">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    </span>
    <span class="search__placeholder">{{ t.placeholder }}</span>
    <span class="search__key">⌘ K</span>
  </div>

  <Teleport to="body">
    <Transition name="fade">
      <div v-if="visible" class="search-overlay">
        <div ref="modalRef" class="search-modal">
          <div class="search-input-wrapper">
            <span class="search-modal-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <input
              ref="searchInput"
              v-model="query"
              class="search-input"
              :placeholder="t.inputPlaceholder"
              @keydown="onKeydown"
            />
          </div>
          <div v-if="results.length" class="search-results">
            <div
              v-for="(item, index) in results"
              :key="item.route"
              class="search-result-item"
              :class="{ active: index === activeIndex }"
              @click="onSelect(item)"
              @mouseenter="activeIndex = index"
            >
              <div class="result-content">
                <div class="result-title">{{ lang === 'zh-CN' && item.titleZh ? `${item.title} ${item.titleZh}` : item.title }}</div>
                <div class="result-category">{{ item.category }}</div>
              </div>
              <div class="result-action">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </div>
          </div>
          <div v-else-if="query" class="search-empty">
            {{ t.noResults }}
          </div>
          <div class="search-footer">
            <span class="search-footer-item"><kbd>↵</kbd> {{ t.select }}</span>
            <span class="search-footer-item"><kbd>↑</kbd> <kbd>↓</kbd> {{ t.navigate }}</span>
            <span class="search-footer-item"><kbd>esc</kbd> {{ t.close }}</span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.search-trigger {
  display: flex;
  align-items: center;
  height: 36px;
  width: 240px;
  padding: 0 8px;
  background-color: var(--amu-bg-code);
  border: 1px solid transparent;
  border-radius: var(--amu-radius);
  cursor: pointer;
  transition: all 0.2s;
  color: var(--amu-text-2);
}

.search-trigger:hover {
  border-color: var(--amu-brand);
  background-color: var(--amu-bg-body);
}

.search__icon {
  display: flex;
  align-items: center;
  margin-right: 8px;
  color: var(--amu-text-3);
}

.search__placeholder {
  flex: 1;
  font-size: 14px;
  margin-right: 12px;
  color: var(--amu-text-3);
}

.search__key {
  font-size: 12px;
  color: var(--amu-text-3);
  background: rgba(0, 0, 0, 0.05);
  padding: 2px 6px;
  border-radius: 4px;
  line-height: 1;
}

.search-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 100px;
  backdrop-filter: blur(2px);
}

.search-modal {
  width: 560px;
  max-width: 90vw;
  background-color: var(--amu-bg-body);
  border-radius: var(--amu-radius-lg);
  box-shadow: var(--amu-shadow-3);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid var(--amu-border);
}

.search-modal-icon {
  color: var(--amu-text-3);
  margin-right: 12px;
  display: flex;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  color: var(--amu-text-1);
  background: transparent;
}

.search-results {
  max-height: 400px;
  overflow-y: auto;
  padding: 8px;
}

.search-result-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-radius: var(--amu-radius);
  cursor: pointer;
  margin-bottom: 4px;
  color: var(--amu-text-2);
}

.search-result-item.active {
  background-color: var(--amu-brand);
  color: #fff;
}

.search-result-item.active .result-category {
  color: rgba(255, 255, 255, 0.8);
}

.search-result-item.active .result-action {
  color: #fff;
}

.result-title {
  font-size: 14px;
  font-weight: 500;
}

.result-category {
  font-size: 12px;
  color: var(--amu-text-3);
  margin-top: 2px;
}

.result-action {
  color: var(--amu-text-3);
  display: flex;
}

.search-empty {
  padding: 32px;
  text-align: center;
  color: var(--amu-text-3);
}

.search-footer {
  padding: 8px 16px;
  border-top: 1px solid var(--amu-border);
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: var(--amu-text-3);
  background-color: var(--amu-bg-code);
}

.search-footer-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

kbd {
  background: rgba(0, 0, 0, 0.05);
  padding: 2px 4px;
  border-radius: 3px;
  font-family: inherit;
  line-height: 1;
  min-width: 16px;
  text-align: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
