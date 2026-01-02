<template>
  <AmuSpace wrap>
    <AmuButton type="primary" @click="visibleDraggable = true">Draggable</AmuButton>
    <AmuButton type="primary" @click="visibleNoMask = true">No Mask (Non-modal)</AmuButton>
    <AmuButton type="primary" @click="visibleNoMaskClosable = true">Mask Not Closable</AmuButton>
    <AmuButton type="primary" @click="visibleNoEsc = true">No ESC Close</AmuButton>
    <AmuButton type="primary" @click="visibleNoLock = true">No Scroll Lock</AmuButton>
  </AmuSpace>

  <AmuDialog 
    v-model="visibleDraggable" 
    draggable 
    title="Draggable Dialog" 
    description="Try to drag my header!" 
  />

  <AmuDialog 
    v-model="visibleNoMask" 
    :modal="false" 
    :mask="false"
    draggable
    title="Non-modal Dialog" 
    description="You can interact with the page behind me." 
  />

  <AmuDialog 
    v-model="visibleNoMaskClosable" 
    :mask-closable="false" 
    title="Mask Not Closable" 
    description="Clicking the mask won't close me." 
  />

  <AmuDialog 
    v-model="visibleNoEsc" 
    :close-on-esc="false" 
    title="No ESC Close" 
    description="Pressing ESC won't close me." 
  />

  <AmuDialog 
    v-model="visibleNoLock" 
    :lock-scroll="false" 
    title="No Scroll Lock" 
    description="Body scroll is not locked." 
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuDialog, AmuButton, AmuSpace } from 'amu-ui'

const visibleDraggable = ref(false)
const visibleNoMask = ref(false)
const visibleNoMaskClosable = ref(false)
const visibleNoEsc = ref(false)
const visibleNoLock = ref(false)
</script>
