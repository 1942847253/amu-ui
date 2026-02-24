<template>
  <transition-group
    tag="ul"
    :class="['amu-upload-list', `amu-upload-list--${listType}`, { 'is-disabled': disabled }]"
    name="amu-list"
  >
    <li
      v-for="file in files"
      :key="file.uid"
      :class="['amu-upload-list__item', `is-${file.status}`]"
    >
      <slot name="file" :file="file">
        <template v-if="listType === 'text' || listType === 'picture'">
          <div class="amu-upload-list__item-info">
            <amu-icon :size="48" class="amu-upload-list__item-thumbnail" v-if="listType === 'picture'">
              <img v-if="file.url" :src="file.url" alt="" />
              <icon-image v-else />
            </amu-icon>
            <amu-icon class="amu-upload-list__item-icon" v-else>
               <icon-file-text />
            </amu-icon>
            <span class="amu-upload-list__item-name" @click="handlePreview(file)">
               {{ file.name }}
            </span>
            <div class="amu-upload-list__item-actions-inline">
              <span class="amu-upload-list__item-status-label" v-if="file.status === 'success'">
                <amu-icon><icon-check /></amu-icon>
              </span>
              <span class="amu-upload-list__item-status-label is-fail" v-if="file.status === 'fail'">
                <amu-icon><icon-x /></amu-icon>
              </span>
              <amu-icon v-if="!disabled" class="amu-upload-list__item-close" @click="handleRemove(file)">
                <icon-x />
              </amu-icon>
            </div>
          </div>
          <amu-progress 
            v-if="file.status === 'uploading'"
            :percentage="Number(file.percentage)" 
            :stroke-width="2"
            :show-text="false"
          />
        </template>

        <template v-if="listType === 'picture-card'">
          <div v-if="file.status === 'uploading'" class="amu-upload-list__item-thumbnail">
            <div class="amu-upload-list__item-progress">
              <amu-progress type="circle" :percentage="Number(file.percentage)" :width="70" />
            </div>
          </div>
          <template v-else>
            <img
              v-if="file.url && isImageFile(file)"
              class="amu-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            />
            <div v-else class="amu-upload-list__item-thumbnail is-placeholder">
              <amu-icon>
                <icon-image v-if="isImageFile(file)" />
                <icon-file-text v-else />
              </amu-icon>
              <span class="amu-upload-list__item-name-card">{{ file.name }}</span>
            </div>
          </template>
          <div v-if="!disabled && file.status !== 'uploading'" class="amu-upload-list__item-actions">
            <span class="amu-upload-list__item-preview" @click="handlePreview(file)">
              <amu-icon><icon-zoom-in /></amu-icon>
            </span>
            <span class="amu-upload-list__item-delete" @click="handleRemove(file)">
              <amu-icon><icon-trash-2 /></amu-icon>
            </span>
          </div>
        </template>
      </slot>
    </li>
    <li
      v-if="$slots.append"
      class="amu-upload-list__item amu-upload-list__item--append"
      key="__append"
    >
      <slot name="append" />
    </li>
  </transition-group>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { AmuIcon } from '../../icon'
import { AmuProgress } from '../../progress'
import { 
  IconFileText, 
  IconCheck, 
  IconX, 
  IconImage, 
  IconZoomIn, 
  IconTrash2 
} from '@amu-ui/icons'
import type { UploadFile } from './types'
import type { UploadListType } from './props'

defineOptions({
  name: 'AmuUploadList'
})

const props = defineProps({
  files: {
    type: Array as PropType<UploadFile[]>,
    default: () => []
  },
  disabled: {
    type: Boolean,
    default: false
  },
  listType: {
    type: String as PropType<UploadListType>,
    default: 'text'
  }
})

const emit = defineEmits(['remove', 'preview'])

const isImageFile = (file: UploadFile) => {
  if (file.raw?.type) {
    return file.raw.type.startsWith('image/')
  }
  const lowerName = file.name.toLowerCase()
  return ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.bmp', '.svg'].some(ext => lowerName.endsWith(ext))
}

const handleRemove = (file: UploadFile) => {
  if (props.disabled) return
  emit('remove', file)
}

const handlePreview = (file: UploadFile) => {
  if (props.disabled) return
  emit('preview', file)
}

</script>
