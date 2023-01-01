<template>
  <YRate v-model="rateValue"></YRate>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const rateValue = ref(3);
</script>

<style>

</style>