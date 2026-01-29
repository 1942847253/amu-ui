<template>
  <div class="demo-list">
    <amu-preview-image
      :url-list="urlList"
      :initial-index="1"
      :width="240"
      :height="160"
      @preview="handlePreview"
    />
    <div class="demo-text">当前索引：{{ lastIndex }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuPreviewImage } from 'amu-ui/image-viewer'

const urlList = [
  'https://picsum.photos/id/1018/1000/600',
  'https://picsum.photos/id/1015/1000/600',
  'https://picsum.photos/id/1019/1000/600',
]

const lastIndex = ref(1)

const handlePreview = (_url: string, index: number) => {
  lastIndex.value = index
}
</script>

<style scoped>
.demo-list {
  display: flex;
  align-items: center;
  gap: 12px;
}

.demo-text {
  font-size: 14px;
  color: var(--amu-color-text-default);
}
</style>
