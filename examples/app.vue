<template>
  <div style="width: 100vw">
    <YButton type="primary">primary</YButton>
    <YButton type="danger" @click="showError">danger</YButton>
    <YButton type="success" @click="showSuccess">success</YButton>

    <YButton type="warning" @click="showWarning">warning</YButton>

    <YButton type="info" @click="showMessage">info </YButton>

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
    <YSelector
      :options="options1"
      @setItemValue="setItemValue"
      placeholder="请选择一个小可爱"
    ></YSelector>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import {
  YButton,
  YCheckbox,
  YCheckboxGroup,
  YSwitch,
  YMessage,
  YMessageBox,
  YSelector,
} from "y-ui";
import { IOptionItem } from "packages/y-ui/components/Selector/baseData";

const value = ref(true);
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

const options1 = ref<IOptionItem[]>([
  {
 
    value: 1,
    text: "杨俊杰",
  },
  {

    value: 2,
    text: "Big龙",
  },
  {

    value: 3,
    text: "嘿毛",
  },
  {

    value: 4,
    text: "嫖瓜",
  },
  {

    value: 5,
    text: "吊毛",
  },
]);

const showError = () => {
  YMessage.error({
    message: "this is a error message",
  });
};

const showSuccess = () => {
  YMessageBox({
    title: "测试",
    content: "点击确定按钮将会出现一个成功的message 他会返回一个成功的Promise",
    showCancelBtn: true,
  }).then(() => {
    YMessage.success({
      message: "this is a success message",
    });
  });
};

const showWarning = () => {
  YMessage.warning({
    message: "this is a warning message",
  });
};

const showMessage = () => {
  YMessage.message({
    message: "this is a info message",
  });
};

const setItemValue = (item: IOptionItem) => {
  console.log(item);
};
</script>
<style lang="less"></style>