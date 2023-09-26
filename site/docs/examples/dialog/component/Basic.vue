<template>
  <a-button type="info" @click="dialogVisible = true">open</a-button>
  <a-dialog width="30%" title="Tips"  v-model="dialogVisible">
    <span>This is a message</span>
  </a-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const dialogVisible = ref(false)
</script>
