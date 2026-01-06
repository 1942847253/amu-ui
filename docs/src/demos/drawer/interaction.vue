<template>
  <div class="demo-drawer-interaction">
    <div style="margin-bottom: 16px;">
      <AmuButton type="primary" @click="visible1 = true" style="margin-right: 16px;">Before Close (Confirm)</AmuButton>
      <AmuButton type="primary" @click="visible2 = true">Disable Mask/Esc Close</AmuButton>
    </div>

    <!-- Before Close Demo -->
    <AmuDrawer
      v-model="visible1"
      title="Before Close"
      :before-close="handleBeforeClose"
    >
      <p>Try to close this drawer (click mask, close button, or ESC).</p>
      <p>A confirmation dialog will appear.</p>
    </AmuDrawer>

    <!-- Prevent Arguments Demo -->
    <AmuDrawer
      v-model="visible2"
      title="Locked Drawer"
      :mask-closable="false"
      :close-on-esc="false"
    >
      <p>You cannot close this by clicking mask or pressing ESC.</p>
      <p>You must click the "Close" button below or the header close icon.</p>
      <template #footer>
        <AmuButton @click="visible2 = false">Close</AmuButton>
      </template>
    </AmuDrawer>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const visible1 = ref(false)
const visible2 = ref(false)

const handleBeforeClose = () => {
    return new Promise<boolean>((resolve) => {
        if (confirm('Are you sure you want to close?')) {
            resolve(true)
        } else {
            resolve(false)
        }
    })
}
</script>
