<template>
  <div class="demo-loading-size" :style="{ height: '100px', border: '1px solid var(--amu-color-border)', marginBottom: '20px' }">
    <div v-loading="true" class="loading-area" amu-loading-text="Default Size (42px)">
    </div>
  </div>

  <div class="demo-loading-size" :style="{ height: '100px', border: '1px solid var(--amu-color-border)' }">
    <div v-loading="true" class="loading-area" amu-loading-text="Custom Size (20px)" amu-loading-size="20">
    </div>
  </div>
</template>

<script setup lang="ts">
import { AmuLoadingDirective as vLoading } from 'amu-ui/loading'
</script>

<style scoped>
.loading-area {
    height: 100%;
    width: 100%;
}
</style>
