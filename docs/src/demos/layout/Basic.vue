<template>
  <amu-layout style="min-height: 400px">
    <amu-header style="background: #7dbcea; color: #fff">Header</amu-header>
    <amu-content style="background: #108ee9; color: #fff; text-align: center; line-height: 200px">
      Content
    </amu-content>
    <amu-footer style="background: #7dbcea; color: #fff">Footer</amu-footer>
  </amu-layout>
</template>

<script setup lang="ts">
import { AmuLayout, AmuHeader, AmuContent, AmuFooter } from 'amu-ui/layout'
</script>
