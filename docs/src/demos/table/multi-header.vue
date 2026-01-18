<template>
  <AmuTable :data="tableData" border style="width: 100%">
    <!-- 员工信息 -->
    <AmuTableColumn prop="name" label="负责人" width="100" />
    
    <!-- 项目概况 -->
    <AmuTableColumn label="项目概况">
      <!-- 进度状态 -->
      <AmuTableColumn prop="status" label="当前进度" width="140" sortable>
        <template #default="{ row }">
           <AmuTag v-if="row.status === 'completed'" type="success" size="small" round>
             <div style="display: flex; align-items: center; gap: 4px;">
                <AmuIcon>
                  <IconCheckCircle />
                </AmuIcon>
                <span>已交付</span>
             </div>
           </AmuTag>
           <AmuTag v-else-if="row.status === 'delayed'" type="danger" size="small" round>
             <div style="display: flex; align-items: center; gap: 4px;">
                <AmuIcon>
                   <IconXCircle />
                </AmuIcon>
                <span>已延期</span>
             </div>
           </AmuTag>
           <AmuTag v-else-if="row.status === 'processing'" type="primary" size="small" round>
             <div style="display: flex; align-items: center; gap: 4px;">
                <AmuIcon>
                   <IconActivity />
                </AmuIcon>
                <span>进行中</span>
             </div>
           </AmuTag>
        </template>
      </AmuTableColumn>
      
      <!-- 项目详情 -->
      <AmuTableColumn label="项目详情">
        <AmuTableColumn prop="priority" label="优先级" width="100" />
        <AmuTableColumn prop="weeks" label="工期(周)" width="120" />
      </AmuTableColumn>
    </AmuTableColumn>

    <!-- 预算分布 -->
    <AmuTableColumn prop="budget1" label="研发成本" width="100" />
    <AmuTableColumn prop="budget2" label="营销预算" width="100" />
    <AmuTableColumn prop="budget3" label="运营杂费" width="100" />
    <AmuTableColumn prop="budget4" label="预留金" width="120" />

    <!-- 最终审核 -->
    <AmuTableColumn label="最终审核" fixed="right">
       <AmuTableColumn prop="auditor" label="审核人" width="120" />
    </AmuTableColumn>
  </AmuTable>
</template>

<script setup lang="ts">
import { AmuTable, AmuTableColumn, AmuTag, AmuIcon } from 'amu-ui'
import { IconCheckCircle, IconXCircle, IconActivity } from '@amu-ui/icons'

const tableData = [
  { name: 'Alex', status: 'completed', priority: 'P0', weeks: 12, budget1: 3500, budget2: 1200, budget3: 500, budget4: 1000, auditor: 'CTO' },
  { name: 'Sarah', status: 'delayed', priority: 'P1', weeks: 8, budget1: 2200, budget2: 800, budget3: 300, budget4: 500, auditor: 'Product Lead' },
  { name: 'Mike', status: 'processing', priority: 'P1', weeks: 16, budget1: 4500, budget2: 2400, budget3: 800, budget4: 1500, auditor: 'CEO' },
  { name: 'Emily', status: 'completed', priority: 'P2', weeks: 4, budget1: 1000, budget2: 200, budget3: 100, budget4: 200, auditor: 'Tech Lead' },
  { name: 'David', status: 'processing', priority: 'P0', weeks: 24, budget1: 8500, budget2: 5000, budget3: 2000, budget4: 3000, auditor: 'Board' }
]
</script>
