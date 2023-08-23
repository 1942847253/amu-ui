<template>
  <div style="line-height: 30px">
    <AProgress style="width: 500px" :percentage="percentage" color="#fd8ca0" />
    <AProgress style="width: 500px" :percentage="percentage" color="#2b92ed" />
    <AProgress style="width: 500px" :percentage="percentage" color="#bd26b4" />
    <AProgress style="width: 500px" :percentage="percentage" :color="customColors" />
    <a-input-number v-model="percentage" :step="10" :min="0" :max="100"/>
  </div>
</template>

<script setup>
import { ref } from "vue";
const percentage = ref(30);
const customColors = [
  { color: '#e53935', percentage: 20 },
  { color: '#d69800', percentage: 40 },
  { color: '#18a058', percentage: 60 },
  { color: '#0468dc', percentage: 80 },
  { color: '#4655ca', percentage: 100 },
]
</script>
