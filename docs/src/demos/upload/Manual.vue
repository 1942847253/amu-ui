<template>
  <AmuSpace direction="vertical" size="large">
    <AmuUpload
      ref="uploadRef"
      action="https://httpbin.org/post"
      :auto-upload="false"
      v-model:fileList="fileList"
      @success="handleSuccess"
      @remove="handleRemove"
    >
      <AmuButton type="primary">选择文件</AmuButton>
    </AmuUpload>
    <AmuSpace>
      <AmuButton type="primary" @click="submit">开始上传</AmuButton>
      <AmuButton @click="clear">清空列表</AmuButton>
      <AmuButton status="danger" @click="abort">取消上传</AmuButton>
    </AmuSpace>
  </AmuSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuUpload } from 'amu-ui/upload'
import { AmuButton } from 'amu-ui/button'
import { AmuSpace } from 'amu-ui/space'
import { AmuMessage } from 'amu-ui/message'
import type { UploadFile } from 'amu-ui/upload'

type UploadExpose = {
  submit: () => void
  clearFiles: () => void
  abort: () => void
}

const uploadRef = ref<UploadExpose | null>(null)
const fileList = ref<UploadFile[]>([])

const submit = () => {
  uploadRef.value?.submit()
}

const clear = () => {
  uploadRef.value?.clearFiles()
}

const abort = () => {
  uploadRef.value?.abort()
  AmuMessage.info('已取消上传')
}

const handleSuccess = () => {
  AmuMessage.success('上传完成')
}

const handleRemove = (file: UploadFile) => {
  AmuMessage.info(`已移除：${file.name}`)
}
</script>
