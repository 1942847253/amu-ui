<template>
  <amu-tabs v-model="activeKey">
    <amu-tab-pane name="one" title="Tab 1">Content of Tab Pane 1</amu-tab-pane>
    <amu-tab-pane name="two" title="Tab 2">Content of Tab Pane 2</amu-tab-pane>
    <amu-tab-pane name="three" title="Tab 3" disabled>Content of Tab Pane 3</amu-tab-pane>
    <amu-tab-pane name="four" title="Tab 4">Content of Tab Pane 4</amu-tab-pane>
  </amu-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeKey = ref('one')
</script>
