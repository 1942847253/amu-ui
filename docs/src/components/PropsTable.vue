<template>
  <div class="props-table-container">
    <table class="props-table">
      <thead>
        <tr>
          <th>{{ t.name }}</th>
          <th>{{ t.type }}</th>
          <th>{{ t.default }}</th>
          <th>{{ t.description }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in displayRows" :key="row.name">
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
import { computed } from 'vue'
import { useLanguage } from '../composables/useLanguage'

export type PropRow = {
  name: string
  type: string
  required: boolean
  default?: string
  description?: string | Record<string, string>
}

const props = defineProps<{
  rows: PropRow[]
}>()

const { lang } = useLanguage()

const displayRows = computed(() => {
  return props.rows.map(row => {
    let desc = row.description
    if (typeof desc === 'object' && desc !== null) {
      desc = desc[lang.value] || desc['zh-CN'] || ''
    }
    return {
      ...row,
      description: desc as string
    }
  })
})

const t = computed(() => {
  return lang.value === 'zh-CN'
    ? {
      name: '属性名',
      type: '类型',
      default: '默认值',
      description: '说明',
    }
    : {
      name: 'Name',
      type: 'Type',
      default: 'Default',
      description: 'Description',
    }
})
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
  display: inline-block;
  color: #d97706; /* Amber */
  background-color: var(--amu-bg-code);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: var(--vp-font-family-mono);
  white-space: nowrap;
}

.dark .type-code {
  color: #fbbf24;
}

.empty {
  color: var(--amu-text-3);
}
</style>
