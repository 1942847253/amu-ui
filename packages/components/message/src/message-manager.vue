<template>
  <div class="amu-message-container">
    <template v-for="placement in placements" :key="placement">
      <TransitionGroup
        :name="getTransitionName(placement)"
        tag="div"
        :class="['amu-message-list', `is-${placement}`]"
      >
        <AmuMessage
          v-for="item in getMessages(placement)"
          :key="item.id!"
          :id="item.id!"
          :message="item.message"
          :type="item.type"
          :icon="item.icon"
          :dangerouslyUseHTMLString="item.dangerouslyUseHTMLString"
          :customClass="item.customClass"
          :duration="item.duration"
          :showClose="item.showClose"
          :center="item.center"
          :offset="item.offset"
          :zIndex="item.zIndex"
          :placement="item.placement"
          :closeText="item.closeText"
          @close="remove(item.id!)"
        />
      </TransitionGroup>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AmuMessage from './message.vue'
import type { MessageOptions, MessagePlacement } from './types'

const messages = ref<MessageOptions[]>([])
const placements: MessagePlacement[] = ['top', 'top-left', 'top-right', 'bottom', 'bottom-left', 'bottom-right']

const add = (options: MessageOptions) => {
  messages.value.push(options)
}

const remove = (id: string) => {
  const idx = messages.value.findIndex(m => m.id === id)
  if (idx !== -1) {
    const item = messages.value[idx]
    if (item.onClose) item.onClose()
    messages.value.splice(idx, 1)
  }
}

const update = (id: string, options: MessageOptions) => {
  const idx = messages.value.findIndex(m => m.id === id)
  if (idx !== -1) {
    Object.assign(messages.value[idx], options)
    return true
  }
  return false
}

const closeAll = (type?: string) => {
  if (type) {
    // 同时也移除数组中的元素，倒序遍历以安全删除
    for (let i = messages.value.length - 1; i >= 0; i--) {
      const m = messages.value[i]
      if (m.type === type) {
        if (m.onClose) m.onClose()
        messages.value.splice(i, 1)
      }
    }
  } else {
    messages.value.forEach(m => m.onClose && m.onClose())
    messages.value = []
  }
}

const getMessages = (placement: MessagePlacement) => {
  return messages.value.filter(m => (m.placement || 'top') === placement)
}

const getTransitionName = (placement: MessagePlacement) => {
  if (placement.includes('top')) return 'amu-message-fade'
  // 底部过渡动画，暂时复用淡入淡出，未来可优化为由下向上
  return 'amu-message-fade' 
}

defineExpose({
  add,
  remove,
  update,
  closeAll,
  messages
})
</script>
