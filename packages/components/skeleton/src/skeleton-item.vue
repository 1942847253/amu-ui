<template>
  <div class="amu-skeleton__item" :class="[`amu-skeleton__item--${variant}`]">
    <svg
      v-if="variant === 'image'"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M64 896V128h896v768H64z m64-128l192-192 116.352 116.352L640 448l256 307.2V192H128v576z m224-480a96 96 0 1 1-0.064 192.064A96 96 0 0 1 352 288z"
      />
    </svg>
  </div>
</template>

<script lang="ts" setup>
import { skeletonItemProps } from './props'

defineOptions({
  name: 'AmuSkeletonItem',
})

defineProps(skeletonItemProps)
</script>
