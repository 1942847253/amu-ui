<template>
  <div>
    <amu-button @click="visible = true">Open Image Viewer</amu-button>
    <amu-image-viewer
      v-model:visible="visible"
      :url-list="urlList"
    />
  </div>
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
