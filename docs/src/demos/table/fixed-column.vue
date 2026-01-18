<template>
  <AmuTable :data="tableData" border style="width: 100%">
    <AmuTableColumn fixed="left" prop="task" label="Task Name" width="180" />
    <AmuTableColumn prop="status" label="Status" width="120" />
    <AmuTableColumn prop="priority" label="Priority" width="120" />
    <AmuTableColumn prop="assignee" label="Assignee" width="150" />
    <AmuTableColumn prop="startDate" label="Start Date" width="150" />
    <AmuTableColumn prop="endDate" label="End Date" width="150" />
    <AmuTableColumn prop="budget" label="Budget ($)" width="150" />
    <AmuTableColumn prop="spent" label="Spent ($)" width="150" />
    <AmuTableColumn prop="progress" label="Progress" width="180" />
    <AmuTableColumn fixed="right" label="Operations" width="140">
      <template #default>
        <amu-space>
          <AmuButton type="primary" status="danger" size="small">Detail</AmuButton>
          <AmuButton type="primary" link size="small">Edit</AmuButton>
        </amu-space>
      </template>
    </AmuTableColumn>
  </AmuTable>
</template>

<script setup lang="ts">
const tableData = [
  {
    task: 'Website Redesign',
    status: 'In Progress',
    priority: 'High',
    assignee: 'Design Team',
    startDate: '2024-03-01',
    endDate: '2024-04-15',
    budget: '50,000',
    spent: '12,500',
    progress: '25%'
  },
  {
    task: 'Mobile App Beta',
    status: 'Review',
    priority: 'Critical',
    assignee: 'Mobile Dev',
    startDate: '2024-02-15',
    endDate: '2024-03-30',
    budget: '120,000',
    spent: '115,000',
    progress: '95%'
  },
  {
    task: 'Q1 Marketing Report',
    status: 'Done',
    priority: 'Medium',
    assignee: 'Marketing',
    startDate: '2024-03-20',
    endDate: '2024-03-25',
    budget: '2,000',
    spent: '1,800',
    progress: '100%'
  },
  {
    task: 'Database Migration',
    status: 'Pending',
    priority: 'High',
    assignee: 'DevOps',
    startDate: '2024-04-01',
    endDate: '2024-04-05',
    budget: '15,000',
    spent: '0',
    progress: '0%'
  }
]
</script>
