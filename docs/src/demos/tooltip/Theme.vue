<template>
  <div class="tooltip-theme">
    <AmuTooltip content="文字提示仅展示文本内容" type="default">
      <template #reference>
        <AmuButton>default</AmuButton>
      </template>
    </AmuTooltip>

    <AmuTooltip content="文字提示仅展示文本内容" type="primary">
      <template #reference>
        <AmuButton type="primary">primary</AmuButton>
      </template>
    </AmuTooltip>

    <AmuTooltip content="文字提示仅展示文本内容" type="success">
      <template #reference>
        <AmuButton type="primary" status="success">success</AmuButton>
      </template>
    </AmuTooltip>

    <AmuTooltip content="文字提示仅展示文本内容" type="danger">
      <template #reference>
        <AmuButton type="primary" status="danger">danger</AmuButton>
      </template>
    </AmuTooltip>

    <AmuTooltip content="文字提示仅展示文本内容" type="warning">
      <template #reference>
        <AmuButton type="primary" status="warning">warning</AmuButton>
      </template>
    </AmuTooltip>

    <AmuTooltip content="文字提示仅展示文本内容" type="light">
      <template #reference>
        <div class="light-btn">light</div>
      </template>
    </AmuTooltip>
  </div>
</template>

<script setup lang="ts">
import { AmuTooltip } from 'amu-ui/tooltip'
import { AmuButton } from 'amu-ui/button'
</script>

<style scoped>
.tooltip-theme {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}

.light-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  padding: 0 15px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid var(--amu-color-border);
  background-color: var(--amu-color-bg);
  color: var(--amu-color-text);
  cursor: pointer;
  transition: all 0.2s;
}
.light-btn:hover {
  color: var(--amu-color-primary);
  border-color: var(--amu-color-primary);
}
</style>
