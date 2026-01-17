<template>
  <div>
    <div style="margin-bottom: 16px">
      <AmuRadioGroup v-model="size">
        <AmuRadioButton label="large">Large</AmuRadioButton>
        <AmuRadioButton label="default">Default</AmuRadioButton>
        <AmuRadioButton label="small">Small</AmuRadioButton>
      </AmuRadioGroup>
    </div>
    
    <AmuTable 
      :data="tableData" 
      :size="size"
      border
    >
      <AmuTableColumn prop="date" label="Date" width="180" />
      <AmuTableColumn prop="name" label="Name" width="180" />
      <AmuTableColumn prop="address" label="Address" />
    </AmuTable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const size = ref('default')

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
]
</script>
