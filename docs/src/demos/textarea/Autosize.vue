<template>
  <div class="demo-textarea-autosize">
    <p>自适应高度</p>
    <AmuTextarea v-model="value1" :autosize="true" placeholder="自适应高度" />
    
    <p>限制行数 (min: 2, max: 4)</p>
    <AmuTextarea v-model="value2" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="最小2行，最大4行" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')
</script>

<style scoped>
.demo-textarea-autosize p {
  margin: 10px 0;
  color: var(--amu-color-text-secondary);
}
</style>
