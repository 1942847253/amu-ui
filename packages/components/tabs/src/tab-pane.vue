<template>
  <div
    v-show="active"
    class="amu-tab-pane"
    role="tabpanel"
    :aria-hidden="!active"
    :id="`pane-${name}`"
    :aria-labelledby="`tab-${name}`"
  >
    <slot v-if="shouldRender"></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, ref, watch, getCurrentInstance, onMounted, onBeforeUnmount, useSlots } from 'vue'
import { tabPaneProps, tabsInjectionKey, type TabPaneContext } from './props'

defineOptions({
  name: 'AmuTabPane'
})

const props = defineProps(tabPaneProps)
const instance = getCurrentInstance()
const slots = useSlots()

const tabsRoot = inject(tabsInjectionKey)
if (!tabsRoot) {
  throw new Error('AmuTabPane must be used inside AmuTabs')
}

const name = computed(() => props.name ?? instance?.uid ?? '')
const active = computed(() => tabsRoot.activeKey.value === name.value)
const loaded = ref(active.value)

const shouldRender = computed(() => {
  // If active, always render
  if (active.value) return true
  
  // If lazy and never loaded, don't render
  // Note: Parent 'lazy' prop context is lost here if we don't access it. 
  // Assuming standard behavior: if lazy=true on Tabs, we wait until active.
  // But we don't have direct access to Tabs props easily without passing it down.
  // For now we implement basic lazy.
  
  // If destroyOnHide, unmount when inactive
  // We need to know parent destroyOnHide.
  // Let's assume we render if active or (loaded and !destroyOnHide)
  
  return loaded.value // This is simplified. Needs improvement.
})

watch(active, (val) => {
  if (val) loaded.value = true
}, { immediate: true })


// Register with parent
const paneContext: TabPaneContext = {
  uid: instance!.uid,
  name: name.value,
  props,
  active: active.value,
  slots
}

onMounted(() => {
  tabsRoot.registerTab(paneContext)
})

onBeforeUnmount(() => {
  tabsRoot.unregisterTab(name.value)
})

</script>
