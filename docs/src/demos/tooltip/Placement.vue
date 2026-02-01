<template>
  <div class="demo-placement">
    <div class="top-row">
      <AmuTooltip content="Top Left" placement="top-start">
        <template #reference>
          <AmuButton>TL</AmuButton>
        </template>
      </AmuTooltip>
      <AmuTooltip content="Top Center" placement="top">
        <template #reference>
          <AmuButton>Top</AmuButton>
        </template>
      </AmuTooltip>
      <AmuTooltip content="Top Right" placement="top-end">
        <template #reference>
          <AmuButton>TR</AmuButton>
        </template>
      </AmuTooltip>
    </div>

    <div class="center-row">
      <div class="left-col">
        <AmuTooltip content="Left Top" placement="left-start">
          <template #reference>
            <AmuButton>LT</AmuButton>
          </template>
        </AmuTooltip>
        <AmuTooltip content="Left Center" placement="left">
          <template #reference>
            <AmuButton>Left</AmuButton>
          </template>
        </AmuTooltip>
        <AmuTooltip content="Left Bottom" placement="left-end">
          <template #reference>
            <AmuButton>LB</AmuButton>
          </template>
        </AmuTooltip>
      </div>

      <div class="right-col">
        <AmuTooltip content="Right Top" placement="right-start">
          <template #reference>
            <AmuButton>RT</AmuButton>
          </template>
        </AmuTooltip>
        <AmuTooltip content="Right Center" placement="right">
          <template #reference>
            <AmuButton>Right</AmuButton>
          </template>
        </AmuTooltip>
        <AmuTooltip content="Right Bottom" placement="right-end">
          <template #reference>
            <AmuButton>RB</AmuButton>
          </template>
        </AmuTooltip>
      </div>
    </div>

    <div class="bottom-row">
      <AmuTooltip content="Bottom Left" placement="bottom-start">
        <template #reference>
          <AmuButton>BL</AmuButton>
        </template>
      </AmuTooltip>
      <AmuTooltip content="Bottom Center" placement="bottom">
        <template #reference>
          <AmuButton>Bottom</AmuButton>
        </template>
      </AmuTooltip>
      <AmuTooltip content="Bottom Right" placement="bottom-end">
        <template #reference>
          <AmuButton>BR</AmuButton>
        </template>
      </AmuTooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AmuTooltip } from 'amu-ui/tooltip'
import { AmuButton } from 'amu-ui/button'
</script>

<style scoped>
.demo-placement {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 24px;
}

.top-row,
.bottom-row {
  display: flex;
  gap: 12px;
}

.center-row {
  display: flex;
  justify-content: space-between;
  width: 360px;
}

.left-col,
.right-col {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
