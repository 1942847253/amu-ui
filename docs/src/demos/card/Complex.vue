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
        <div class="value">45%</div>
        <div class="bar-bg"><div class="bar-fill" style="width: 45%"></div></div>
      </div>
      <div class="monitor-item">
        <div class="label">Memory</div>
        <div class="value">72%</div>
        <div class="bar-bg"><div class="bar-fill warning" style="width: 72%"></div></div>
      </div>
      <div class="monitor-item">
        <div class="label">Storage</div>
        <div class="value">28%</div>
        <div class="bar-bg"><div class="bar-fill" style="width: 28%"></div></div>
      </div>
    </div>

    <template #actions>
      <amu-button type="text">View Logs</amu-button>
      <amu-button type="text">Restart Service</amu-button>
    </template>
  </amu-card>
</template>

<script lang="ts" setup>
import { AmuCard, AmuButton } from 'amu-ui'

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
  grid-template-columns: 80px 40px 1fr;
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

.bar-bg {
  height: 6px;
  background: var(--amu-color-bg-fill);
  border-radius: 3px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: var(--amu-color-primary);
  border-radius: 3px;
}

.bar-fill.warning {
  background: var(--amu-color-status-warning);
}
</style>
