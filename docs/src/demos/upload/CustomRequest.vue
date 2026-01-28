<template>
  <AmuUpload
    action="/mock-upload"
    :http-request="mockRequest"
    v-model:fileList="fileList"
    @progress="handleProgress"
    @success="handleSuccess"
    @error="handleError"
  >
    <AmuButton type="primary">自定义上传</AmuButton>
    <template #tip>
      <div class="upload-tip">文件名包含 fail 将触发失败。</div>
    </template>
  </AmuUpload>
  <div class="upload-progress">{{ progressText }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuUpload } from 'amu-ui/upload'
import { AmuButton } from 'amu-ui/button'
import { AmuMessage } from 'amu-ui/message'
import type { UploadFile, UploadHttpRequest, UploadRequestOptions, UploadProgressEvent } from 'amu-ui/upload'

const fileList = ref<UploadFile[]>([])
const progressText = ref('等待上传')

const mockRequest: UploadHttpRequest = (options: UploadRequestOptions) => {
  let percent = 0
  const timer = window.setInterval(() => {
    percent += 20
    options.onProgress({ percent } as UploadProgressEvent)
    if (percent >= 100) {
      window.clearInterval(timer)
      if (options.file.name.includes('fail')) {
        options.onError(new Error('模拟失败') as any)
      } else {
        options.onSuccess({ ok: true })
      }
    }
  }, 300)

  return {
    abort() {
      window.clearInterval(timer)
      options.onError(new Error('已取消') as any)
    }
  } as XMLHttpRequest
}

const handleProgress = (evt: ProgressEvent) => {
  const percent = Math.round(((evt as any).percent ?? 0) as number)
  progressText.value = `上传进度：${percent}%`
}

const handleSuccess = () => {
  AmuMessage.success('上传成功')
}

const handleError = () => {
  AmuMessage.error('上传失败')
}
</script>

<style scoped>
.upload-tip {
  color: var(--amu-color-text-default);
  font-size: 12px;
}

.upload-progress {
  margin-top: 8px;
  color: var(--amu-color-text-default);
  font-size: 12px;
}
</style>
