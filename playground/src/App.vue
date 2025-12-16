<template>
  <div class="app">
    <h1>amu-ui playground</h1>

    <section class="card">
      <h2>按需引入</h2>
      <LocalButton type="primary">Primary Button</LocalButton>
      <LocalButton>Default Button</LocalButton>
    </section>

    <section class="card">
      <h2>全量注册（app.use）</h2>
      <AmuButton type="primary">Registered Button</AmuButton>
    </section>
  </div>
</template>

<script setup lang="ts">
import LocalButton from 'amu-ui/button'
</script>

<style scoped>
.app {
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji",
    "Segoe UI Emoji";
  padding: 24px;
  color: var(--amu-color-text);
  background: var(--amu-color-bg);
  min-height: 100vh;
}

.card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border: 1px solid var(--amu-color-border);
  border-radius: var(--amu-radius);
  margin-top: 16px;
}

.card :deep(.amu-button) {
  margin-right: 8px;
}
</style>
