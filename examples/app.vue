<template>
  <div style="width:100vw">
    <YButton type="primary">primary</YButton>
   <YButton type="danger">danger</YButton> 
    <YButton type="success">success</YButton>
   
    <YButton type="warning">warning</YButton>
   
    <YButton type="info">info
    </YButton>
   
    <YButton>default</YButton>

    <YCheckbox>我已经阅读并同意此协议</YCheckbox>
    <YCheckboxGroup
      v-model="checkedList"
      :options="options"
      :column="true"
    ></YCheckboxGroup>
    <YSwitch size="large" v-model="value"></YSwitch>
    <YSwitch v-model="value"></YSwitch>
    <YSwitch size="small" v-model="value"></YSwitch>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { YButton, YCheckbox, YCheckboxGroup, YSwitch } from "y-ui";

const value= ref(true)
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
