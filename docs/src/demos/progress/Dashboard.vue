<template>
  <amu-space direction="vertical" alignment="center">
    <amu-progress type="dashboard" :percentage="percentage" :color="colors" />
    
    <amu-space>
        <button class="amu-button" @click="decrease">-</button>
        <button class="amu-button" @click="increase">+</button>
    </amu-space>
  </amu-space>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { AmuProgress, AmuSpace } from 'amu-ui'

const percentage = ref(10)
const colors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: '#6f7ad3', percentage: 100 }
]

const increase = () => {
  percentage.value += 10
  if (percentage.value > 100) {
    percentage.value = 100
  }
}

const decrease = () => {
  percentage.value -= 10
  if (percentage.value < 0) {
    percentage.value = 0
  }
}

onMounted(() => {
  setInterval(() => {
    percentage.value = (percentage.value % 100) + 10
  }, 2000)
})
</script>
