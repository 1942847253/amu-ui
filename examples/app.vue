<template>
  <div>
    <YTabs default-active-key="1" position="left" @change="onTabsChange">
      <YTabsPanel key="1" title="Button 按钮">
        <YButton @click="value1 = 1" type="primary">Primary</YButton>
        <YButton type="danger" @click="showError">Danger</YButton>
        <YButton type="success" @click="showSuccess">Success</YButton>
        <YButton type="warning" @click="showWarning">Warning</YButton>
        <YButton type="info" @click="showMessage">Info </YButton>
        <YButton size="small">编辑</YButton>
        <YButton type="danger" size="small">删除</YButton>
      </YTabsPanel>
      <YTabsPanel key="2" title="Checkbox 复选框">
        <YCheckboxGroup v-model="checkedList" :options="options"></YCheckboxGroup>
      </YTabsPanel>
      <YTabsPanel key="3" title="Switch 开关">
        <YSwitch size="large" v-model="value" open-title="是" off-title="否" :disabled="true"></YSwitch>
        <YSwitch v-model="value" open-title="开" off-title="关"></YSwitch>
        <YSwitch size="small" v-model="value" open-title="上" off-title="下"></YSwitch>
      </YTabsPanel>
      <YTabsPanel key="4" title="Selector 选择器">
        <YSelector v-model="value1" :options="options1" isSearch @setItemValue="setItemValue" placeholder="请选择一个小可爱">
        </YSelector>
      </YTabsPanel>
      <YTabsPanel key="5" title="Radio 单选框">
        <YRadioGroup v-model="value1" :options="options"></YRadioGroup>
        <span class="iconfont icon-close2"></span>
      </YTabsPanel>
      <YTabsPanel key="6" title="Rotation 轮播图">
        <YRotation :autoplay="true" :duration="3000" :initial="1" :hasDot="true" dotPositon="center"
          :hasDirector="true">
          <YRotationItem v-for="(item, index) in picList" :key="index">
            <img height="300" width="700" :src="item.path" alt="" />
          </YRotationItem>
        </YRotation>
      </YTabsPanel>
      <YTabsPanel key="7" title="Table 表格">
        <YTable border width="1000px" :tableData="tableData.tBody" :tableColumn="tableData.tHead" @editData="editData">
          <template #table="{ tableColumn, tableData }">
            <!-- <img v-if="tableColumn.key === 'name'" width="70" height="70"
              src="https://s3m4.fenxi.com/galileo/85c6b2e7b4b94eaf3d9bc0373b5f5f05.gif_.webp" alt="" /> -->
            <y-tag type="success" v-if="tableColumn.key === 'age'">{{
              tableData.age + " 岁"
              }}</y-tag>
          </template>
          <template #operation="{ item, index }">
            <y-button type="info" size="small">Edit</y-button>
            <y-button type="danger" size="small" :disabled="false" @click="deleteItem(item.id)">Delete</y-button>
          </template>
        </YTable>
      </YTabsPanel>
      <YTabsPanel key="8" title="Tag 标签">
      <YTag closeable>test</YTag>
        <YTag closeable type="success">YJJ</YTag> 
        <YTag closeable type="warning">Big龙</YTag>
        <YTag closeable type="danger">嘿毛</YTag>
        <YTag closeable type="info">嫖瓜</YTag>

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
  YRadioGroup,
  YRotation,
  YRotationItem,
  YTable,
  YTag
} from "y-ui";

const value = ref(false);
const value1 = ref(2);
const checkedList = ref([1, 2]);
const options = ref([
  {
    label: "杨俊杰",
    value: 1,
    disabled: true,
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

const picList = [
  {
    id: 1,
    path: "http://img.netbian.com/file/2020/0904/7cab180eca805cce596b6870cb4e1379.jpg",
  },
  {
    id: 2,
    path: "https://pic.netbian.com/uploads/allimg/220909/000538-16626531386489.jpg",
  },
  {
    id: 3,
    path: "http://img.netbian.com/file/2021/0821/a49d58bea940c16ea6e5b2b2e159f687.jpg",
  },
];

const tableData = ref({
  tHead: [
    {
      key: "id",
      text: "学号",
      
    },
    {
      key: "name",
      text: "姓名",
    },
    {
      key: "age",
      text: "年龄",
   
    },
    {
      key: "chinese",
      text: "语文",
      editable: true,
   
    },
    {
      key: "math",
      text: "数学",
      editable: true,
    },
    {
      key: "english",
      text: "英语",
      editable: true,
      
    },
    {
      key: "operation",
      text: "操作",
    },
  ],
  tBody: [
    {
      id: 1,
      name: "Yjj",
      age: 21,
      chinese: 121,
      math: 90,
      english: 138,
    },
    {
      id: 2,
      name: "嘿毛",
      age: 20,
      chinese: 111,
      math: 32,
      english: 43,
    },
    {
      id: 3,
      name: "big龙",
      age: 19,
      chinese: 44,
      math: 21,
      english: 11,
    },
    {
      id: 4,
      name: "嫖瓜",
      age: 21,
      chinese: 80,
      math: 40,
      english: 45,
    },
  ],
});

watch(
  () => value1.value,
  (val) => {
    console.log(val);
  }
);

watch(
  () => checkedList.value,
  (val) => {
    console.log(val);
  }
);

const showError = () => {
  YMessage.error({
    message: "this is a error message when you click the button error message when you click the button",
  });
};

const showSuccess = () => {
  YMessageBox({
    title: "测试",
    content: "点击确定按钮将会出现一个成功的message 他会返回一个成功的Promise",
    showCancelBtn: true,
  }).then(() => {
    YMessage.success({
      message: "success",
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

const editData = ({ index, key, value, text }) => {
  tableData.value.tBody[index][key] = value;
};
const deleteItem = (id) => {
  YMessageBox({
    showCancelBtn: true,
    title: "提示",
    confirmBtnText: "确认",
    cancelBtnText: "取消",
    content: "确认删除当前学生吗？",
  }).then(() => {
    tableData.value.tBody = tableData.value.tBody.filter(
      (item) => item.id !== id
    );
  });
};
</script>
<style lang="less"></style>