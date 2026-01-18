<template>
  <div>
    <div style="margin-bottom: 16px; display: flex; gap: 8px; align-items: center;">
      <span>Selected: {{ selection.length }}</span>
      <AmuButton :disabled="selection.length === 0" type="primary" size="small">Batch Export</AmuButton>
      <AmuButton :disabled="selection.length === 0" type="danger" size="small">Batch Delete</AmuButton>
    </div>
    <AmuTable 
      :data="tableData" 
      :row-key="(row) => row.id"
      @selection-change="handleSelectionChange"
      ref="tableRef"
    >
      <AmuTableColumn type="selection" width="55" />
      <AmuTableColumn prop="orderId" label="Order ID" width="120" />
      <AmuTableColumn prop="customer" label="Customer" width="150" />
      <AmuTableColumn prop="amount" label="Amount" sortable width="120" />
      <AmuTableColumn prop="status" label="Status" width="120">
        <template #default="{ row }">
           <AmuTag :type="row.status === 'Paid' ? 'success' : 'warning'">{{ row.status }}</AmuTag>
        </template>
      </AmuTableColumn>
      <AmuTableColumn prop="date" label="Date" sortable />
    </AmuTable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tableData = [
  {
    id: 101,
    orderId: 'ORD-2024-001',
    customer: 'Alice Johnson',
    amount: '$120.50',
    status: 'Paid',
    date: '2024-03-10',
  },
  {
    id: 102,
    orderId: 'ORD-2024-002',
    customer: 'Bob Smith',
    amount: '$85.00',
    status: 'Pending',
    date: '2024-03-11',
  },
  {
    id: 103,
    orderId: 'ORD-2024-003',
    customer: 'Charlie Brown',
    amount: '$320.00',
    status: 'Paid',
    date: '2024-03-12',
  },
  {
    id: 104,
    orderId: 'ORD-2024-004',
    customer: 'Diana Prince',
    amount: '$45.99',
    status: 'Refunded',
    date: '2024-03-12',
  },
  {
    id: 105,
    orderId: 'ORD-2024-005',
    customer: 'Evan Wright',
    amount: '$1,299.00',
    status: 'Paid',
    date: '2024-03-13',
  },
]

const selection = ref<any[]>([])
const tableRef = ref(null)

const handleSelectionChange = (val: any[]) => {
  selection.value = val
}
</script>
