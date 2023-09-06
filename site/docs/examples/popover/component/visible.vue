<template>
  <APopover
    :visible="popoverVisible"
    title="Title"
    width="200px"
    content="this is content, this is content, this is content"
  >
    <template #reference>
      <a-button @click="popoverVisible = !popoverVisible" type="primary">Manual to activate</a-button>
    </template>
  </APopover>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const popoverVisible = ref(false)
</script>
