<script lang="ts" setup>
import { ref } from 'vue'

const activeKey = ref('1')

const beforeLeave = (newTab: string | number) => {
  if (newTab === '2') {
     alert('Tab 2 is disabled from entering!')
     return false
  }
  return true
}
</script>

<template>
  <amu-tabs v-model="activeKey" :before-leave="beforeLeave">
    <amu-tab-pane name="1" title="Tab 1">
      Can switch to Tab 3, but not Tab 2.
    </amu-tab-pane>
    <amu-tab-pane name="2" title="Tab 2">
      You can't see this content by clicking.
    </amu-tab-pane>
    <amu-tab-pane name="3" title="Tab 3">
      Content of Tab 3
    </amu-tab-pane>
  </amu-tabs>
</template>
