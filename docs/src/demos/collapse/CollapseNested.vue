<template>
  <div class="demo-collapse">
    <AmuCollapse v-model="activeNames">
      <AmuCollapseItem title="Consistency" name="1">
        <div>Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to;</div>
        <div style="padding: 10px; border: 1px dashed #ccc; margin-top: 10px;">
          <p>Nested Panel</p>
          <AmuCollapse v-model="nestedActiveNames">
            <AmuCollapseItem title="Nested Item 1" name="1-1">
              <div>Nested Content 1</div>
            </AmuCollapseItem>
            <AmuCollapseItem title="Nested Item 2" name="1-2">
              <div>Nested Content 2</div>
            </AmuCollapseItem>
          </AmuCollapse>
        </div>
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

const activeNames = ref(['1'])
const nestedActiveNames = ref(['1-1'])
</script>
