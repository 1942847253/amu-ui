<template>
  <div>
    <p>Selected Rows: {{ selection.length }}</p>
    <AmuTable 
      :data="tableData" 
      :columns="columns" 
      :row-key="(row) => row.id"
      @selection-change="handleSelectionChange"
      ref="tableRef"
    >
      <AmuTableColumn type="selection" width="55" fixed="left" />
      <AmuTableColumn prop="date" label="Date" sortable width="180" />
      <AmuTableColumn prop="name" label="Name" sortable width="180" />
      <AmuTableColumn prop="address" label="Address" />
    </AmuTable>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const tableData = [
  {
    id: 1,
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 2,
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 3,
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    id: 4,
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]

const columns = [] // Can use template instead of schema
const tableRef = ref(null)
const selection = ref([])

const handleSelectionChange = (val: any[]) => {
  selection.value = val
}
</script>
