<template>
  <div class="tooltip-trigger">
    <AmuTooltip content="默认悬停触发">
      <template #reference>
        <AmuButton>悬停触发</AmuButton>
      </template>
    </AmuTooltip>

    <AmuTooltip content="点击触发" trigger="click">
      <template #reference>
        <AmuButton>点击触发</AmuButton>
      </template>
    </AmuTooltip>

    <AmuTooltip v-model="manualVisible" content="手动控制" trigger="manual">
      <template #reference>
        <AmuButton @click="manualVisible = !manualVisible">手动切换</AmuButton>
      </template>
    </AmuTooltip>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuTooltip } from 'amu-ui/tooltip'
import { AmuButton } from 'amu-ui/button'

const manualVisible = ref(false)
</script>

<style scoped>
.tooltip-trigger {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
