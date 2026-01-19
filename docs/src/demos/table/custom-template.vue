<template>
  <AmuTable :data="tableData" style="width: 100%" border>
    <AmuTableColumn prop="name" label="File Name" width="250">
      <template #default="{ row }">
        <div style="display: flex; align-items: center">
          <AmuIcon :name="row.type === 'folder' ? 'folder' : 'document'" style="margin-right: 8px; font-size: 16px;"
            color="var(--amu-color-primary)" />
          <span>{{ row.name }}</span>
        </div>
      </template>
    </AmuTableColumn>

    <AmuTableColumn prop="type" label="Type" width="120">
      <template #default="{ row }">
        <AmuTag :type="row.type === 'folder' ? 'info' : 'success'" size="small">{{ row.type.toUpperCase() }}</AmuTag>
      </template>
    </AmuTableColumn>

    <AmuTableColumn prop="size" label="Size" width="120" />
    <AmuTableColumn prop="modified" label="Last Modified" width="180" />

    <AmuTableColumn label="Operations">
      <template #default="{ row }">
        <AmuSpace>
          <AmuButton size="small" type="primary" link @click="handleDownload(row)">Download</AmuButton>
          <AmuButton size="small" status="danger" link @click="handleDelete(row)">Delete</AmuButton>
        </AmuSpace>
      </template>
    </AmuTableColumn>
  </AmuTable>
</template>

<script setup lang="ts">
import { AmuSpace } from 'amu-ui'

const tableData = [
  {
    name: 'Documents',
    type: 'folder',
    size: '--',
    modified: '2024-03-20 10:00'
  },
  {
    name: 'Project_Report.pdf',
    type: 'pdf',
    size: '2.5 MB',
    modified: '2024-03-19 14:30'
  },
  {
    name: 'Design_Assets.zip',
    type: 'zip',
    size: '154 MB',
    modified: '2024-03-18 09:15'
  },
  {
    name: 'budget_2024.xlsx',
    type: 'excel',
    size: '45 KB',
    modified: '2024-03-15 16:45'
  }
]

const handleDownload = (row: any) => {
  console.log('Downloading', row.name)
}
const handleDelete = (row: any) => {
  console.log('Deleting', row.name)
}
</script>
