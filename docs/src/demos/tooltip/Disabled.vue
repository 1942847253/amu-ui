<template>
  <div class="tooltip-disabled">
    <AmuTooltip content="被禁用后不会显示" :disabled="true">
      <template #reference>
        <AmuButton disabled>禁用状态</AmuButton>
      </template>
    </AmuTooltip>

    <AmuTooltip
      content="这是一个较长的提示内容，用于展示最大宽度与换行效果。"
      :max-width="200"
      :show-arrow="false"
    >
      <template #reference>
        <AmuButton>自定义样式</AmuButton>
      </template>
    </AmuTooltip>
  </div>
</template>

<script setup lang="ts">
import { AmuTooltip } from 'amu-ui/tooltip'
import { AmuButton } from 'amu-ui/button'
</script>

<style scoped>
.tooltip-disabled {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
