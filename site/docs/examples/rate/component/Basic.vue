<template>
  <ARate v-model="rateValue"></ARate>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const rateValue = ref(3);
</script>

<style>

</style>