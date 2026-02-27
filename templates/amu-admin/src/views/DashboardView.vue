<template>
  <div class="dashboard">
    <AmuRow :gutter="16">
      <AmuCol :span="6" v-for="item in stats" :key="item.label">
        <AmuCard class="stat-card">
          <div class="stat-item">
            <div class="stat-item__top">
              <div class="stat-item__label">{{ item.label }}</div>
              <div class="stat-item__total">{{ item.total }}</div>
            </div>
            <div class="stat-item__value">{{ item.value }}</div>
            <div class="stat-item__sub">{{ item.sub }}</div>
          </div>
        </AmuCard>
      </AmuCol>
    </AmuRow>

    <div v-if="isLoading" class="dashboard__state">数据加载中...</div>
    <div v-else-if="loadError" class="dashboard__state dashboard__state--error">
      <span>{{ loadError }}</span>
      <AmuButton size="small" @click="loadOverview">重试</AmuButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AmuButton } from 'amu-ui/button'
import { AmuCard } from 'amu-ui/card'
import { AmuCol } from 'amu-ui/col'
import { AmuRow } from 'amu-ui/row'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { fetchDashboardOverview } from '../api/dashboard'
import { cancelRequest } from '../api/http'

defineOptions({
  name: 'Dashboard'
})

const stats = ref([
  { label: '用户量', value: '--', sub: '总用户量', total: '--' },
  { label: '访问量', value: '--', sub: '总访问量', total: '--' },
  { label: '下载量', value: '--', sub: '总下载量', total: '--' },
  { label: '使用量', value: '--', sub: '总使用量', total: '--' }
])
const isLoading = ref(false)
const loadError = ref('')

const loadOverview = async () => {
  isLoading.value = true
  loadError.value = ''

  try {
    const data = await fetchDashboardOverview(true)
    stats.value = [
      {
        label: '用户量',
        value: data.newUsers.toLocaleString('zh-CN'),
        sub: '总用户量',
        total: (data.newUsers * 24).toLocaleString('zh-CN')
      },
      {
        label: '访问量',
        value: data.visits.toLocaleString('zh-CN'),
        sub: '总访问量',
        total: (data.visits * 25).toLocaleString('zh-CN')
      },
      {
        label: '下载量',
        value: data.pendingTickets.toLocaleString('zh-CN'),
        sub: '总下载量',
        total: (data.pendingTickets * 40).toLocaleString('zh-CN')
      },
      {
        label: '使用量',
        value: (data.newUsers + data.pendingTickets).toLocaleString('zh-CN'),
        sub: '总使用量',
        total: (data.visits + data.newUsers * 5).toLocaleString('zh-CN')
      }
    ]
  } catch (error) {
    loadError.value = error instanceof Error ? error.message : '数据加载失败，请稍后重试'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  void loadOverview()
})

onBeforeUnmount(() => {
  cancelRequest('dashboard-overview')
})
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.stat-card {
  transition: transform 0.2s, box-shadow 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.stat-item {
  display: grid;
  gap: 12px;
  padding: 8px 4px;
}

.stat-item__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.stat-item__label {
  color: var(--amu-color-text-secondary);
  font-size: 14px;
  font-weight: 500;
}

.stat-item__total {
  color: var(--amu-color-text-placeholder);
  font-size: 13px;
  background: var(--amu-color-bg-fill);
  padding: 2px 8px;
  border-radius: 12px;
}

.stat-item__value {
  font-size: 32px;
  font-weight: 700;
  line-height: 1.2;
  color: var(--amu-color-text-default);
}

.stat-item__sub {
  color: var(--amu-color-text-secondary);
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.stat-item__sub::before {
  content: '';
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--amu-color-primary);
}

.dashboard__state {
  margin-top: 16px;
  padding: 16px 20px;
  border: 1px solid var(--amu-color-border);
  border-radius: var(--amu-radius);
  background: var(--amu-color-bg-elevated);
  color: var(--amu-color-text-default);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}

.dashboard__state--error {
  color: var(--amu-color-status-danger);
  border-color: var(--amu-color-status-danger);
  background: rgba(var(--amu-color-status-danger-rgb), 0.05);
}
</style>
