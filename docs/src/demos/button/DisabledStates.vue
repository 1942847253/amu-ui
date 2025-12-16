<template>
  <div class="demo-disabled-sheet">
    <section>
      <div class="demo-row">
        <AmuButton type="primary" disabled>Primary</AmuButton>
        <AmuButton type="default" disabled>Default</AmuButton>
        <AmuButton type="dashed" disabled>Dashed</AmuButton>
        <AmuButton type="outline" disabled>Outline</AmuButton>
        <AmuButton type="text" disabled>Text</AmuButton>
      </div>
    </section>

    <section>
      <div class="demo-row">
        <AmuButton status="warning" disabled>Warning</AmuButton>
        <AmuButton status="danger" disabled>Danger</AmuButton>
        <AmuButton status="success" disabled>Success</AmuButton>
      </div>
    </section>

    <section>
      <div class="demo-row">
        <AmuButton type="outline" status="warning" disabled>Outline warning</AmuButton>
        <AmuButton type="dashed" status="danger" disabled>Dashed danger</AmuButton>
        <AmuButton type="outline" status="success" disabled>Outline success</AmuButton>
      </div>
    </section>

    <section>
      <div class="demo-row">
        <AmuButton type="text" status="warning" disabled>Text warning</AmuButton>
        <AmuButton type="text" status="danger" disabled>Text danger</AmuButton>
        <AmuButton type="text" status="success" disabled>Text success</AmuButton>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { AmuButton } from 'amu-ui'
</script>

<style scoped>
.demo-disabled-sheet {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

h3 {
  margin: 0 0 8px;
  font-size: 14px;
  color: #4e5969;
}
</style>
