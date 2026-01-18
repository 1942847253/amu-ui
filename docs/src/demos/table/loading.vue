<template>
  <div style="margin-bottom: 20px">
    <amu-switch v-model="loading" active-text="Loading" inactive-text="Loaded" />
  </div>

  <amu-table :data="tableData" style="width: 100%" :loading="loading" loading-text="正在努力加载中...">
    <amu-table-column prop="date" label="Date" width="180" />
    <amu-table-column prop="name" label="Name" width="180" />
    <amu-table-column prop="address" label="Address" />
  </amu-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const loading = ref(true)

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
</script>
