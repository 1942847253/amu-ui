<template>
  <AmuSpace>
    <AmuPopup trigger="hover">
      <template #reference>
        <AmuButton>Hover Me</AmuButton>
      </template>
      <div class="content">Triggered by Hover</div>
    </AmuPopup>

    <AmuPopup trigger="click">
      <template #reference>
        <AmuButton>Click Me</AmuButton>
      </template>
      <div class="content">Triggered by Click</div>
    </AmuPopup>

    <AmuPopup v-model="manualVisible" trigger="manual">
      <template #reference>
        <AmuButton @click="manualVisible = !manualVisible">Manual</AmuButton>
      </template>
      <div class="content">
        <p>Controlled manually</p>
        <AmuButton size="small" @click="manualVisible = false">Close</AmuButton>
      </div>
    </AmuPopup>
  </AmuSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuPopup, AmuButton, AmuSpace } from 'amu-ui'

const manualVisible = ref(false)
</script>

<style scoped>
.content {
  padding: 12px;
  font-size: 14px;
}
</style>
