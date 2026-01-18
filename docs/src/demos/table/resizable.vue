<template>
  <AmuTable 
    :data="tableData" 
    border 
    resizable
    style="width: 100%"
    @header-dragend="handleHeaderDragEnd"
  >
    <AmuTableColumn prop="date" label="Date" width="180" />
    <AmuTableColumn prop="name" label="Name" width="180" />
    <AmuTableColumn prop="address" label="Address" />
  </AmuTable>
  <div style="margin-top: 10px; color: var(--amu-color-text-default);">
    Last Event: {{ eventLog }}
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuTable, AmuTableColumn } from 'amu-ui'

const eventLog = ref('Try dragging the header border...')

const tableData = [
  { date: '2016-05-03', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
  { date: '2016-05-02', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
  { date: '2016-05-04', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
  { date: '2016-05-01', name: 'Tom', address: 'No. 189, Grove St, Los Angeles' },
]

const handleHeaderDragEnd = (newWidth: number, oldWidth: number, column: any) => {
  eventLog.value = `Column [${column.label}] resized: ${oldWidth}px -> ${newWidth}px`
}
</script>
