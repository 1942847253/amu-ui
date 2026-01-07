<template>
  <div class="demo-raw-html">
    <AmuButton type="primary" :plain="true" @click="openHTML">Use HTML String</AmuButton>
  </div>
</template>

<script setup lang="ts">
import { AmuMessage, AmuButton } from 'amu-ui'

const openHTML = () => {
  AmuMessage({
    message: '<strong>This is <i>HTML</i> string</strong>',
    dangerouslyUseHTMLString: true,
  })
}
</script>
