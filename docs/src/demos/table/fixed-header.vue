<template>
  <div>
    <p>固定高度 (250px) - 系统操作日志:</p>
    <AmuTable 
      :data="tableData" 
      height="250" 
      border
      style="width: 100%"
    >
      <AmuTableColumn prop="id" label="Log ID" width="100" />
      <AmuTableColumn prop="time" label="Timestamp" width="180" />
      <AmuTableColumn prop="level" label="Level" width="80" />
      <AmuTableColumn prop="source" label="Source" width="120" />
      <AmuTableColumn prop="message" label="Message" />
    </AmuTable>
  </div>
</template>

<script setup lang="ts">
const levels = ['INFO', 'WARN', 'ERROR', 'DEBUG']
const sources = ['API Gateway', 'Auth Service', 'Payment Service', 'User Service']
const messages = [
  'Request processed successfully in 45ms',
  'Connection timeout, retrying...',
  'Invalid parameter: user_id is null',
  'Cache hit for key: user_profile_123'
]

const tableData = Array.from({ length: 20 }).map((_, idx) => ({
  id: 1000 + idx,
  time: `2024-03-20 10:${String(idx).padStart(2, '0')}:15`,
  level: levels[idx % 4],
  source: sources[idx % 4],
  message: messages[idx % 4]
}))
</script>
