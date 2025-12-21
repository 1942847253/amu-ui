<template>
  <amu-layout style="min-height: 400px">
    <amu-header style="background: #7dbcea; color: #fff">Header</amu-header>
    <amu-layout>
      <amu-sider style="background: #3ba0e9; color: #fff; line-height: 120px; text-align: center">
        Sider
      </amu-sider>
      <amu-content style="background: #108ee9; color: #fff; text-align: center; line-height: 120px">
        Content
      </amu-content>
    </amu-layout>
    <amu-footer style="background: #7dbcea; color: #fff">Footer</amu-footer>
  </amu-layout>
</template>

<script setup lang="ts">
import { AmuLayout, AmuHeader, AmuSider, AmuContent, AmuFooter } from 'amu-ui/layout'
</script>
