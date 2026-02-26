import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export type FaultMode = 'none' | 'timeout' | 'http500' | 'bizError'

export const useMockStore = defineStore('mock', () => {
  const delayMs = ref(200)
  const faultMode = ref<FaultMode>('none')

  const isFaultEnabled = computed(() => faultMode.value !== 'none')

  const setDelay = (nextDelay: number) => {
    delayMs.value = Math.max(0, nextDelay)
  }

  const setFaultMode = (mode: FaultMode) => {
    faultMode.value = mode
  }

  const reset = () => {
    delayMs.value = 200
    faultMode.value = 'none'
  }

  return {
    delayMs,
    faultMode,
    isFaultEnabled,
    setDelay,
    setFaultMode,
    reset
  }
})
