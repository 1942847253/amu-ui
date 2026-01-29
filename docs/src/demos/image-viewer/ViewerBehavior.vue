<template>
  <div class="demo-row">
    <amu-button @click="visible = true">打开预览</amu-button>
    <span class="demo-text">事件：{{ lastEvent }}</span>
  </div>

  <amu-image-viewer
    v-model:visible="visible"
    :url-list="urlList"
    :infinite="false"
    :hide-on-click-modal="true"
    :close-on-press-escape="false"
    @change="handleChange"
    @rotate="handleRotate"
    @close="handleClose"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuImageViewer } from 'amu-ui/image-viewer'
import { AmuButton } from 'amu-ui/button'

const visible = ref(false)
const lastEvent = ref('无')
const urlList = [
  'https://picsum.photos/id/1018/1000/600',
  'https://picsum.photos/id/1015/1000/600',
  'https://picsum.photos/id/1019/1000/600',
]

const handleChange = (index: number) => {
  lastEvent.value = `切换到 ${index}`
}

const handleRotate = (deg: number) => {
  lastEvent.value = `旋转到 ${deg}°`
}

const handleClose = () => {
  lastEvent.value = '关闭'
}
</script>

<style scoped>
.demo-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.demo-text {
  font-size: 14px;
  color: var(--amu-color-text-default);
}
</style>
