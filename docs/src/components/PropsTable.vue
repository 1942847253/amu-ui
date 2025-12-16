<template>
  <div class="props-table-container">
    <table class="props-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.name">
          <td class="name">
            <code>{{ row.name }}</code>
            <span v-if="row.required" class="required-badge">required</span>
          </td>
          <td class="type">
            <code class="type-code">{{ row.type }}</code>
          </td>
          <td class="default">
            <code v-if="row.default">{{ row.default }}</code>
            <span v-else class="empty">-</span>
          </td>
          <td class="desc">
            <span v-if="row.description">{{ row.description }}</span>
            <span v-else class="empty">-</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
export type PropRow = {
  name: string
  type: string
  required: boolean
  default?: string
  description?: string
}

defineProps<{
  rows: PropRow[]
}>()
</script>

<style scoped>
.props-table-container {
  overflow-x: auto;
  margin: 24px 0;
  border: 1px solid var(--amu-border);
  border-radius: var(--amu-radius);
}

.props-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  text-align: left;
}

th {
  padding: 12px 16px;
  background-color: var(--amu-bg-demo-ctrl);
  color: var(--amu-text-1);
  font-weight: 600;
  border-bottom: 1px solid var(--amu-border);
  white-space: nowrap;
}

td {
  padding: 14px 16px;
  border-bottom: 1px solid var(--amu-border);
  color: var(--amu-text-2);
  vertical-align: top;
}

tr:last-child td {
  border-bottom: none;
}

.name {
  color: var(--amu-brand);
  font-weight: 500;
  white-space: nowrap;
}

.required-badge {
  display: inline-block;
  margin-left: 8px;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  background-color: #fecaca;
  color: #dc2626;
  text-transform: uppercase;
}

.dark .required-badge {
  background-color: #450a0a;
  color: #f87171;
}

.type-code {
  color: #d97706; /* Amber */
  background: transparent;
  padding: 0;
}

.dark .type-code {
  color: #fbbf24;
}

.empty {
  color: var(--amu-text-3);
}
</style>
