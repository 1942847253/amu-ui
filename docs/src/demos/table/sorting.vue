<template>
  <AmuTable 
    :data="tableData" 
    style="width: 100%"
    :default-sort="{ prop: 'date', order: 'descending' }"
    @sort-change="handleSortChange"
  >
    <AmuTableColumn prop="date" label="Date" sortable width="180" />
    <AmuTableColumn prop="name" label="Name" sortable width="180" />
    <AmuTableColumn prop="address" label="Address" :formatter="formatter" />
  </AmuTable>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]

const formatter = (row: any) => {
  return row.address
}

const handleSortChange = ({ column, prop, order }: any) => {
    console.log('Sort changed:', column, prop, order)
}
</script>
