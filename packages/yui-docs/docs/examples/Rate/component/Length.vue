<template>
  <YRate :max="10" v-model="rateValue" color="red"></YRate>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const rateValue = ref(7);
</script>

<style>

</style>