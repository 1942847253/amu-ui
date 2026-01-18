<template>
  <AmuTable 
    row-key="id"
    :data="tableData" 
    draggable
    border 
    style="width: 100%"
    @row-drag-end="handleDragEnd"
  >
    <AmuTableColumn width="60" align="center">
       <div class="amu-table__drag-handle" style="cursor: move; display: flex; justify-content: center;">
         <AmuIcon> <IconList /> </AmuIcon>
       </div>
    </AmuTableColumn>
    <AmuTableColumn prop="date" label="日期" width="180" />
    <AmuTableColumn prop="name" label="姓名" width="180" />
    <AmuTableColumn prop="address" label="地址" />
  </AmuTable>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuTable, AmuTableColumn, AmuIcon } from 'amu-ui'
import { IconList } from '@amu-ui/icons'

const tableData = ref([
  { id: 1, date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' },
  { id: 2, date: '2016-05-04', name: '张小钢', address: '上海市普陀区金沙江路 1517 弄' },
  { id: 3, date: '2016-05-01', name: '李小红', address: '上海市普陀区金沙江路 1519 弄' },
  { id: 4, date: '2016-05-03', name: '周小伟', address: '上海市普陀区金沙江路 1516 弄' },
])

const handleDragEnd = ({ newIndex, oldIndex }: any) => {
  const currRow = tableData.value.splice(oldIndex, 1)[0]
  tableData.value.splice(newIndex, 0, currRow)
}
</script>

<style>
.sortable-ghost {
  opacity: 0.5;
  background: var(--amu-color-bg-fill) !important;
}
</style>
