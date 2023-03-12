<template>
<div style="display:flex">
      <a-button>default</a-button>
  <a-button @click="showLoading" :loading="loading" type="primary">primary</a-button>
  <a-button type="success">success</a-button>
  <a-button type="warning">warning</a-button>
  <a-button type="danger">error</a-button>
  <a-button type="info">info</a-button>
</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const loading = ref(false);
const showLoading = () => {
  loading.value = true;
  setTimeout(() => {
    loading.value = false
  }, 2000);
};
</script>
