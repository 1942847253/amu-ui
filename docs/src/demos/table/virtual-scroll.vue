<template>
  <div>
    <p>Rendering 10,000 system events with virtual scrolling.</p>
    <AmuTable 
      height="400" 
      :data="bigData" 
      virtual
      :row-height="50"
      border
      stripe
    >
      <AmuTableColumn type="index" label="#" width="80" fixed="left" />
      <AmuTableColumn prop="eventId" label="Event ID" width="150" />
      <AmuTableColumn prop="type" label="Type" width="120">
        <template #default="{ row }">
           <AmuTag :type="row.typeColor" size="small">{{ row.type }}</AmuTag>
        </template>
      </AmuTableColumn>
      <AmuTableColumn prop="timestamp" label="Timestamp" width="200" />
      <AmuTableColumn prop="source" label="Source IP" width="150" />
      <AmuTableColumn prop="message" label="Details" width="400" show-overflow-tooltip />
      <AmuTableColumn label="Action" width="100" fixed="right">
        <template #default>
           <AmuButton size="small" link type="primary">View</AmuButton>
        </template>
      </AmuTableColumn>
    </AmuTable>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const eventTypes = [
  { name: 'LOGIN', color: 'success' },
  { name: 'LOGOUT', color: 'info' },
  { name: 'ERROR', color: 'danger' },
  { name: 'WARNING', color: 'warning' },
  { name: 'REQUEST', color: 'primary' }
]

const messages = [
  'User login successful',
  'Connection timeout from remote host',
  'Invalid password attempt',
  'Database query execution time > 1s',
  'API Request: GET /api/v1/users',
  'Session expired, user logged out'
]

const generateData = (length: number) => {
  return Array.from({ length }).map((_, idx) => {
    const typeObj = eventTypes[idx % 5]
    return {
      eventId: `EVT-${10000 + idx}`,
      type: typeObj.name,
      typeColor: typeObj.color,
      timestamp: `2024-03-20 10:${String(idx % 60).padStart(2, '0')}:${String(idx % 60).padStart(2, '0')}`,
      source: `192.168.1.${idx % 255}`,
      message: messages[idx % 6] + ` (Trace ID: ${Math.random().toString(36).substring(7)})`
    }
  })
}

const bigData = ref(generateData(10000))
</script>
