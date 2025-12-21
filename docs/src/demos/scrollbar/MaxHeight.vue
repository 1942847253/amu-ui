<template>
  <amu-space direction="vertical">
    <amu-space>
      <amu-button @click="add">Add Item</amu-button>
      <amu-button @click="onDelete">Delete Item</amu-button>
    </amu-space>
    <amu-scrollbar max-height="400px">
      <p v-for="item in count" :key="item" class="scrollbar-demo-item">{{ item }}</p>
    </amu-scrollbar>
  </amu-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const count = ref(3)

const add = () => {
  count.value++
}
const onDelete = () => {
  if (count.value > 0) {
    count.value--
  }
}
</script>

<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--amu-color-bg-fill);
  color: var(--amu-color-text);
}
</style>
