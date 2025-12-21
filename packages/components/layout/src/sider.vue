<template>
  <aside
    :class="[
      'amu-layout-sider',
      {
        'amu-layout-sider--collapsed': collapsed,
        'amu-layout-sider--zero-width': isZeroWidth,
        [`amu-layout-sider--${position}`]: position
      }
    ]"
    :style="siderStyle"
  >
    <div class="amu-layout-sider__content">
      <slot />
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { siderProps, siderEmits } from './props'

defineOptions({
  name: 'AmuSider'
})

const props = defineProps(siderProps)
defineEmits(siderEmits)

// 计算侧边栏样式
const isZeroWidth = computed(() => props.collapsed && Number(props.collapsedWidth) === 0)

const siderStyle = computed(() => {
  const width = props.collapsed ? props.collapsedWidth : props.width
  const widthValue = typeof width === 'number' ? `${width}px` : width
  
  return {
    flex: `0 0 ${widthValue}`,
    maxWidth: widthValue,
    minWidth: widthValue,
    width: widthValue
  }
})
</script>
