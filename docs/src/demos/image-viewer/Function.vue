<template>
  <amu-button @click="openPreview">Method Call Preview</amu-button>
</template>

<script setup lang="ts">
import { previewImage } from 'amu-ui/image-viewer'
import { AmuButton } from 'amu-ui/button'

const openPreview = () => {
  previewImage({
    urlList: [
       'https://picsum.photos/id/1025/800/600',
       'https://picsum.photos/id/1024/800/600',
    ],
    initialIndex: 0
  })
}
</script>
