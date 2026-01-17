<template>
  <AmuTable 
    :data="tableData" 
    style="width: 100%"
    border
  >
    <AmuTableColumn prop="date" label="Date" width="180">
      <template #default="{ row }">
        <span style="display: flex; align-items: center">
          <AmuIcon name="timer" style="margin-right: 8px" />
          {{ row.date }}
        </span>
      </template>
    </AmuTableColumn>
    
    <AmuTableColumn prop="name" label="Name" width="180">
      <template #default="{ row }">
        <AmuTag>{{ row.name }}</AmuTag>
      </template>
    </AmuTableColumn>

    <AmuTableColumn label="Operations">
      <template #default="{ row }">
        <AmuButton size="small" @click="handleEdit(row)">Edit</AmuButton>
        <AmuButton size="small" type="danger" @click="handleDelete(row)">Delete</AmuButton>
      </template>
    </AmuTableColumn>
  </AmuTable>
</template>

<script setup lang="ts">
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
]

const handleEdit = (row: any) => {
  console.log('Edit', row)
}
const handleDelete = (row: any) => {
  console.log('Delete', row)
}
</script>
