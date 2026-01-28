<template>
  <AmuSpace direction="vertical" size="large">
    <AmuUpload
      action="https://httpbin.org/post"
      :show-file-list="false"
      :disabled="disabled"
    >
      <AmuButton type="primary" :disabled="disabled">上传头像</AmuButton>
      <template #tip>
        <div class="upload-tip">隐藏文件列表，可用于头像上传场景。</div>
      </template>
    </AmuUpload>
    <AmuSpace align="center">
      <span class="label">禁用上传</span>
      <AmuSwitch v-model="disabled" />
    </AmuSpace>
  </AmuSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuUpload } from 'amu-ui/upload'
import { AmuButton } from 'amu-ui/button'
import { AmuSwitch } from 'amu-ui/switch'
import { AmuSpace } from 'amu-ui/space'

const disabled = ref(false)
</script>

<style scoped>
.upload-tip {
  color: var(--amu-color-text-default);
  font-size: 12px;
}

.label {
  color: var(--amu-color-text-default);
}
</style>
