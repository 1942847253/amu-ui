<template>
  <div class="page-container">
    <AmuCard class="page-card">
      <template #title>鉴权链路自测</template>
      <template #extra>
        <AmuTag type="warning">仅建议开发环境使用</AmuTag>
      </template>

      <AmuSpace direction="vertical" size="large" style="width: 100%">
        <AmuDescriptions :column="1" border>
          <AmuDescriptionsItem label="当前用户">{{ authStore.user?.username || '-' }}</AmuDescriptionsItem>
          <AmuDescriptionsItem label="当前角色">{{ authStore.user?.role || '-' }}</AmuDescriptionsItem>
          <AmuDescriptionsItem label="accessToken">{{ authStore.token || '-' }}</AmuDescriptionsItem>
          <AmuDescriptionsItem label="refreshToken">{{ authStore.refreshTokenValue || '-' }}</AmuDescriptionsItem>
          <AmuDescriptionsItem label="access 剩余秒数">{{ accessRemainSeconds }}</AmuDescriptionsItem>
          <AmuDescriptionsItem label="模拟延迟(ms)">{{ mockStore.delayMs }}</AmuDescriptionsItem>
          <AmuDescriptionsItem label="故障模式">{{ mockStore.faultMode }}</AmuDescriptionsItem>
        </AmuDescriptions>

        <AmuSpace wrap>
          <AmuButton :type="mockStore.delayMs === 50 ? 'primary' : 'default'" @click="mockStore.setDelay(50)">延迟 50ms</AmuButton>
          <AmuButton :type="mockStore.delayMs === 800 ? 'primary' : 'default'" @click="mockStore.setDelay(800)">延迟 800ms</AmuButton>
          <AmuButton :type="mockStore.delayMs === 2000 ? 'primary' : 'default'" @click="mockStore.setDelay(2000)">延迟 2000ms</AmuButton>
        </AmuSpace>

        <AmuSpace wrap>
          <AmuButton :type="mockStore.faultMode === 'none' ? 'primary' : 'default'" @click="mockStore.setFaultMode('none')">无故障</AmuButton>
          <AmuButton :type="mockStore.faultMode === 'timeout' ? 'primary' : 'default'" @click="mockStore.setFaultMode('timeout')">模拟超时</AmuButton>
          <AmuButton :type="mockStore.faultMode === 'http500' ? 'primary' : 'default'" @click="mockStore.setFaultMode('http500')">模拟 500</AmuButton>
          <AmuButton :type="mockStore.faultMode === 'bizError' ? 'primary' : 'default'" @click="mockStore.setFaultMode('bizError')">模拟业务异常</AmuButton>
          <AmuButton @click="resetFaultSettings">恢复默认</AmuButton>
        </AmuSpace>

        <AmuSpace wrap>
          <AmuButton :type="httpDebugEnabled ? 'primary' : 'default'" @click="toggleHttpDebug">
            {{ httpDebugEnabled ? '关闭 HTTP 调试日志' : '开启 HTTP 调试日志' }}
          </AmuButton>
        </AmuSpace>

        <AmuSpace wrap>
          <AmuButton @click="expireAccessToken">使 accessToken 立即过期</AmuButton>
          <AmuButton @click="expireRefreshToken">使 refreshToken 立即过期</AmuButton>
          <AmuButton type="primary" @click="restoreTokenPair">恢复有效 token 对</AmuButton>
        </AmuSpace>

        <AmuSpace wrap>
          <AmuButton type="primary" @click="requestOnce">发起单次业务请求</AmuButton>
          <AmuButton type="primary" @click="requestConcurrent">发起 5 个并发请求</AmuButton>
          <AmuButton @click="requestCancelable">发起可取消请求</AmuButton>
          <AmuButton @click="cancelPending">取消可取消请求</AmuButton>
          <AmuButton type="primary" :loading="scriptRunning" @click="runScriptedReplay">一键脚本化回放</AmuButton>
        </AmuSpace>

        <AmuCard>
          <template #title>执行日志</template>
          <template #extra>
            <AmuButton size="small" @click="logs = []">清空日志</AmuButton>
          </template>
          <div class="debug-log">{{ logs.join('\n') || '暂无日志' }}</div>
        </AmuCard>
      </AmuSpace>
    </AmuCard>
  </div>
</template>

<script setup lang="ts">
import { AmuButton } from 'amu-ui/button'
import { AmuCard } from 'amu-ui/card'
import { AmuDescriptions, AmuDescriptionsItem } from 'amu-ui/descriptions'
import { computed, ref } from 'vue'
import { AmuSpace } from 'amu-ui/space'
import { AmuTag } from 'amu-ui/tag'
import { AmuMessage } from 'amu-ui/message'
import { fetchDashboardOverview } from '../api/dashboard'
import { cancelRequest, requestGet } from '../api/http'
import { useAuthStore } from '../store/auth'
import { useMockStore } from '../store/mock'
import { isHttpDebugEnabled, setHttpDebugEnabled } from '../utils/http-debug'
import { createAccessToken, createRefreshToken, createTokenPair } from '../utils/token'

defineOptions({
  name: 'SystemAuthDebug'
})

const authStore = useAuthStore()
const mockStore = useMockStore()
const logs = ref<string[]>([])
const scriptRunning = ref(false)
const httpDebugEnabled = ref(isHttpDebugEnabled())
let concurrentBatch = 0

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const appendLog = (message: string) => {
  logs.value.unshift(`[${new Date().toLocaleTimeString('zh-CN', { hour12: false })}] ${message}`)
  logs.value = logs.value.slice(0, 30)
}

const accessRemainSeconds = computed(() => {
  if (!authStore.accessTokenExpiresAt) return '-'
  const remain = Math.floor((authStore.accessTokenExpiresAt - Date.now()) / 1000)
  return String(Math.max(remain, 0))
})

const resolveRole = () => authStore.user?.role ?? 'operator'

const createValidPair = () => {
  const role = resolveRole()
  return createTokenPair(role)
}

const expireAccessToken = () => {
  const role = resolveRole()
  const expiresAt = Date.now() - 1000
  authStore.setToken(createAccessToken(role, expiresAt), expiresAt)
  appendLog('已将 accessToken 设为过期')
}

const expireRefreshToken = () => {
  const role = resolveRole()
  authStore.setRefreshToken(createRefreshToken(role, Date.now() - 1000))
  appendLog('已将 refreshToken 设为过期')
}

const restoreTokenPair = () => {
  const next = createValidPair()
  authStore.setAuthTokens(next.accessToken, next.refreshToken, next.expiresAt)
  appendLog('已恢复有效 token 对')
  AmuMessage.success({ message: 'token 已恢复为有效状态' })
}

const requestOnce = async () => {
  try {
    const data = await fetchDashboardOverview()
    appendLog(`单次请求成功：visits=${data.visits}`)
  } catch (error) {
    appendLog(`单次请求失败：${(error as Error).message}`)
  }
}

const requestConcurrent = async () => {
  try {
    appendLog('开始并发请求 5 次')
    concurrentBatch += 1
    const tasks = Array.from({ length: 5 }).map((_, index) =>
      requestGet({
        url: '/api/dashboard/overview',
        requestKey: `dashboard-overview-batch-${concurrentBatch}-${index + 1}`,
        retry: 1
      })
    )
    const result = await Promise.all(tasks)
    appendLog(`并发请求完成：${result.length} / 5 成功`)
  } catch (error) {
    appendLog(`并发请求失败：${(error as Error).message}`)
  }
}

const requestCancelable = async () => {
  appendLog('发起可取消请求：requestKey=debug-cancel')
  requestGet({
    url: '/api/dashboard/overview',
    requestKey: 'debug-cancel',
    retry: 0,
    silentError: true
  })
    .then(() => appendLog('可取消请求完成'))
    .catch((error) => appendLog(`可取消请求结束：${(error as Error).message}`))
}

const cancelPending = () => {
  cancelRequest('debug-cancel')
  appendLog('已触发取消 debug-cancel 请求')
}

const resetFaultSettings = () => {
  mockStore.reset()
  appendLog('已恢复默认网络与故障配置')
}

const toggleHttpDebug = () => {
  httpDebugEnabled.value = !httpDebugEnabled.value
  setHttpDebugEnabled(httpDebugEnabled.value)
  appendLog(httpDebugEnabled.value ? '已开启 HTTP 调试日志（控制台可查看）' : '已关闭 HTTP 调试日志')
}

const runScriptedReplay = async () => {
  if (scriptRunning.value) return

  scriptRunning.value = true
  appendLog('开始脚本化回放：恢复 token 与网络配置')

  try {
    mockStore.reset()
    restoreTokenPair()
    await sleep(150)

    appendLog('步骤1：正常请求，预期成功')
    await requestOnce()
    await sleep(150)

    appendLog('步骤2：令 accessToken 过期，触发刷新后重放')
    expireAccessToken()
    await requestOnce()
    await sleep(150)

    appendLog('步骤3：令 refreshToken + accessToken 同时失效，预期回退登录')
    expireRefreshToken()
    expireAccessToken()
    await requestOnce()
  } catch (error) {
    appendLog(`脚本化回放结束（捕获异常）：${(error as Error).message}`)
  } finally {
    scriptRunning.value = false
  }
}
</script>

<style scoped>
.debug-log {
  white-space: pre-wrap;
  max-height: 400px;
  overflow: auto;
  padding: 16px;
  background: var(--amu-color-bg-fill);
  border-radius: var(--amu-radius);
  font-size: 13px;
  line-height: 1.6;
  font-family: monospace;
  border: 1px solid var(--amu-color-border);
}
</style>
