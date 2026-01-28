<template>
  <AmuSpace direction="vertical" size="large">
    <div class="list-block">
      <div class="list-title">文本列表</div>
      <AmuUpload
        action="https://httpbin.org/post"
        :file-list="textList"
        list-type="text"
        :auto-upload="false"
        @preview="handlePreview"
      />
    </div>
    <div class="list-block">
      <div class="list-title">图片列表</div>
      <AmuUpload
        action="https://httpbin.org/post"
        :file-list="pictureList"
        list-type="picture"
        :auto-upload="false"
        @preview="handlePreview"
      />
    </div>
    <div class="list-block">
      <div class="list-title">卡片列表</div>
      <AmuUpload
        action="https://httpbin.org/post"
        :file-list="cardList"
        list-type="picture-card"
        :auto-upload="false"
        @preview="handlePreview"
      />
    </div>
  </AmuSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuUpload } from 'amu-ui/upload'
import { AmuSpace } from 'amu-ui/space'
import { AmuMessage } from 'amu-ui/message'
import type { UploadFile } from 'amu-ui/upload'

const imageUrl = 'https://picsum.photos/seed/amu/200/120'

const textList = ref<UploadFile[]>([
  {
    name: '设计稿.pdf',
    status: 'success',
    uid: 1
  }
])

const pictureList = ref<UploadFile[]>([
  {
    name: '海报.png',
    status: 'success',
    uid: 2,
    url: imageUrl
  }
])

const cardList = ref<UploadFile[]>([
  {
    name: '封面.png',
    status: 'success',
    uid: 3,
    url: imageUrl
  }
])

const handlePreview = (file: UploadFile) => {
  AmuMessage.info(`预览：${file.name}`)
}
</script>

<style scoped>
.list-block {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.list-title {
  color: var(--amu-color-text);
  font-weight: 500;
}
</style>
