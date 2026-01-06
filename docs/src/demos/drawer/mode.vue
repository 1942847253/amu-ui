<template>
  <div class="demo-drawer-mode">
    <div style="margin-bottom: 16px; display: flex; gap: 12px; flex-wrap: wrap;">
      <AmuButton type="primary" @click="visibleNonModal = true">Non-modal</AmuButton>
      <AmuButton type="primary" @click="visibleNoMask = true">No Mask (Transparent)</AmuButton>
      <AmuButton type="primary" @click="visibleNoHeader = true">No Header</AmuButton>
      <AmuButton type="primary" @click="visibleNoClose = true">No Close Icon</AmuButton>
      <AmuButton type="primary" @click="visibleScrollable = true">Body Scrollable</AmuButton>
    </div>

    <!-- Non-modal -->
    <AmuDrawer
      v-model="visibleNonModal"
      title="Non-modal Drawer"
      :modal="false"
      placement="right"
      size="30%"
    >
      <p>This is a non-modal drawer.</p>
      <p>The background page is still interactable.</p>
      <p>Note: A mask is not rendered in this mode.</p>
    </AmuDrawer>

    <!-- No Mask -->
    <AmuDrawer
      v-model="visibleNoMask"
      title="No Mask"
      :mask="false"
    >
      <p>This is a modal drawer (blocks interaction) but the mask is invisible/transparent.</p>
    </AmuDrawer>

    <!-- No Header -->
    <AmuDrawer
      v-model="visibleNoHeader"
      :show-header="false"
    >
      <div style="padding: 20px;">
        <h3>Custom Content without Default Header</h3>
        <p>You can create your own header structure here.</p>
        <AmuButton @click="visibleNoHeader = false">Close</AmuButton>
      </div>
    </AmuDrawer>

    <!-- No Close Icon -->
    <AmuDrawer
      v-model="visibleNoClose"
      title="No Close Icon"
      :show-close="false"
    >
      <p>The default "X" button is hidden.</p>
      <p>You must provide another way to close it.</p>
      <AmuButton @click="visibleNoClose = false">Close</AmuButton>
    </AmuDrawer>

    <!-- Scrollable Body -->
    <AmuDrawer
      v-model="visibleScrollable"
      title="Scrollable Content"
      body-scrollable
    >
      <p>Content inside the body area forces a scrollbar.</p>
      <div v-for="i in 30" :key="i" style="margin: 10px 0;">Item {{ i }}</div>
    </AmuDrawer>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const visibleNonModal = ref(false)
const visibleNoMask = ref(false)
const visibleNoHeader = ref(false)
const visibleNoClose = ref(false)
const visibleScrollable = ref(false)
</script>
