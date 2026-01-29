<template>
  <Teleport v-if="!windowed" :to="teleport" :disabled="!teleport">
    <div v-if="mounted" ref="wrapperRef" :class="['amu-image-viewer__wrapper']" :style="{ zIndex }" tabindex="-1">
      <transition name="amu-mask-fade" appear>
        <div v-show="innerVisible" class="amu-image-viewer__mask" :style="maskStyle"
          @click="hideOnClickModal && hide()" />
      </transition>

      <transition name="amu-viewer" appear>
        <div v-show="innerVisible" class="amu-image-viewer__content" :style="{ transformOrigin: originStyle }">
          <div :class="['amu-image-viewer__window', { 'is-windowed': windowed }]"
            :style="windowed ? windowStyle : undefined">

            <!-- Close -->
            <span class="amu-image-viewer__btn amu-image-viewer__close" @click="hide">
              <amu-icon>
                <IconX />
              </amu-icon>
            </span>

            <!-- Arrows -->
            <template v-if="urlList.length > 1">
              <span class="amu-image-viewer__btn amu-image-viewer__prev"
                :class="{ 'is-disabled': !infinite && index <= 0 }" @click="prev">
                <amu-icon>
                  <IconChevronLeft />
                </amu-icon>
              </span>
              <span class="amu-image-viewer__btn amu-image-viewer__next"
                :class="{ 'is-disabled': !infinite && index >= urlList.length - 1 }" @click="next">
                <amu-icon>
                  <IconChevronRight />
                </amu-icon>
              </span>
            </template>
            <!-- Thumbnails -->
            <div v-if="urlList.length > 1" class="amu-image-viewer__thumbs"
              :class="{ 'is-collapsed': !thumbsExpanded }">
              <button v-for="(thumb, i) in urlList" :key="thumb" type="button"
                :class="['amu-image-viewer__thumb', { 'is-active': i === index }]" @click="index = i">
                <img :src="thumb" :alt="`thumb-${i}`" />
              </button>
            </div>
            <!-- Thumbnails Toggle -->
            <div v-if="urlList.length > 1" class="amu-image-viewer__thumbs-toggle">
              <amu-popup trigger="hover" placement="top" show-arrow overlay-class-name="amu-image-viewer__tooltip">
                <template #reference>
                  <amu-icon class="amu-image-viewer__actions__icon" @click="toggleThumbs">
                    <IconChevronUp v-if="thumbsExpanded" />
                    <IconChevronDown v-else />
                  </amu-icon>
                </template>
                {{ thumbsExpanded ? t('el.imageViewer.thumbsCollapse') : t('el.imageViewer.thumbsExpand') }}
              </amu-popup>
            </div>
            <div v-if="urlList.length > 1" class="amu-image-viewer__thumbs-index">
              {{ index + 1 }}/{{ urlList.length }}
            </div>

            <!-- Actions -->
            <div class="amu-image-viewer__actions">
              <div class="amu-image-viewer__actions__inner">
                <amu-popup trigger="hover" placement="top" show-arrow overlay-class-name="amu-image-viewer__tooltip">
                  <template #reference>
                    <amu-icon class="amu-image-viewer__actions__icon" @click="handleActions('flipHorizontal')">
                      <IconRepeat />
                    </amu-icon>
                  </template>
                  {{ t('el.imageViewer.flipHorizontal') }}
                </amu-popup>

                <amu-popup trigger="hover" placement="top" show-arrow overlay-class-name="amu-image-viewer__tooltip">
                  <template #reference>
                    <amu-icon class="amu-image-viewer__actions__icon" @click="handleActions('anticlockwise')">
                      <IconRotateCcw />
                    </amu-icon>
                  </template>
                  {{ t('el.imageViewer.rotateLeft') }}
                </amu-popup>

                <amu-popup trigger="hover" placement="top" show-arrow overlay-class-name="amu-image-viewer__tooltip">
                  <template #reference>
                    <amu-icon class="amu-image-viewer__actions__icon" @click="handleActions('clockwise')">
                      <IconRotateCw />
                    </amu-icon>
                  </template>
                  {{ t('el.imageViewer.rotateRight') }}
                </amu-popup>

                <i class="amu-image-viewer__actions__divider"></i>

                <amu-popup trigger="hover" placement="top" show-arrow overlay-class-name="amu-image-viewer__tooltip">
                  <template #reference>
                    <amu-icon class="amu-image-viewer__actions__icon" @click="handleActions('zoomOut')">
                      <IconZoomOut />
                    </amu-icon>
                  </template>
                  {{ t('el.imageViewer.zoomOut') }}
                </amu-popup>

                <span class="amu-image-viewer__actions__ratio">{{ zoomRatio }}</span>

                <amu-popup trigger="hover" placement="top" show-arrow overlay-class-name="amu-image-viewer__tooltip">
                  <template #reference>
                    <amu-icon class="amu-image-viewer__actions__icon" @click="handleActions('zoomIn')">
                      <IconZoomIn />
                    </amu-icon>
                  </template>
                  {{ t('el.imageViewer.zoomIn') }}
                </amu-popup>

                <i class="amu-image-viewer__actions__divider"></i>

                <amu-popup trigger="hover" placement="top" show-arrow overlay-class-name="amu-image-viewer__tooltip">
                  <template #reference>
                    <amu-icon class="amu-image-viewer__actions__icon" @click="reset">
                      <IconMaximize />
                    </amu-icon>
                  </template>
                  {{ t('el.imageViewer.original') }}
                </amu-popup>

                <amu-popup trigger="hover" placement="top" show-arrow overlay-class-name="amu-image-viewer__tooltip">
                  <template #reference>
                    <amu-icon class="amu-image-viewer__actions__icon" @click="download">
                      <IconDownload />
                    </amu-icon>
                  </template>
                  {{ t('el.imageViewer.download') }}
                </amu-popup>
              </div>
            </div>

            <!-- Canvas -->
            <div class="amu-image-viewer__canvas" @wheel="handleWheel">
              <template v-for="(url, i) in urlList">
                <img v-if="i === index" :key="url" ref="imgRef" :src="url"
                  :class="['amu-image-viewer__img', { 'is-dragging': isDragging }]" :style="imgStyle" draggable="false"
                  @load="handleImgLoad" @error="handleImgError" @pointerdown="handlePointerDown"
                  @pointermove="handlePointerMove" @pointerup="handlePointerUp">
              </template>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </Teleport>

  <AmuDialog v-else :model-value="innerVisible" type="custom" :mask="false" :modal="false" :lock-scroll="false"
    :draggable="true" :width="dialogWidth" :teleport-to="dialogTeleport" :z-index="zIndex"
    @update:model-value="handleDialogVisible">
    <template #title>
      {{ index + 1 }}/{{ urlList.length }}
    </template>
    <div ref="wrapperRef" class="amu-image-viewer__window is-windowed" :style="windowStyle">
      <!-- Arrows -->
      <template v-if="urlList.length > 1">
        <span class="amu-image-viewer__btn amu-image-viewer__prev" :class="{ 'is-disabled': !infinite && index <= 0 }"
          @click="prev">
          <amu-icon>
            <IconChevronLeft />
          </amu-icon>
        </span>
        <span class="amu-image-viewer__btn amu-image-viewer__next"
          :class="{ 'is-disabled': !infinite && index >= urlList.length - 1 }" @click="next">
          <amu-icon>
            <IconChevronRight />
          </amu-icon>
        </span>
      </template>

      <!-- Thumbnails Toggle -->
      <div v-if="urlList.length > 1" class="amu-image-viewer__thumbs-toggle is-windowed">
        <amu-popup trigger="hover" placement="top" show-arrow overlay-class-name="amu-image-viewer__tooltip">
          <template #reference>
            <amu-icon class="amu-image-viewer__actions__icon" @click="toggleThumbs">
              <IconChevronUp v-if="thumbsExpanded" />
              <IconChevronDown v-else />
            </amu-icon>
          </template>
          {{ thumbsExpanded ? t('el.imageViewer.thumbsCollapse') : t('el.imageViewer.thumbsExpand') }}
        </amu-popup>
      </div>

      <!-- Thumbnails -->
      <div v-if="urlList.length > 1" class="amu-image-viewer__thumbs is-windowed"
        :class="{ 'is-collapsed': !thumbsExpanded }">
        <button v-for="(thumb, i) in urlList" :key="thumb" type="button"
          :class="['amu-image-viewer__thumb', { 'is-active': i === index }]" @click="index = i">
          <img :src="thumb" :alt="`thumb-${i}`" />
        </button>
      </div>
      <div v-if="urlList.length > 1" class="amu-image-viewer__thumbs-index is-windowed">
        {{ index + 1 }}/{{ urlList.length }}
      </div>

      <!-- Actions -->
      <div class="amu-image-viewer__actions">
        <div class="amu-image-viewer__actions__inner">
          <amu-popup trigger="hover" placement="top" show-arrow overlay-class-name="amu-image-viewer__tooltip">
            <template #reference>
              <amu-icon class="amu-image-viewer__actions__icon" @click="handleActions('flipHorizontal')">
                <IconRepeat />
              </amu-icon>
            </template>
            {{ t('el.imageViewer.flipHorizontal') }}
          </amu-popup>

          <amu-popup trigger="hover" placement="top" show-arrow overlay-class-name="amu-image-viewer__tooltip">
            <template #reference>
              <amu-icon class="amu-image-viewer__actions__icon" @click="handleActions('anticlockwise')">
                <IconRotateCcw />
              </amu-icon>
            </template>
            {{ t('el.imageViewer.rotateLeft') }}
          </amu-popup>

          <amu-popup trigger="hover" placement="top" show-arrow overlay-class-name="amu-image-viewer__tooltip">
            <template #reference>
              <amu-icon class="amu-image-viewer__actions__icon" @click="handleActions('clockwise')">
                <IconRotateCw />
              </amu-icon>
            </template>
            {{ t('el.imageViewer.rotateRight') }}
          </amu-popup>

          <i class="amu-image-viewer__actions__divider"></i>

          <amu-popup trigger="hover" placement="top" show-arrow overlay-class-name="amu-image-viewer__tooltip">
            <template #reference>
              <amu-icon class="amu-image-viewer__actions__icon" @click="handleActions('zoomOut')">
                <IconZoomOut />
              </amu-icon>
            </template>
            {{ t('el.imageViewer.zoomOut') }}
          </amu-popup>

          <span class="amu-image-viewer__actions__ratio">{{ zoomRatio }}</span>

          <amu-popup trigger="hover" placement="top" show-arrow overlay-class-name="amu-image-viewer__tooltip">
            <template #reference>
              <amu-icon class="amu-image-viewer__actions__icon" @click="handleActions('zoomIn')">
                <IconZoomIn />
              </amu-icon>
            </template>
            {{ t('el.imageViewer.zoomIn') }}
          </amu-popup>

          <i class="amu-image-viewer__actions__divider"></i>

          <amu-popup trigger="hover" placement="top" show-arrow overlay-class-name="amu-image-viewer__tooltip">
            <template #reference>
              <amu-icon class="amu-image-viewer__actions__icon" @click="reset">
                <IconMaximize />
              </amu-icon>
            </template>
            {{ t('el.imageViewer.original') }}
          </amu-popup>

          <amu-popup trigger="hover" placement="top" show-arrow overlay-class-name="amu-image-viewer__tooltip">
            <template #reference>
              <amu-icon class="amu-image-viewer__actions__icon" @click="download">
                <IconDownload />
              </amu-icon>
            </template>
            {{ t('el.imageViewer.download') }}
          </amu-popup>
        </div>
      </div>

      <!-- Canvas -->
      <div class="amu-image-viewer__canvas" @wheel="handleWheel">
        <template v-for="(url, i) in urlList">
          <img v-if="i === index" :key="url" ref="imgRef" :src="url"
            :class="['amu-image-viewer__img', { 'is-dragging': isDragging }]" :style="imgStyle" draggable="false"
            @load="handleImgLoad" @error="handleImgError" @pointerdown="handlePointerDown"
            @pointermove="handlePointerMove" @pointerup="handlePointerUp">
        </template>
      </div>
    </div>
  </AmuDialog>
</template>

<script setup lang="ts">
import { computed, ref, watch, onBeforeUnmount } from 'vue'
import { AmuIcon } from '../../icon'
import { AmuDialog } from '../../dialog'
import { AmuPopup } from '../../popup'
import { useLocale } from '@amu-ui/hooks'
import {
  IconX,
  IconChevronLeft,
  IconChevronRight,
  IconZoomIn,
  IconZoomOut,
  IconMaximize,
  IconRotateCw,
  IconRotateCcw,
  IconRepeat,
  IconDownload,
  IconChevronUp,
  IconChevronDown,
} from '@amu-ui/icons'
import { imageViewerProps, imageViewerEmits } from './props'
import { useImageViewer } from './use-image-viewer'
import './style.css'

defineOptions({ name: 'AmuImageViewer' })

const props = defineProps(imageViewerProps)
const emit = defineEmits(imageViewerEmits)
const { t } = useLocale()
const innerVisible = ref(props.visible)
const mounted = ref(props.visible)
let unmountTimer: ReturnType<typeof setTimeout> | null = null
const thumbsExpanded = ref(true)
const originStyle = computed(() => {
  const origin = props.transitionOrigin
  if (!origin) return 'center'
  return `${origin.x}px ${origin.y}px`
})

const windowStyle = computed(() => {
  const width = typeof props.windowWidth === 'number' ? `${props.windowWidth}px` : props.windowWidth
  const height = typeof props.windowHeight === 'number' ? `${props.windowHeight}px` : props.windowHeight
  return {
    width,
    height: height || (props.windowed ? '60vh' : undefined),
  }
})

const dialogWidth = computed(() => {
  const width = typeof props.windowWidth === 'number' ? `${props.windowWidth}px` : props.windowWidth
  return width || '80vw'
})

const dialogTeleport = computed(() => {
  const target = props.teleport
  if (typeof target === 'string') return target
  if (typeof window !== 'undefined' && target instanceof HTMLElement) return target
  return undefined
})

watch(
  () => props.visible,
  (val) => {
    if (props.windowed) {
      innerVisible.value = val
      return
    }
    if (val) {
      if (unmountTimer) {
        clearTimeout(unmountTimer)
        unmountTimer = null
      }
      mounted.value = true
      innerVisible.value = true
      return
    }

    innerVisible.value = false
    unmountTimer = setTimeout(() => {
      mounted.value = false
      unmountTimer = null
    }, 280)
  }
)

onBeforeUnmount(() => {
  if (unmountTimer) {
    clearTimeout(unmountTimer)
    unmountTimer = null
  }
})

const handleDialogVisible = (val: boolean) => {
  if (val) {
    innerVisible.value = true
    return
  }
  hide()
}

const {
  index,
  loading,
  wrapperRef,
  imgRef,
  transform,
  isDragging,
  hide,
  prev,
  next,
  handleActions,
  handleWheel,
  handlePointerDown,
  handlePointerMove,
  handlePointerUp,
  reset,
  imgStyle,
  download,
} = useImageViewer(props, emit, innerVisible)

const zoomRatio = computed(() => `${Math.round(transform.value.scale * 100)}%`)
const toggleThumbs = () => {
  thumbsExpanded.value = !thumbsExpanded.value
}

const handleImgLoad = () => {
  loading.value = false
}
const handleImgError = (e: Event) => {
  loading.value = false
  // e.target.alt = 'Load Failed';
}
</script>

<style scoped>
/* 遮罩动效 */
.amu-mask-fade-enter-active,
.amu-mask-fade-leave-active {
  transition: opacity 0.28s ease;
}

.amu-mask-fade-enter-from,
.amu-mask-fade-leave-to {
  opacity: 0;
}

/* 内容动效 */
.amu-viewer-enter-active,
.amu-viewer-leave-active {
  transition: opacity 0.28s ease, transform 0.28s ease;
}

.amu-viewer-enter-from,
.amu-viewer-leave-to {
  opacity: 0;
  transform: scale(0.96);
}

.amu-image-viewer__content {
  position: absolute;
  inset: 0;
}
</style>
