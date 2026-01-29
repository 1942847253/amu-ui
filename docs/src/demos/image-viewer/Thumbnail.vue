<template>
  <amu-preview-image :url-list="urlList" :width="240" :height="160" />
</template>

<script setup lang="ts">
import { AmuPreviewImage } from 'amu-ui/image-viewer'

const urlList = [
  'https://picsum.photos/id/1018/1000/600',
  'https://picsum.photos/id/1015/1000/600',
  'https://picsum.photos/id/1019/1000/600',
]
</script>
