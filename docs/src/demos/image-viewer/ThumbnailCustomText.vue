<template>
  <div class="demo-row">
    <amu-preview-image
      :src="src"
      :width="240"
      :height="160"
      fit="contain"
      preview-text="点击预览"
    />
  </div>
</template>

<script setup lang="ts">
import { AmuPreviewImage } from 'amu-ui/image-viewer'

const src = 'https://picsum.photos/id/1018/1000/600'
</script>

<style scoped>
.demo-row {
  display: flex;
  gap: 12px;
  align-items: center;
}
</style>
