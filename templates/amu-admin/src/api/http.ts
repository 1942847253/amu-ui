import { AmuMessage } from 'amu-ui/message'
import router from '../router'
import { useAuthStore } from '../store/auth'
import { useMockStore } from '../store/mock'
import { usePermissionStore } from '../store/permission'
import { useTabsStore } from '../store/tabs'
import { createHttpTraceId, debugHttp } from '../utils/http-debug'
import { createTokenPair, parseAccessToken, parseRefreshToken } from '../utils/token'
import type { TokenPair } from '../utils/token'
import type { ApiResponse, HttpResponseLike, RequestConfig, ResolvedRequestConfig } from '../utils/request'
import { HttpClient, HttpError, RequestCanceledError } from '../utils/request'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const normalizePath = (url: string) => {
  return url.replace(/^https?:\/\/[^/]+/, '')
}

const mockAdapter = async (config: ResolvedRequestConfig): Promise<HttpResponseLike> => {
  const mockStore = useMockStore()
  await delay(mockStore.delayMs)

  const pathname = normalizePath(config.url)
  const authHeader = config.headers.Authorization
  const accessToken = typeof authHeader === 'string' ? authHeader.replace(/^Bearer\s+/, '') : ''

  let payload: ApiResponse<unknown>

  if (pathname !== '/api/auth/refresh') {
    if (mockStore.faultMode === 'timeout') {
      throw new HttpError('模拟超时：请求超过预期时间', 408)
    }
    if (mockStore.faultMode === 'http500') {
      return {
        status: 500,
        json: async <T>() => ({ code: 500, message: '模拟服务端异常', data: null }) as T
      }
    }
    if (mockStore.faultMode === 'bizError') {
      return {
        status: 200,
        json: async <T>() => ({ code: 50011, message: '模拟业务异常', data: null }) as T
      }
    }
  }

  if (pathname === '/api/auth/refresh') {
    const refreshToken = config.headers['X-Refresh-Token']
    const parsedRefreshToken = typeof refreshToken === 'string' ? parseRefreshToken(refreshToken) : null

    if (!parsedRefreshToken || parsedRefreshToken.expiresAt <= Date.now()) {
      payload = {
        code: 40102,
        message: 'refreshToken 已失效',
        data: null
      }
    } else {
      payload = {
        code: 0,
        message: 'ok',
        data: createTokenPair(parsedRefreshToken.role)
      }
    }
  } else if (pathname === '/api/dashboard/overview') {
    const parsedAccessToken = parseAccessToken(accessToken)

    if (!parsedAccessToken || parsedAccessToken.expiresAt <= Date.now()) {
      payload = {
        code: 40101,
        message: 'accessToken 已过期',
        data: null
      }
    } else {
      payload = {
        code: 0,
        message: 'ok',
        data: {
          visits: 12480,
          pendingTickets: 86,
          newUsers: 1024
        }
      }
    }
  } else {
    payload = {
      code: 40401,
      message: '接口不存在',
      data: null
    }
  }

  return {
    status: 200,
    json: async <T>() => payload as T
  }
}

export const httpClient = new HttpClient(mockAdapter, {
  40101: '登录态失效，正在尝试刷新凭证',
  40102: '刷新凭证失效，请重新登录',
  40401: '接口未定义，请检查路由映射',
  50011: '业务规则校验失败'
})

let refreshingPromise: Promise<string> | null = null

const refreshAccessToken = async (): Promise<string> => {
  if (!refreshingPromise) {
    const authStore = useAuthStore()
    const refreshStartedAt = Date.now()
    const refreshTraceId = createHttpTraceId()
    debugHttp('开始刷新 accessToken', { traceId: refreshTraceId })

    refreshingPromise = httpClient
      .post<TokenPair>({
        url: '/api/auth/refresh',
        requestKey: 'auth-refresh-token',
        headers: {
          'X-Skip-Refresh': '1',
          'X-Refresh-Token': authStore.refreshTokenValue || ''
        },
        retry: 0,
        silentCancel: true
      })
      .then((result) => {
        authStore.applyRefreshResult(result.accessToken, result.refreshToken, result.expiresAt)
        debugHttp('刷新 accessToken 成功', {
          traceId: refreshTraceId,
          expiresAt: result.expiresAt,
          durationMs: Date.now() - refreshStartedAt
        })
        return result.accessToken
      })
      .catch((error) => {
        debugHttp('刷新 accessToken 失败', {
          traceId: refreshTraceId,
          message: extractErrorMessage(error),
          durationMs: Date.now() - refreshStartedAt
        }, 'error')
        return ''
      })
      .finally(() => {
        debugHttp('刷新流程结束', { traceId: refreshTraceId })
        refreshingPromise = null
      })
  } else {
    debugHttp('复用进行中的刷新请求')
  }

  return refreshingPromise
}

httpClient.useRequestInterceptor(async (config) => {
  const authStore = useAuthStore()
  const skipRefresh = config.headers['X-Skip-Refresh'] === '1'

  if (!skipRefresh && authStore.refreshTokenValue && authStore.shouldRefreshSoon(30 * 1000)) {
    debugHttp('命中刷新窗口，准备刷新 token', {
      url: config.url,
      method: config.method
    }, 'warn')
    await refreshAccessToken()
  }

  if (authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`
  }
  return config
})

httpClient.useResponseInterceptor((payload) => payload)

httpClient.useErrorInterceptor((error) => {
  return error
})

const extractErrorMessage = (error: unknown) => {
  if (error instanceof HttpError) return error.message
  if (error instanceof Error) return error.message
  return '请求失败，请稍后重试'
}

const isAuthError = (error: unknown) => {
  if (!(error instanceof HttpError)) return false
  return error.status === 401 || error.code === 40101 || error.code === 40102
}

const fallbackToLogin = async () => {
  debugHttp('触发回退登录流程', undefined, 'warn')
  const authStore = useAuthStore()
  authStore.logout()
  usePermissionStore().reset()
  useTabsStore().reset()
  await router.replace('/login')
}

const requestWithRetry = async <T>(
  executor: () => Promise<T>,
  retryOnAuthError = true,
  silentError = false,
  requestLabel = 'request',
  traceId = createHttpTraceId()
): Promise<T> => {
  let shouldSilentError = silentError
  const startedAt = Date.now()
  debugHttp('发起请求', { traceId, requestLabel, retryOnAuthError, silentError })

  try {
    const result = await executor()
    debugHttp('请求成功', { traceId, requestLabel, durationMs: Date.now() - startedAt })
    return result
  } catch (error) {
    if (error instanceof RequestCanceledError) {
      debugHttp('请求取消', { traceId, requestLabel, durationMs: Date.now() - startedAt }, 'warn')
      throw error
    }

    if (isAuthError(error) && retryOnAuthError) {
      debugHttp('命中鉴权错误，准备重试', {
        traceId,
        requestLabel,
        message: extractErrorMessage(error)
      }, 'warn')
      const refreshed = await refreshAccessToken()
      if (refreshed) {
        return requestWithRetry(executor, false, silentError, `${requestLabel}-retry`, traceId)
      }
      await fallbackToLogin()
      shouldSilentError = true
    }

    debugHttp('请求失败', {
      traceId,
      requestLabel,
      message: extractErrorMessage(error),
      durationMs: Date.now() - startedAt
    }, 'error')

    if (!shouldSilentError) {
      AmuMessage.error({ message: extractErrorMessage(error) })
    }
    throw error
  }
}

export const requestGet = <T = unknown>(config: Omit<RequestConfig, 'method'> & { silentError?: boolean }) => {
  const { silentError = false, ...rest } = config
  const requestLabel = `GET:${rest.requestKey || rest.url}`
  return requestWithRetry(() => httpClient.get<T>(rest), true, silentError, requestLabel)
}

export const requestPost = <T = unknown>(config: Omit<RequestConfig, 'method'> & { silentError?: boolean }) => {
  const { silentError = false, ...rest } = config
  const requestLabel = `POST:${rest.requestKey || rest.url}`
  return requestWithRetry(() => httpClient.post<T>(rest), true, silentError, requestLabel)
}

export const cancelRequest = (requestKey: string) => {
  httpClient.cancel(requestKey)
}
