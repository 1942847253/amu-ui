<template>
  <span
    class="amu-tag"
    :class="[
      `amu-tag--${type}`,
      `amu-tag--size-${size}`,
      `amu-tag--shape-${shape}`,
      {
        'amu-tag--bordered': bordered,
        'amu-tag--disabled': disabled,
      }
    ]"
    :style="style"
    @click="handleClick"
  >
    <slot name="icon" />
    <slot />
    <span v-if="closable" class="amu-tag__close" @click.stop="handleClose">
      <svg viewBox="0 0 1024 1024" width="10" height="10">
        <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" fill="currentColor"/>
      </svg>
    </span>
  </span>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { tagProps } from './props'

export default defineComponent({
  name: 'AmuTag',
  props: tagProps,
  emits: ['close', 'click'],
  setup(props, { emit }) {
    const handleClose = (event: MouseEvent) => {
      if (props.disabled) return
      emit('close', event)
    }

    const handleClick = (event: MouseEvent) => {
      if (props.disabled) return
      emit('click', event)
    }

    const style = computed(() => {
      if (props.color) {
        return {
          backgroundColor: props.color,
          borderColor: props.color,
          color: '#fff'
        }
      }
      return {}
    })

    return {
      handleClose,
      handleClick,
      style
    }
  }
})
</script>
