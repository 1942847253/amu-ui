<template>
  <AProgress
    style="width: 500px; margin-bottom: 10px"
    :percentage="20"
    :strokeWidth="20"
    status="error"
    textInside
  />
  <AProgress
    style="width: 500px; margin-bottom: 10px"
    :percentage="40"
    :strokeWidth="20"
    status="prompt"
    textInside
  />
  <AProgress
    style="width: 500px; margin-bottom: 10px"
    :percentage="90"
    :strokeWidth="24"
    textInside
    status="success"
  />
  <AProgress
    style="width: 500px"
    :percentage="percentage"
    :strokeWidth="26"
    textInside
    :color="customColors"
  />
</template>

<script setup>
import { ref } from "vue";
let timer = null;
const percentage = ref(0);
const customColors = [
  { color: '#e53935', percentage: 40 },
  { color: '#d69800', percentage: 60 },
  { color: '#18a058', percentage: 80 },
  { color: '#0468dc', percentage: 100 },
]
const SetInterval = () => {
  timer = setTimeout(() => {
    if (percentage.value >= 100) {
      percentage.value = 0;
    } else {
      percentage.value++;
    }
    SetInterval();
  }, 80);
};
SetInterval()
</script>
