<template>
  <AmuSpace>
    <AmuButton type="primary" @click="visible1 = true">Custom Buttons (Props)</AmuButton>
    <AmuButton type="primary" @click="visible2 = true">Custom Slots</AmuButton>
  </AmuSpace>

  <!-- Custom Buttons via Props -->
  <AmuDialog 
    v-model="visible1" 
    title="Custom Buttons" 
    description="Buttons customized via props."
    confirm-btn="Yes, I agree"
    cancel-btn="No way"
  />

  <!-- Custom Slots -->
  <AmuDialog v-model="visible2">
    <template #header>
      <div style="font-weight: bold; color: blue;">Custom Header</div>
    </template>
    
    <div style="padding: 20px; background: #f5f5f5; border-radius: 4px;">
      <p>This is custom content in default slot.</p>
      <p>You can put anything here.</p>
    </div>

    <template #footer>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span>Custom Footer Info</span>
        <AmuSpace>
          <AmuButton @click="visible2 = false">Close</AmuButton>
          <AmuButton type="primary" @click="visible2 = false">Submit</AmuButton>
        </AmuSpace>
      </div>
    </template>
  </AmuDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuDialog, AmuButton, AmuSpace } from 'amu-ui'

const visible1 = ref(false)
const visible2 = ref(false)
</script>
