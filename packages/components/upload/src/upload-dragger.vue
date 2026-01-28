<template>
  <div
    :class="['amu-upload-dragger', { 'is-dragover': dragover, 'is-disabled': disabled }]"
    @drop.prevent="onDrop"
    @dragover.prevent="onDragover"
    @dragleave.prevent="dragover = false"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['file'])

const dragover = ref(false)

const onDrop = (e: DragEvent) => {
  if (props.disabled) return
  if (dragover.value) {
    dragover.value = false
  }
  if (!e.dataTransfer) return
  const acceptKeys = Object.keys(e.dataTransfer.files)
  emit('file', Array.from(e.dataTransfer.files).filter((_, i) => acceptKeys.includes(i.toString())))
}

const onDragover = () => {
  if (props.disabled) return
  if (!dragover.value) {
    dragover.value = true
  }
}
</script>
