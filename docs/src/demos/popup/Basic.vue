<template>
  <AmuPopup v-model="visible" placement="bottom">
    <template #reference>
      <AmuButton>Click me</AmuButton>
    </template>
    <div class="popup-content">
      This is a popup content.
    </div>
  </AmuPopup>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuPopup, AmuButton } from 'amu-ui'

const visible = ref(false)
</script>

<style scoped>
.popup-content {
  padding: 12px;
  color: #333;
  font-size: 14px;
}
</style>
