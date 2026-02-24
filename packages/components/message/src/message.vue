<template>
  <div :id="id" :class="[
    'amu-message',
    type && `amu-message--${type}`,
    customClass,
    { 'is-closable': showClose, 'is-center': center }
  ]" :style="customStyle" role="alert" @mouseenter="clearTimer" @mouseleave="startTimer">
    <!-- Icon -->
    <AmuTypeIcon v-if="props.icon || props.type" :icon="props.icon" :type="props.type" class="amu-message__icon"
      :size="props.type === 'success' ? 19 : 23" />

    <!-- Content -->
    <div class="amu-message__content">

      <component :is="message" v-if="isVNode(message) || isFunction(message)" />
      <slot v-else>
        <span v-if="!dangerouslyUseHTMLString">{{ message }}</span>
        <span v-else v-html="message" />
      </slot>
    </div>

    <!-- Close Button -->
    <div v-if="showClose" class="amu-message__closeBtn" @click.stop="handleClose">
      <template v-if="closeText">{{ closeText }}</template>
      <AmuIcon>
        <Close />
      </AmuIcon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, isVNode, watch } from 'vue'
import { messageProps } from './props'
import { AmuTypeIcon } from '../../icon'
import AmuIcon from '../../icon'
import { IconX as IconClose } from '@amu-ui/icons'

defineOptions({
  name: 'AmuMessage'
})

const props = defineProps(messageProps)
const emit = defineEmits(['close'])

const isFunction = (val: unknown): val is Function => typeof val === 'function'

const Close = IconClose


// Timer
let timer: ReturnType<typeof setTimeout> | undefined

const startTimer = () => {
  if (props.duration > 0) {
    timer = setTimeout(() => {
      handleClose()
    }, props.duration)
  }
}

const clearTimer = () => {
  if (timer) {
    clearTimeout(timer)
    timer = undefined
  }
}

const handleClose = () => {
  emit('close')
}

// Styles
const customStyle = computed(() => {
  return {
    zIndex: props.zIndex,
  }
})

onMounted(() => {
  startTimer()
})

watch(() => [props.duration, props.type], () => {
  clearTimer()
  startTimer()
})
</script>
