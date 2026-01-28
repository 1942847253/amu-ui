<template>
  <AmuUpload
    action="https://httpbin.org/post"
    multiple
    accept="image/*"
    :limit="limit"
    :before-upload="beforeUpload"
    :before-remove="beforeRemove"
    @exceed="handleExceed"
    @remove="handleRemove"
  >
    <AmuButton type="primary">上传图片</AmuButton>
    <template #tip>
      <div class="upload-tip">最多上传 {{ limit }} 张图片，单张不超过 1MB。</div>
    </template>
  </AmuUpload>
</template>

<script setup lang="ts">
import { AmuUpload } from 'amu-ui/upload'
import { AmuButton } from 'amu-ui/button'
import { AmuMessage } from 'amu-ui/message'
import type { UploadFile, UploadRawFile } from 'amu-ui/upload'

const limit = 2

const beforeUpload = (rawFile: UploadRawFile) => {
  const isImage = rawFile.type.startsWith('image/')
  const isLt1M = rawFile.size / 1024 / 1024 < 1

  if (!isImage) {
    AmuMessage.warning('仅支持图片文件')
    return false
  }

  if (!isLt1M) {
    AmuMessage.warning('图片大小不能超过 1MB')
    return false
  }

  return true
}

const beforeRemove = (file: UploadFile) => {
  return new Promise<boolean>((resolve) => {
    const ok = window.confirm(`确定移除 ${file.name} 吗？`)
    resolve(ok)
  })
}

const handleExceed = () => {
  AmuMessage.error(`最多只能上传 ${limit} 个文件`)
}

const handleRemove = (file: UploadFile) => {
  AmuMessage.info(`已移除：${file.name}`)
}
</script>

<style scoped>
.upload-tip {
  color: var(--amu-color-text-default);
  font-size: 12px;
}
</style>
