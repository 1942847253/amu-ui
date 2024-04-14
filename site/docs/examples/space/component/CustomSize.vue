<template>
  <a-slider v-model="value" />
  <ASpace align="center"  style="margin-top: 20px;" :size="value">
    <AButton>Default</AButton>
    <AButton type="primary">Primary</AButton>
    <AButton type="error">Error</AButton>
    <AButton type="warning">Warning</AButton>
    <AButton type="info">Info</AButton>
  </ASpace>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const value = ref(40);

</script>

