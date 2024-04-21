<template>
  <AScrollbar :style="{ height: '400px' }">
    <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</p>
  </AScrollbar>
</template>

<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: #007bff0a;
  color: var(--a-primary-color);
}
</style>