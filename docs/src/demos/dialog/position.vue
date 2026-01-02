<template>
  <AmuSpace direction="vertical">
    <AmuSpace>
      <AmuButton type="primary" @click="open('top')">Top</AmuButton>
      <AmuButton type="primary" @click="open('center')">Center</AmuButton>
      <AmuButton type="primary" @click="open('bottom')">Bottom</AmuButton>
    </AmuSpace>
    <AmuSpace>
      <AmuButton type="primary" @click="open('top-start')">Top Start</AmuButton>
      <AmuButton type="primary" @click="open('top-end')">Top End</AmuButton>
    </AmuSpace>
    <AmuSpace>
      <AmuButton type="primary" @click="openCustomSize">Custom Size (Width: 300px, Top: 50px)</AmuButton>
    </AmuSpace>
  </AmuSpace>

  <AmuDialog 
    v-model="visible" 
    :placement="placement" 
    title="Position Dialog" 
    description="Check my position!" 
  />

  <AmuDialog 
    v-model="visibleCustom" 
    width="300px" 
    top="50px" 
    title="Custom Size" 
    description="I have custom width and top offset." 
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuDialog, AmuButton, AmuSpace } from 'amu-ui'
import type { DialogPlacement } from 'amu-ui/dialog/src/props'

const visible = ref(false)
const visibleCustom = ref(false)
const placement = ref<DialogPlacement>('top')

const open = (p: DialogPlacement) => {
  placement.value = p
  visible.value = true
}

const openCustomSize = () => {
  visibleCustom.value = true
}
</script>
