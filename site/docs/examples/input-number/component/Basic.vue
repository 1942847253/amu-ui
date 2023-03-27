<template>
  <a-input-number v-model="input" placeholder="Please input" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const input = ref(520)
</script>

<style lang="less" scoped>
:deep(.subtract-button){
  height: 29.5px;
}
:deep(.add-button){
   height: 29.5px;
}
</style>