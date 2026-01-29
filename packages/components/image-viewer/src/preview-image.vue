<template>
  <div
    :class="['amu-preview-image', { 'is-disabled': disabled }]"
    :style="containerStyle"
    role="button"
    tabindex="0"
    @click="handleClick"
  >
    <img v-if="currentUrl" class="amu-preview-image__img" :src="currentUrl" :style="imgStyle" />
    <div class="amu-preview-image__mask">
      <slot name="mask">
        <amu-icon class="amu-preview-image__icon">
          <IconEye />
        </amu-icon>
        <span class="amu-preview-image__text">{{ previewLabel }}</span>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { AmuIcon } from '../../icon'
import { useLocale } from '@amu-ui/hooks'
import { IconEye } from '@amu-ui/icons'
import { previewImageProps, previewImageEmits } from './props'
import { previewImage } from './image-viewer-service'
import './style.css'

defineOptions({ name: 'AmuPreviewImage' })

const props = defineProps(previewImageProps)
const emit = defineEmits(previewImageEmits)
const { t } = useLocale()

const currentUrl = computed(() => props.src || props.urlList[props.initialIndex] || '')

const previewLabel = computed(() => props.previewText || t('el.imageViewer.preview'))

const containerStyle = computed(() => {
  const width = typeof props.width === 'number' ? `${props.width}px` : props.width
  const height = typeof props.height === 'number' ? `${props.height}px` : props.height
  return {
    width,
    height,
  }
})

const imgStyle = computed(() => ({
  objectFit: props.fit,
}))

const handleClick = (event: MouseEvent) => {
  if (props.disabled) return

  const urlList = props.urlList.length ? props.urlList : currentUrl.value ? [currentUrl.value] : []
  if (!urlList.length) return

  const safeIndex = Math.min(Math.max(props.initialIndex, 0), urlList.length - 1)

  emit('preview', currentUrl.value, safeIndex)
  previewImage({
    urlList,
    initialIndex: safeIndex,
    transitionOrigin: {
      x: event.clientX,
      y: event.clientY,
    },
  })
}
</script>
