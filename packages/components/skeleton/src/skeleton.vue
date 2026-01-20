<template>
  <template v-if="uiLoading">
    <div
      class="amu-skeleton"
      :class="{ 'is-animated': animated }"
      v-bind="$attrs"
    >
      <template v-if="rows > 0">
         <amu-skeleton-item
            v-for="i in rows"
            :key="i"
            :class="{
                'amu-skeleton__paragraph': i !== 1,
                'is-first': i === 1,
                'is-last': i === rows && rows > 1
            }"
            :variant="i === 1 ? 'h3' : 'text'"
            :style="{ width: rows > 1 && i === rows ? '61%' : '100%' }"
         />
      </template>
      <template v-else>
         <slot name="template">
            <!-- Default Fallback: Just one text line if rows=0 and no template provided? Or maybe nothing? -->
            <!-- Usually if slots.template is present, it's used. If not, and rows=0, maybe just one text line is a safe default or empty. -->
            <!-- But the plan says: "If rows>0, auto generate". If rows=0, we expect user to provide #template. -->
            <amu-skeleton-item variant="text" />
         </slot>
      </template>
    </div>
  </template>
  <template v-else>
    <slot v-bind="$attrs" />
  </template>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { skeletonProps } from './props'
import AmuSkeletonItem from './skeleton-item.vue'
import './style.css'

defineOptions({
  name: 'AmuSkeleton',
})

const props = defineProps(skeletonProps)

const innerLoading = ref(props.loading)

const uiLoading = computed(() => {
    return innerLoading.value
})

let timer: ReturnType<typeof setTimeout> | null = null

watch(
  () => props.loading,
  (val) => {
    if (props.throttle <= 0) {
      innerLoading.value = val
      return
    }

    if (val) {
      // Loading started
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        innerLoading.value = true
      }, props.throttle)
    } else {
      // Loading ended
      innerLoading.value = false
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
    }
  },
  { immediate: true }
)
</script>
