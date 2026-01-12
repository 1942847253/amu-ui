<script lang="ts" setup>
import { ref } from 'vue'

const size = ref<any>('sm')
const activeKey = ref('1')
</script>

<template>
  <amu-radio-group v-model="size" type="button" style="margin-bottom: 24px">
    <amu-radio-button label="sm">Small</amu-radio-button>
    <amu-radio-button label="md">Medium</amu-radio-button>
    <amu-radio-button label="lg">Large</amu-radio-button>
  </amu-radio-group>

  <amu-tabs v-model="activeKey" :size="size">
    <amu-tab-pane name="1" title="Tab 1">
      Content of Tab 1
    </amu-tab-pane>
    <amu-tab-pane name="2" title="Tab 2">
      Content of Tab 2
    </amu-tab-pane>
    <amu-tab-pane name="3" title="Tab 3">
      Content of Tab 3
    </amu-tab-pane>
  </amu-tabs>
  
  <div style="height: 20px"></div>

  <amu-tabs v-model="activeKey" :size="size" type="card">
    <amu-tab-pane name="1" title="Tab 1">
      Content of Tab 1
    </amu-tab-pane>
    <amu-tab-pane name="2" title="Tab 2">
      Content of Tab 2
    </amu-tab-pane>
    <amu-tab-pane name="3" title="Tab 3">
      Content of Tab 3
    </amu-tab-pane>
  </amu-tabs>
</template>
