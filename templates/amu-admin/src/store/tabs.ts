import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export interface VisitedTab {
  path: string
  title: string
  name?: string
  closable: boolean
  keepAlive: boolean
}

const DEFAULT_TAB: VisitedTab = {
  path: '/dashboard',
  title: '仪表盘',
  name: 'Dashboard',
  closable: false,
  keepAlive: true
}

export const useTabsStore = defineStore('tabs', () => {
  const visitedTabs = ref<VisitedTab[]>([DEFAULT_TAB])

  const cacheNames = computed(() => {
    return visitedTabs.value
      .filter((tab) => tab.keepAlive && tab.name)
      .map((tab) => tab.name as string)
  })

  const upsertTab = (tab: VisitedTab) => {
    const index = visitedTabs.value.findIndex((item) => item.path === tab.path)
    if (index === -1) {
      visitedTabs.value.push(tab)
      return
    }
    visitedTabs.value[index] = { ...visitedTabs.value[index], ...tab }
  }

  const removeTab = (path: string) => {
    const item = visitedTabs.value.find((tab) => tab.path === path)
    if (!item?.closable) return
    visitedTabs.value = visitedTabs.value.filter((tab) => tab.path !== path)
  }

  const reset = () => {
    visitedTabs.value = [DEFAULT_TAB]
  }

  return {
    visitedTabs,
    cacheNames,
    upsertTab,
    removeTab,
    reset
  }
})
