<template>
  <div class="demo-fill-sheet">
    <section>
      <h3>默认填充按钮</h3>
      <div class="demo-fill-row">
        <span class="demo-fill-cell">
          <AmuButton fill type="primary">Primary</AmuButton>
        </span>
        <span class="demo-fill-cell">
          <AmuButton fill type="default">Default</AmuButton>
        </span>
        <span class="demo-fill-cell">
          <AmuButton fill type="text">Text</AmuButton>
        </span>
      </div>
    </section>

    <section>
      <h3>状态类填充按钮</h3>
      <div class="demo-fill-row">
        <span class="demo-fill-cell">
          <AmuButton fill status="warning">Warning</AmuButton>
        </span>
        <span class="demo-fill-cell">
          <AmuButton fill status="danger">Danger</AmuButton>
        </span>
        <span class="demo-fill-cell">
          <AmuButton fill status="success">Success</AmuButton>
        </span>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { AmuButton } from "amu-ui";
</script>

<style scoped>
.demo-fill-sheet {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.demo-fill-row {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-wrap: wrap;
}

.demo-fill-cell {
  max-width: 360px;
}

.demo-fill-cell .amu-button {
  width: 100%;
}

.api-table-wrapper {
  overflow-x: auto;
}

.api-table-wrapper table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 12px;
  font-size: 13px;
}

.api-table-wrapper th,
.api-table-wrapper td {
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  text-align: left;
}

.api-table-wrapper thead th {
  background-color: #f8fafc;
  color: #374151;
  font-weight: 600;
}

.api-table-wrapper td code {
  background: none;
  padding: 0;
  color: #6366f1;
}

h3 {
  margin: 0 0 8px;
  font-size: 14px;
  color: #4e5969;
}
</style>
