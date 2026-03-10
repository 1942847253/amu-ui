<template>
  <aside
    :class="[
      'amu-layout-sider',
      {
        'amu-layout-sider--collapsed': mergedCollapsed,
        'amu-layout-sider--zero-width': isZeroWidth,
        [`amu-layout-sider--${position}`]: position
      }
    ]"
    :data-amu-theme="themeAttr"
    :style="siderStyle"
  >
    <div class="amu-layout-sider__content">
      <slot />
    </div>
    <div
      v-if="collapsible"
      class="amu-layout-sider__trigger"
      role="button"
      tabindex="0"
      @click="handleTriggerClick"
      @keydown.enter="handleTriggerClick"
    >
      <slot name="trigger">{{ mergedCollapsed ? '>' : '<' }}</slot>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { siderProps, siderEmits } from './props'

defineOptions({
  name: 'AmuSider'
})

const props = defineProps(siderProps)
const emit = defineEmits(siderEmits)

const themeAttr = computed(() => {
  return props.theme === 'dark' ? 'dark' : undefined
})

const innerCollapsed = ref(props.defaultCollapsed)

watch(
  () => props.defaultCollapsed,
  (val) => {
    if (props.collapsed === undefined) {
      innerCollapsed.value = val
    }
  }
)

const mergedCollapsed = computed(() => {
  return props.collapsed ?? innerCollapsed.value
})

// 计算侧边栏样式
const isZeroWidth = computed(() => mergedCollapsed.value && Number(props.collapsedWidth) === 0)

const siderStyle = computed(() => {
  const width = mergedCollapsed.value ? props.collapsedWidth : props.width
  const widthValue = typeof width === 'number' ? `${width}px` : width
  
  return {
    flex: `0 0 ${widthValue}`,
    maxWidth: widthValue,
    minWidth: widthValue,
    width: widthValue
  }
})

const handleTriggerClick = () => {
  const next = !mergedCollapsed.value
  if (props.collapsed === undefined) {
    innerCollapsed.value = next
  }
  emit('update:collapsed', next)
  emit('collapse', next)
}
</script>
