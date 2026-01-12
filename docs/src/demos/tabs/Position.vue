<template>
  <amu-space direction="vertical" style="width: 100%">
    <amu-radio-group v-model="position">
      <amu-radio-button label="top">Top</amu-radio-button>
      <amu-radio-button label="bottom">Bottom</amu-radio-button>
      <amu-radio-button label="left">Left</amu-radio-button>
      <amu-radio-button label="right">Right</amu-radio-button>
    </amu-radio-group>
    
    <amu-tabs v-model="activeKey" :position="position" style="height: 200px">
      <amu-tab-pane name="one" title="Tab 1">Content of Tab 1</amu-tab-pane>
      <amu-tab-pane name="two" title="Tab 2">Content of Tab 2</amu-tab-pane>
      <amu-tab-pane name="three" title="Tab 3">Content of Tab 3</amu-tab-pane>
    </amu-tabs>
  </amu-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const position = ref('top')
const activeKey = ref('one')
</script>
