<template>
  <amu-button type="primary" @click="toggle">Toggle Loading</amu-button>
  <p></p>
  <div class="demo-loading-basic" :style="{ height: '100px', border: '1px solid var(--amu-color-border)' }">
  
    <div v-loading="loading" class="loading-area" amu-loading-text="Loading...">
        Content Area
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuButton } from 'amu-ui/button'
import { AmuLoadingDirective as vLoading } from 'amu-ui/loading'

const loading = ref(true)

const toggle = () => {
    loading.value = !loading.value
}
</script>

<style scoped>
.loading-area {
    padding: 20px;
    height: 100%;
    box-sizing: border-box;
}
</style>
