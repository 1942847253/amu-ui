<template>
  <div class="amu-card-meta">
    <div v-if="$slots.avatar" class="amu-card-meta__avatar">
      <slot name="avatar" />
    </div>
    <div class="amu-card-meta__detail">
      <div v-if="title || $slots.title" class="amu-card-meta__title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="description || $slots.description" class="amu-card-meta__description">
        <slot name="description">{{ description }}</slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { cardMetaProps } from './props'

defineOptions({
  name: 'AmuCardMeta',
})

defineProps(cardMetaProps)
</script>
