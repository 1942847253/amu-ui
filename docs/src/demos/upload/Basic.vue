<template>
  <AmuSpace direction="vertical" size="large">
    <AmuUpload
      action="https://httpbin.org/post"
      name="avatar"
      method="post"
      :headers="headers"
      :data="extraData"
      :with-credentials="false"
      v-model:fileList="fileList"
      @success="handleSuccess"
      @error="handleError"
      @progress="handleProgress"
      @change="handleChange"
    >
      <AmuButton type="primary">点击上传</AmuButton>
      <template #tip>
        <div class="upload-tip">支持单文件上传，自动展示进度。</div>
      </template>
    </AmuUpload>
    <div class="upload-progress">{{ progressText }}</div>
  </AmuSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuUpload } from 'amu-ui/upload'
import { AmuButton } from 'amu-ui/button'
import { AmuMessage } from 'amu-ui/message'
import { AmuSpace } from 'amu-ui/space'
import type { UploadFile } from 'amu-ui/upload'

const fileList = ref<UploadFile[]>([])
const progressText = ref('等待上传')

const headers = {
  'X-Request-Id': 'docs-upload'
}

const extraData = {
  biz: 'docs',
  scene: 'basic'
}

const handleSuccess = () => {
  AmuMessage.success('上传成功')
}

const handleError = () => {
  AmuMessage.error('上传失败')
}

const handleProgress = (evt: ProgressEvent) => {
  const percent = Math.round(((evt as any).percent ?? 0) as number)
  progressText.value = `上传进度：${percent}%`
}

const handleChange = (file: UploadFile) => {
  progressText.value = `当前文件：${file.name}`
}
</script>

<style scoped>
.upload-tip {
  color: var(--amu-color-text-default);
  font-size: 12px;
}

.upload-progress {
  color: var(--amu-color-text-default);
  font-size: 12px;
}
</style>
