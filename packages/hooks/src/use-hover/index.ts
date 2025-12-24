import { onBeforeUnmount, ref, watch, type Ref } from 'vue'

export function useHover(targetRef: Ref<HTMLElement | undefined>) {
  const hovered = ref(false)

  const onEnter = () => {
    hovered.value = true
  }

  const onLeave = () => {
    hovered.value = false
  }

  const bind = (el: HTMLElement) => {
    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
  }

  const unbind = (el: HTMLElement) => {
    el.removeEventListener('mouseenter', onEnter)
    el.removeEventListener('mouseleave', onLeave)
  }

  watch(
    targetRef,
    (el, prev) => {
      if (prev) unbind(prev)
      if (el) bind(el)
    },
    { immediate: true },
  )

  onBeforeUnmount(() => {
    if (targetRef.value) unbind(targetRef.value)
  })

  return {
    hovered,
  }
}
