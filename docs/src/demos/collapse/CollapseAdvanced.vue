<template>
  <div class="demo-collapse-extra">
    <h3>Custom Arrow Position (Left) & Extra Content</h3>
    <AmuCollapse v-model="activeNames" arrow-placement="left">
      <AmuCollapseItem name="1">
        <template #title>
          <span>Title with Extra</span>
        </template>
        <template #extra>
          <AmuButton size="small" type="primary" @click.stop.prevent="handleExtraClick">Operate</AmuButton>
        </template>
        <div>Content with extra operation button</div>
      </AmuCollapseItem>
      <AmuCollapseItem title="Normal Title" name="2">
        <template #extra>
          <AmuIcon style="margin-right: 8px"><div class="i-icon-park-outline-settings" /></AmuIcon>
          <span>Status</span>
        </template>
        <div>Content with extra icons and text</div>
      </AmuCollapseItem>
    </AmuCollapse>

    <h3>Borderless & No Arrow & Icon Trigger Only</h3>
    <div style="background: #f5f7fa; padding: 20px;">
        <AmuCollapse v-model="activeNames2" :border="false">
        <AmuCollapseItem title="Borderless Item 1" name="1">
            <div>Borderless content</div>
        </AmuCollapseItem>
        <AmuCollapseItem title="No Arrow Item" name="2" :show-arrow="false">
            <div>Content without arrow</div>
        </AmuCollapseItem>
        <AmuCollapseItem title="Icon Trigger Only" name="3" trigger="icon">
            <template #extra>Click Icon to Toggle -></template>
            <div>You can only toggle this by clicking the arrow icon.</div>
        </AmuCollapseItem>
        </AmuCollapse>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuCollapse, AmuCollapseItem } from 'amu-ui/collapse'
import { AmuButton } from 'amu-ui/button'
import { AmuIcon } from 'amu-ui/icon'

const activeNames = ref(['1'])
const activeNames2 = ref(['3'])

const handleExtraClick = () => {
  console.log('Extra button clicked')
}
</script>
