<template>
  <div class="placement-demo">
    <div class="row">
      <AmuPopup placement="top-start" content="Top Start text">
        <template #reference><AmuButton>TL</AmuButton></template>
        <div class="content">Top Start</div>
      </AmuPopup>
      <AmuPopup placement="top" content="Top Center text">
        <template #reference><AmuButton>Top</AmuButton></template>
        <div class="content">Top</div>
      </AmuPopup>
      <AmuPopup placement="top-end" content="Top End text">
        <template #reference><AmuButton>TR</AmuButton></template>
        <div class="content">Top End</div>
      </AmuPopup>
    </div>
    <div class="row center">
      <div class="col">
        <AmuPopup placement="left-start" content="Left Start text">
          <template #reference><AmuButton>LT</AmuButton></template>
          <div class="content">Left Start</div>
        </AmuPopup>
        <AmuPopup placement="left" content="Left Center text">
          <template #reference><AmuButton>Left</AmuButton></template>
          <div class="content">Left</div>
        </AmuPopup>
        <AmuPopup placement="left-end" content="Left End text">
          <template #reference><AmuButton>LB</AmuButton></template>
          <div class="content">Left End</div>
        </AmuPopup>
      </div>
      <div class="col right">
        <AmuPopup placement="right-start" content="Right Start text">
          <template #reference><AmuButton>RT</AmuButton></template>
          <div class="content">Right Start</div>
        </AmuPopup>
        <AmuPopup placement="right" content="Right Center text">
          <template #reference><AmuButton>Right</AmuButton></template>
          <div class="content">Right</div>
        </AmuPopup>
        <AmuPopup placement="right-end" content="Right End text">
          <template #reference><AmuButton>RB</AmuButton></template>
          <div class="content">Right End</div>
        </AmuPopup>
      </div>
    </div>
    <div class="row">
      <AmuPopup placement="bottom-start" content="Bottom Start text">
        <template #reference><AmuButton>BL</AmuButton></template>
        <div class="content">Bottom Start</div>
      </AmuPopup>
      <AmuPopup placement="bottom" content="Bottom Center text">
        <template #reference><AmuButton>Bottom</AmuButton></template>
        <div class="content">Bottom</div>
      </AmuPopup>
      <AmuPopup placement="bottom-end" content="Bottom End text">
        <template #reference><AmuButton>BR</AmuButton></template>
        <div class="content">Bottom End</div>
      </AmuPopup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AmuPopup, AmuButton } from 'amu-ui'
</script>

<style scoped>
.placement-demo {
  width: 400px;
}
.row {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin: 10px 0;
}
.center {
  justify-content: space-between;
}
.col {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.content {
  padding: 8px 12px;
  font-size: 14px;
}
</style>
