<template>
  <amu-layout style="min-height: 400px">
    <amu-sider
      :collapsed="collapsed"
      style="background: #3ba0e9; color: #fff"
    >
      <div style="padding: 20px; text-align: center">
        {{ collapsed ? 'C' : 'Collapsed Sider' }}
      </div>
    </amu-sider>
    <amu-layout>
      <amu-header style="background: #7dbcea; color: #fff; display: flex; align-items: center">
        <button @click="collapsed = !collapsed" style="margin-right: 16px">
          {{ collapsed ? 'Expand' : 'Collapse' }}
        </button>
        Header
      </amu-header>
      <amu-content style="background: #108ee9; color: #fff; text-align: center; line-height: 200px">
        Content
      </amu-content>
      <amu-footer style="background: #7dbcea; color: #fff">Footer</amu-footer>
    </amu-layout>
  </amu-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuLayout, AmuHeader, AmuSider, AmuContent, AmuFooter } from 'amu-ui/layout'

const collapsed = ref(false)
</script>
