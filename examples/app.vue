<template>
  <div>
    <YTabs default-active-key="1" position="left" @change="onTabsChange">
      <YTabsPanel key="1" title="Button 按钮">
        <YButton @click="value1 = 1" type="primary">primary</YButton>
        <YButton type="danger" @click="showError">danger</YButton>
        <YButton type="success" @click="showSuccess">success</YButton>
        <YButton type="warning" @click="showWarning">warning</YButton>
        <YButton type="info" @click="showMessage">info </YButton>
        <YButton>default</YButton>
      </YTabsPanel>
      <YTabsPanel key="2" title="Checkbox 复选框">
        <YCheckbox v-model="value">Shanghai</YCheckbox>
        <YCheckbox v-model="value">Beijing</YCheckbox>
        <YCheckbox v-model="value">Guangzhou</YCheckbox>
        <YCheckbox v-model="value">Shenzhen</YCheckbox>
        <YCheckbox v-model="value">Shanghai</YCheckbox>
        <YCheckbox v-model="value">Beijing</YCheckbox>
        <YCheckbox v-model="value">Guangzhou</YCheckbox>
        <YCheckbox v-model="value">Shenzhen</YCheckbox>
        <YCheckbox v-model="value">Shanghai</YCheckbox>
        <YCheckbox v-model="value">Beijing</YCheckbox>
        <YCheckbox v-model="value">Guangzhou</YCheckbox>
        <YCheckbox v-model="value">Shenzhen</YCheckbox>
        <YCheckbox v-model="value">Shanghai</YCheckbox>
        <YCheckbox v-model="value">Beijing</YCheckbox>
        <YCheckbox v-model="value">Guangzhou</YCheckbox>
        <YCheckbox v-model="value">Shenzhen</YCheckbox>
      </YTabsPanel>
      <YTabsPanel key="3" title="Switch 开关">
        <YSwitch size="large" v-model="value"></YSwitch>
        <YSwitch v-model="value"></YSwitch>
        <YSwitch size="small" v-model="value"></YSwitch>
      </YTabsPanel>
      <YTabsPanel key="4" title="Selector 选择器">
        <YSelector
          v-model="value1"
          :options="options1"
          isSearch
          @setItemValue="setItemValue"
          placeholder="请选择一个小可爱"
        ></YSelector>
      </YTabsPanel>
    </YTabs>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";
import {
  YButton,
  YCheckbox,
  YCheckboxGroup,
  YSwitch,
  YMessage,
  YMessageBox,
  YSelector,
  YTabs,
  YTabsPanel,
} from "y-ui";

const value = ref(true);
const value1 = ref(3);
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

const options1 = ref([
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
  {
    value: 6,
    text: "吴彦祖",
  },
  {
    value: 7,
    text: "陈冠希",
  },
  {
    value: 8,
    text: "林俊杰",
  },
]);

watch(
  () => value1.value,
  (val) => {
    console.log(val);
  }
);

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

const setItemValue = (item) => {
  console.log(item);
};

const onTabsChange = (item: any) => {
  console.log(item);
};
</script>
<style lang="less"></style>