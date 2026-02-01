<template>
  <slot />
</template>

<script lang="ts" setup>
import { descriptionsItemProps } from './props'

defineOptions({
  name: 'AmuDescriptionsItem'
})

defineProps(descriptionsItemProps)
</script>
