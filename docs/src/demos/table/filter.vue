<template>
  <AmuTable 
    row-key="date"
    :data="tableData" 
    style="width: 100%"
    @filter-change="handleFilterChange"
  >
    <AmuTableColumn 
      prop="date" 
      label="Date" 
      sortable 
      width="180" 
      column-key="date"
      :filters="[
        { text: '2016-05-01', value: '2016-05-01' },
        { text: '2016-05-02', value: '2016-05-02' },
        { text: '2016-05-03', value: '2016-05-03' },
        { text: '2016-05-04', value: '2016-05-04' }
      ]"
      :filter-method="filterHandler"
    />
    <AmuTableColumn 
      prop="name" 
      label="Name" 
      width="180" 
    />
    <AmuTableColumn 
      prop="address" 
      label="Address" 
    />
    <AmuTableColumn
      prop="tag"
      label="Tag"
      width="100"
      :filters="[
        { text: 'Home', value: 'Home' },
        { text: 'Office', value: 'Office' }
      ]"
      :filter-method="filterTag"
      filter-placement="bottom-end"
    >
      <template #default="{ row }">
        <AmuTag
          :type="row.tag === 'Home' ? '' : 'success'"
          disable-transitions
        >{{ row.tag }}</AmuTag>
      </template>
    </AmuTableColumn>
  </AmuTable>
</template>

<script setup lang="ts">
import { AmuTable, AmuTableColumn, AmuTag } from 'amu-ui'

const filterTag = (value: any, row: any) => {
  return row.tag === value
}

const filterHandler = (value: any, row: any, column: any) => {
  const property = column.prop
  return row[property] === value
}

const handleFilterChange = (filters: any) => {
    console.log('Filters changed:', filters)
}

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    tag: 'Home',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    tag: 'Office',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    tag: 'Home',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    tag: 'Office',
  },
]
</script>
