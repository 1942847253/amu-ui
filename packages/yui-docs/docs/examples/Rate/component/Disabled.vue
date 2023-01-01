<template>
  <YRate v-model="rateValue" color="red" disabled></YRate>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const rateValue = ref(4);
</script>

<style>

</style>