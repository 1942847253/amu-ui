<template>
  <div class="demo-collapse">
    <AmuCollapse v-model="activeNames">
      <AmuCollapseItem name="1">
        <template #title>
          Consistency <AmuIcon style="margin-left: 8px"><div class="i-icon-park-outline-info" /></AmuIcon>
        </template>
        <div>Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to;</div>
      </AmuCollapseItem>
      <AmuCollapseItem title="Feedback" name="2">
        <div>Operation feedback: enable the users to clearly perceive their operations by style updates and interactive effects;</div>
      </AmuCollapseItem>
    </AmuCollapse>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuCollapse, AmuCollapseItem } from 'amu-ui/collapse'
import { AmuIcon } from 'amu-ui/icon'

const activeNames = ref(['1'])
</script>
