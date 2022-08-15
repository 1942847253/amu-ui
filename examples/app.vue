<template>
  <div style="width:100vw">
    <YButton type="primary">primary</YButton>
    &nbsp; <YButton type="danger">danger</YButton> &nbsp;
    <YButton type="success">success</YButton>
    &nbsp;
    <YButton type="warning">warning</YButton>
    &nbsp;
    <YButton type="info">info
    </YButton>
    &nbsp;
    <YButton>default</YButton>

    <YCheckbox>我已经阅读并同意此协议</YCheckbox>
    <YCheckboxGroup
      v-model="checkedList"
      :options="options"
      :column="true"
    ></YCheckboxGroup>
    <YSwitch></YSwitch>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { YButton, YCheckbox, YCheckboxGroup, YSwitch } from "./es";

const value1 = ref(2);
const checkedList = ref([1, 2]);
const options = ref([
  {
    label: "杨俊杰",
    value: 1,
  },
  {
    label: "big龍",
    value: 2,
  },
  {
    label: "嘿毛",
    value: 3,
  },
]);
</script>
<style lang="less"></style>
