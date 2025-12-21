<template>
  <section
    :class="[
      'amu-layout',
      {
        'amu-layout--horizontal': computedDirection === 'horizontal',
        'amu-layout--vertical': computedDirection === 'vertical',
        'amu-layout--has-sider': hasSider || computedDirection === 'horizontal'
      }
    ]"
  >
    <slot />
  </section>
</template>

<script setup lang="ts">
import { computed, provide, ref, useSlots } from 'vue'
import { layoutProps } from './props'

defineOptions({
  name: 'AmuLayout'
})

const props = defineProps(layoutProps)
const slots = useSlots()

// 检测是否有 Sider 子组件
const hasSiderChild = computed(() => {
  if (props.hasSider) return true
  
  const children = slots.default?.({}) || []
  return children.some((vnode: any) => {
    const type = vnode.type
    const name = type?.name || type?.__name
    return name === 'AmuSider'
  })
})

// 计算实际的布局方向
const computedDirection = computed(() => {
  if (props.direction) return props.direction
  return hasSiderChild.value ? 'horizontal' : 'vertical'
})

// 提供侧边栏注册能力
const siderHook = ref<(() => void) | null>(null)

provide('amuLayoutSiderHook', siderHook)
</script>
