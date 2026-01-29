<template>
  <amu-preview-image :src="src" :width="240" :height="160">
    <template #mask>
      <span class="mask-text">自定义遮罩</span>
    </template>
  </amu-preview-image>
</template>

<script setup lang="ts">
import { AmuPreviewImage } from 'amu-ui/image-viewer'

const src = 'https://picsum.photos/id/1025/1000/600'
</script>

<style scoped>
.mask-text {
  font-size: 14px;
  font-weight: 500;
}
</style>
