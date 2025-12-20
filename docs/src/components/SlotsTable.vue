<template>
    <div class="slots-table-container">
        <table class="slots-table">
            <thead>
                <tr>
                    <th>{{ t.name }}</th>
                    <th>{{ t.description }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in displayRows" :key="row.name">
                    <td class="name">
                        <code>{{ row.name }}</code>
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

type SlotRow = {
    name: string
    description?: string | Record<string, string>
}

const props = defineProps<{
    rows: SlotRow[]
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
        ? { name: '插槽名', description: '说明' }
        : { name: 'Slot Name', description: 'Description' }
})
</script>

<style scoped>
.slots-table-container {
    overflow-x: auto;
    margin: 24px 0;
    border: 1px solid var(--amu-border);
    border-radius: var(--amu-radius);
}

.slots-table {
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

.name code {
    color: var(--amu-brand);
    background-color: var(--amu-bg-code);
    padding: 2px 6px;
    border-radius: var(--amu-radius-sm);
    font-family: monospace;
}

.empty {
    color: var(--amu-text-3);
}
</style>
