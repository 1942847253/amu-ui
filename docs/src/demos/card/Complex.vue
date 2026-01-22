<template>
  <amu-card
    title="Real-time Monitoring"
    collapsible
    maximizable
    closable
    style="width: 100%"
    @close="onClose"
  >
    <template #extra>
      <div class="status-indicator">
        <span class="dot pulse"></span>
        Running
      </div>
    </template>
    
    <div class="monitor-content">
      <div class="monitor-item">
        <div class="label">CPU Usage</div>

        <amu-progress :percentage="45"  :stroke-width="6" />
      </div>
      <div class="monitor-item">
        <div class="label">Memory</div>
        <amu-progress :percentage="72" color="orange" :show-text="true"  :stroke-width="6" />
      </div>
      <div class="monitor-item">
        <div class="label">Storage</div>
        <amu-progress :percentage="28"  :stroke-width="6" />
      </div>
    </div>

    <template #actions>
      <amu-button type="text">View Logs</amu-button>
      <amu-button type="text">Restart Service</amu-button>
    </template>
  </amu-card>
</template>

<script lang="ts" setup>
import { AmuCard, AmuButton, AmuProgress } from 'amu-ui'

const onClose = () => {
  console.log('Close clicked')
}
</script>

<style scoped>
.status-indicator {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--amu-color-status-success);
}

.dot {
  width: 8px;
  height: 8px;
  background-color: currentColor;
  border-radius: 50%;
  display: inline-block;
}

.dot.pulse {
  box-shadow: 0 0 0 rgba(34, 197, 94, 0.4);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); }
  70% { box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); }
  100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
}

.monitor-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 8px 0;
}

.monitor-item {
  display: grid;
  align-items: center;
  gap: 12px;
}

.label {
  color: var(--amu-color-text-default);
  font-size: 13px;
}

.value {
  font-weight: 600;
  font-family: monospace;
}
</style>
