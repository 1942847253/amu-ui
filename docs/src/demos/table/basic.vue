<template>
  <div>
    <div style="margin-bottom: 16px; display: flex; align-items: center;">
      <AmuSwitch v-model="stripe" />
      <span style="margin: 0 8px">Stripe 斑马纹</span>
      <span style="margin: 0 10px"></span>
      <AmuSwitch v-model="border" />
      <span style="margin: 0 8px">Border 边框</span>
    </div>
    
    <AmuTable 
      :data="tableData" 
      :stripe="stripe" 
      :border="border"
    >
      <AmuTableColumn prop="date" label="Date" width="180" />
      <AmuTableColumn prop="name" label="Name" width="180" />
      <AmuTableColumn prop="address" label="Address" />
    </AmuTable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const stripe = ref(true)
const border = ref(true)

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
