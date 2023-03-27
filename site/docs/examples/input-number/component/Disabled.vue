<template>
  <a-input-number v-model="input" disabled  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const input = ref(1)
</script>

<style lang="less" scoped>
:deep(.subtract-button){
  height: 29.5px;
}
:deep(.add-button){
   height: 29.5px;
}
</style>