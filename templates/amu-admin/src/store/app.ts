import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { readStorage, writeStorage } from '../utils/storage'

const THEME_KEY = 'amu-admin-theme'
const SIDEBAR_KEY = 'amu-admin-sidebar-collapsed'

export const useAppStore = defineStore('app', () => {
  const theme = readStorage(THEME_KEY)
  const isDark = ref(theme === 'dark')

  const sidebar = readStorage(SIDEBAR_KEY)
  const sidebarCollapsed = ref(sidebar === '1')

  watch(isDark, (value) => {
    writeStorage(THEME_KEY, value ? 'dark' : 'light')
  })

  watch(sidebarCollapsed, (value) => {
    writeStorage(SIDEBAR_KEY, value ? '1' : '0')
  })

  return {
    isDark,
    sidebarCollapsed
  }
})
