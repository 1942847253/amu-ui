<template>
  <div class="demo-row">
    <amu-button @click="visible = true">打开预览</amu-button>
  </div>

  <div ref="teleportHost" class="teleport-host"></div>

  <amu-image-viewer
    v-if="teleportHost"
    v-model:visible="visible"
    :url-list="urlList"
    :teleport="teleportHost"
    :z-index="3001"
    :mask-style="maskStyle"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuImageViewer } from 'amu-ui/image-viewer'
import { AmuButton } from 'amu-ui/button'

const visible = ref(false)
const teleportHost = ref<HTMLElement | null>(null)
const urlList = [
  'https://picsum.photos/id/1024/1000/600',
  'https://picsum.photos/id/1023/1000/600',
]

const maskStyle = {
  background: 'var(--amu-color-bg-mask)',
}
</script>

<style scoped>
.demo-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.teleport-host {
  position: relative;
}
</style>
