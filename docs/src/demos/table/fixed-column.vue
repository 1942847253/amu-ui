<template>
  <AmuTable 
    :data="tableData" 
    border
    style="width: 100%"
  >
    <AmuTableColumn fixed="left" prop="date" label="Date (Fixed Left)" width="150" />
    <AmuTableColumn prop="name" label="Name" width="300" />
    <AmuTableColumn prop="province" label="Province" width="300" />
    <AmuTableColumn prop="city" label="City" width="300" />
    <AmuTableColumn prop="address" label="Address" width="600" />
    <AmuTableColumn prop="zip" label="Zip" width="120" />
    <AmuTableColumn fixed="right" label="Operations (Fixed Right)" width="120">
      <template #default>
        <AmuButton type="text" size="small">Detail</AmuButton>
        <AmuButton type="text" size="small">Edit</AmuButton>
      </template>
    </AmuTableColumn>
  </AmuTable>
</template>

<script setup lang="ts">
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    province: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    province: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    province: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
]
</script>
