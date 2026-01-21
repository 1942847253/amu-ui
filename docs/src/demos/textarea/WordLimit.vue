<template>
  <AmuTextarea
    v-model="value"
    :maxlength="100"
    show-word-limit
    placeholder="请输入内容 (限100字)"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
</script>
