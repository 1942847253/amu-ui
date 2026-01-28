<template>
  <AmuUpload
    ref="uploadRef"
    action="https://httpbin.org/post"
    v-model:fileList="fileList"
  >
    <AmuButton type="primary">选择文件</AmuButton>
    <template #file="{ file }">
      <div class="custom-file">
        <span class="name" @click="handlePreview(file)">{{ file.name }}</span>
        <span class="size">{{ formatSize(file.size) }}</span>
        <AmuButton size="mini" type="text" @click="removeFile(file)">移除</AmuButton>
      </div>
    </template>
  </AmuUpload>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuUpload } from 'amu-ui/upload'
import { AmuButton } from 'amu-ui/button'
import { AmuMessage } from 'amu-ui/message'
import type { UploadFile } from 'amu-ui/upload'

type UploadExpose = {
  handleRemove: (file: UploadFile) => void
}

const uploadRef = ref<UploadExpose | null>(null)
const fileList = ref<UploadFile[]>([])

const formatSize = (size?: number) => {
  if (!size) return '-'
  if (size < 1024) return `${size}B`
  if (size < 1024 * 1024) return `${Math.round(size / 1024)}KB`
  return `${(size / 1024 / 1024).toFixed(1)}MB`
}

const handlePreview = (file: UploadFile) => {
  AmuMessage.info(`预览：${file.name}`)
}

const removeFile = (file: UploadFile) => {
  uploadRef.value?.handleRemove(file)
}
</script>

<style scoped>
.custom-file {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 4px 0;
  color: var(--amu-color-text-default);
}

.name {
  cursor: pointer;
  color: var(--amu-color-text);
}

.size {
  font-size: 12px;
  color: var(--amu-color-text-default);
}
</style>
