<template>
  <transition name="amu-fade-in">
    <div
      v-show="always || !!size"
      ref="instance"
      :class="[
        'amu-scrollbar__bar',
        `is-${bar.key}`,
        { 'is-visible': visible, 'is-always': always },
      ]"
      @mousedown="clickTrackHandler"
    >
      <div
        ref="thumb"
        class="amu-scrollbar__thumb"
        :style="thumbStyle"
        @mousedown="clickThumbHandler"
      />
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { computed, inject, onBeforeUnmount, ref } from 'vue'
import { BAR_MAP, renderThumbStyle, scrollbarContextKey } from './constants'

const props = defineProps({
  vertical: Boolean,
  size: String,
  move: Number,
  ratio: Number, // ratio = (scrollHeight - clientHeight) / (clientHeight - thumbHeight)
  always: Boolean,
})

const scrollbar = inject(scrollbarContextKey)

if (!scrollbar) {
  throw new Error('Thumb must be used inside Scrollbar')
}

const instance = ref<HTMLDivElement>()
const thumb = ref<HTMLDivElement>()

const thumbState = ref({
  X: 0,
  Y: 0,
})

const visible = ref(false)

const bar = computed(() => BAR_MAP[props.vertical ? 'vertical' : 'horizontal'])

const thumbStyle = computed(() =>
  renderThumbStyle({
    size: props.size!,
    move: props.move!,
    bar: bar.value,
  })
)

const clickTrackHandler = (e: MouseEvent) => {
  if (!thumb.value || !instance.value || !scrollbar.wrapElement!.value) return

  const offset = Math.abs(
    (e.target as HTMLElement).getBoundingClientRect()[bar.value.direction] -
      e[bar.value.client]
  )
  const thumbHalf = thumb.value[bar.value.offset] / 2
  const thumbPosition = offset - thumbHalf
  
  scrollbar.wrapElement.value[bar.value.scroll] = thumbPosition * props.ratio!
}

const clickThumbHandler = (e: MouseEvent) => {
  e.stopPropagation()
  if (e.ctrlKey || [1, 2].includes(e.button)) return

  window.getSelection()?.removeAllRanges()
  startDrag(e)

  const el = e.currentTarget as HTMLDivElement
  if (!el) return
  
  thumbState.value[bar.value.axis] = e[bar.value.client]
}

const mouseMoveDocumentHandler = (e: MouseEvent) => {
  if (!instance.value || !thumb.value || !scrollbar.wrapElement!.value) return
  if (thumbState.value[bar.value.axis] === 0) return

  const prevClient = thumbState.value[bar.value.axis]
  const currentClient = e[bar.value.client]
  const delta = currentClient - prevClient
  
  const deltaScroll = delta * props.ratio!
  
  scrollbar.wrapElement.value[bar.value.scroll] += deltaScroll
  
  thumbState.value[bar.value.axis] = currentClient
}

const mouseUpDocumentHandler = () => {
  visible.value = false
  thumbState.value[bar.value.axis] = 0
  document.removeEventListener('mousemove', mouseMoveDocumentHandler)
  document.removeEventListener('mouseup', mouseUpDocumentHandler)
  document.onselectstart = null
}

const startDrag = (e: MouseEvent) => {
  e.stopImmediatePropagation()
  visible.value = true
  document.addEventListener('mousemove', mouseMoveDocumentHandler)
  document.addEventListener('mouseup', mouseUpDocumentHandler)
  document.onselectstart = () => false
}

onBeforeUnmount(() => {
  document.removeEventListener('mouseup', mouseUpDocumentHandler)
})

const setVisible = (value: boolean) => {
  visible.value = value
}

defineExpose({
  setVisible,
})
</script>
