<template>
  <AmuTable 
    :data="tableData" 
    style="width: 100%"
    :default-sort="{ prop: 'score', order: 'descending' }"
    @sort-change="handleSortChange"
  >
    <AmuTableColumn prop="name" label="Employee" width="180" />
    <AmuTableColumn prop="department" label="Department" width="150" />
    <AmuTableColumn prop="projects" label="Projects Done" sortable width="150" />
    <AmuTableColumn prop="score" label="Performance Score" sortable width="180" />
    <AmuTableColumn prop="joinDate" label="Join Date" sortable />
  </AmuTable>
</template>

<script setup lang="ts">
const tableData = [
  {
    name: 'Sarah Connor',
    department: 'Sales',
    projects: 12,
    score: 95,
    joinDate: '2022-05-15'
  },
  {
    name: 'John Doe',
    department: 'Engineering',
    projects: 8,
    score: 88,
    joinDate: '2023-01-10'
  },
  {
    name: 'Emily Blunt',
    department: 'Design',
    projects: 15,
    score: 92,
    joinDate: '2021-11-05'
  },
  {
    name: 'Michael Scott',
    department: 'Management',
    projects: 5,
    score: 75,
    joinDate: '2019-03-20'
  }
]

const handleSortChange = ({ column, prop, order }: any) => {
    console.log('Sort changed:', column, prop, order)
}
</script>
