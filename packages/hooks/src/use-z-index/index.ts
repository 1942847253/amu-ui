import { ref, computed } from 'vue'

const zIndex = ref(2000)

export const useZIndex = () => {
  const initialZIndex = ref(2000)

  const currentZIndex = computed(() => zIndex.value)

  const nextZIndex = () => {
    zIndex.value++
    return zIndex.value
  }

  return {
    initialZIndex,
    currentZIndex,
    nextZIndex,
  }
}
