<template>
  <AmuSpace direction="vertical">
    <AmuButton type="primary" @click="visible = !visible">
      {{ visible ? 'Close Dropdown' : 'Open Dropdown (Manual)' }}
    </AmuButton>
    
    <AmuDropdown v-model:visible="visible" trigger="manual" placement="bottom-start">
      <div style="width: 200px; height: 100px; border: 1px dashed var(--amu-color-border); display: flex; align-items: center; justify-content: center; margin-top: 10px;">
        Custom Trigger Area
      </div>
      <template #overlay>
        <AmuDropdownMenu>
          <AmuDropdownItem>Action 1</AmuDropdownItem>
          <AmuDropdownItem>Action 2</AmuDropdownItem>
          <AmuDropdownItem @click="visible = false">Close</AmuDropdownItem>
        </AmuDropdownMenu>
      </template>
    </AmuDropdown>
  </AmuSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuDropdown, AmuDropdownMenu, AmuDropdownItem, AmuButton, AmuSpace } from 'amu-ui'

const visible = ref(false)
</script>
