<template>
  <div class="demo-row">
    <amu-button @click="visible = true">打开小窗口</amu-button>
  </div>

  <amu-image-viewer
    v-model:visible="visible"
    :url-list="urlList"
    windowed
    :window-width="920"
    :window-height="560"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuImageViewer } from 'amu-ui/image-viewer'
import { AmuButton } from 'amu-ui/button'

const visible = ref(false)
const urlList = [
  'https://picsum.photos/id/1018/1000/600',
  'https://picsum.photos/id/1015/1000/600',
  'https://picsum.photos/id/1019/1000/600',
]
</script>

<style scoped>
.demo-row {
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>
