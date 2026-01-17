<template>
  <div>
    <p>Height 250px:</p>
    <AmuTable 
      :data="tableData" 
      height="250" 
      border
      style="width: 100%"
    >
      <AmuTableColumn prop="date" label="Date" width="180" />
      <AmuTableColumn prop="name" label="Name" width="180" />
      <AmuTableColumn prop="address" label="Address" />
    </AmuTable>
  </div>
</template>

<script setup lang="ts">
const tableData = Array.from({ length: 20 }).map((_, idx) => ({
  date: '2016-05-02',
  name: `Tom ${idx + 1}`,
  address: 'No. 189, Grove St, Los Angeles',
}))
</script>
