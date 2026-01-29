<template>
  <amu-preview-image :src="src" :width="240" :height="160" disabled />
</template>

<script setup lang="ts">
import { AmuPreviewImage } from 'amu-ui/image-viewer'

const src = 'https://picsum.photos/id/1015/1000/600'
</script>
