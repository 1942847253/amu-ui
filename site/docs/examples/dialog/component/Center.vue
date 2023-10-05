<template>
    <a-button type="info" @click="dialogVisible = true">Click to open the Dialog</a-button>
    <a-dialog center width="30%" title="Warning"  v-model="dialogVisible">
      <span>It should be noted that the content will not be aligned in center by default</span>
    </a-dialog>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  
  const dialogVisible = ref(false)
  </script>
  