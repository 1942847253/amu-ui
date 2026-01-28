<template>
  <AmuUpload
    drag
    multiple
    accept="image/*"
    list-type="picture"
    action="https://httpbin.org/post"
  >
    <div class="drag-area">
      <div class="drag-icon">
        <AmuIcon :size="24" color="var(--amu-color-primary)">
          <IconUpload />
        </AmuIcon>
      </div>
      <div class="drag-title">拖拽图片到此处上传</div>
      <div class="drag-desc">支持多选，点击也可选择文件</div>
    </div>
  </AmuUpload>
</template>

<script setup lang="ts">
import { AmuUpload } from 'amu-ui/upload'
import { AmuIcon } from 'amu-ui/icon'
import { IconUpload } from '@amu-ui/icons'
</script>

<style scoped>
.drag-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 0;
  color: var(--amu-color-text-default);
}

.drag-icon {
  width: 48px;
  height: 48px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--amu-color-bg-fill);
  border: 1px solid var(--amu-color-border);
}

.drag-title {
  font-weight: 500;
  color: var(--amu-color-text);
}

.drag-desc {
  font-size: 12px;
  color: var(--amu-color-text-default);
}
</style>
