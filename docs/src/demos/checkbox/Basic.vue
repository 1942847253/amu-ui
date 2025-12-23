<template>
  <div class="demo-section">
    <amu-checkbox v-model="checked">同意用户协议</amu-checkbox>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuCheckbox } from 'amu-ui/checkbox'

const checked = ref(false)
</script>

<style scoped>
.demo-section {
  padding: 20px;
}
</style>
