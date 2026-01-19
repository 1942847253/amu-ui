<template>
  <div
    class="amu-card"
    :class="[
      `amu-card--${size}`,
      `amu-card--shadow-${shadow}`,
      {
        'amu-card--bordered': bordered,
        'amu-card--hoverable': hoverable,
        'amu-card--loading': loading,
        'amu-card--collapsed': isCollapsed,
        'amu-card--fullscreen': isFullscreen,
      },
    ]"
    ref="cardRef"
  >
    <!-- Head -->
    <div
      v-if="showHead"
      class="amu-card__header"
      :style="headStyle"
    >
      <div class="amu-card__header-wrapper">
        <div class="amu-card__title">
          <slot name="title">{{ title }}</slot>
        </div>
        <div class="amu-card__extra">
          <slot name="extra" />
          
          <!-- Built-in Tools -->
          <div v-if="hasTools" class="amu-card__tools">
            <button
              v-if="collapsible"
              type="button"
              class="amu-card__tool-btn"
              @click="toggleCollapse"
            >
              <span class="amu-card__icon-arrow" :class="{ 'is-rotated': isCollapsed }">▼</span>
            </button>
            <button
              v-if="maximizable"
              type="button"
              class="amu-card__tool-btn"
              @click="toggleFullscreen"
            >
              <span>{{ isFullscreen ? '❐' : '□' }}</span>
            </button>
            <button
              v-if="closable"
              type="button"
              class="amu-card__tool-btn"
              @click="handleClose"
            >
              <span>✕</span>
            </button>
          </div>
        </div>
      </div>
      <slot name="header-bottom" />
    </div>

    <!-- Cover -->
    <div v-if="$slots.cover" class="amu-card__cover">
      <slot name="cover" />
    </div>

    <!-- Body -->
    <div
      v-show="!isCollapsed"
      class="amu-card__body"
      :style="bodyStyle"
    >
      <div v-if="loading" class="amu-card__loading-content">
        <!-- Simple Skeleton -->
        <div class="amu-card__skeleton-row" style="width: 38%;"></div>
        <div class="amu-card__skeleton-row" style="width: 100%;"></div>
        <div class="amu-card__skeleton-row" style="width: 80%;"></div>
        <div class="amu-card__skeleton-row" style="width: 60%;"></div>
      </div>
      <slot v-else />
    </div>

    <!-- Actions (Footer-like but usually grid of buttons) -->
    <div v-if="$slots.actions" class="amu-card__actions">
      <slot name="actions" />
    </div>

    <!-- Footer -->
    <div v-if="$slots.footer" class="amu-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, useSlots, watch } from 'vue'
import { cardProps, cardEmits } from './props'

defineOptions({
  name: 'AmuCard',
})

const props = defineProps(cardProps)
const emit = defineEmits(cardEmits)
const slots = useSlots()
const cardRef = ref<HTMLElement>()

const isCollapsed = ref(props.collapsed ?? false)
const isFullscreen = ref(false)

watch(
  () => props.collapsed,
  (val) => {
    if (val !== undefined) isCollapsed.value = val
  }
)

const showHead = computed(() => props.title || slots.title || slots.extra || hasTools.value)
const hasTools = computed(() => props.collapsible || props.maximizable || props.closable)

const toggleCollapse = () => {
  const newVal = !isCollapsed.value
  isCollapsed.value = newVal
  emit('update:collapsed', newVal)
}

const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value
  emit('maximize', isFullscreen.value)
  // In a real scenario, useFullscreen from vueuse is better, 
  // or manually handle document.body.style.overflow to prevent scroll
  if (typeof document !== 'undefined') {
    if (isFullscreen.value) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }
}

const handleClose = () => {
  emit('close')
}
</script>

<style src="./style.css"></style>
