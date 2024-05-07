<template>
  <ASpace>
    <a-button type="primary" @click="dialogVisible1 = true"> 用户列表</a-button>
    <a-button type="primary" @click="dialogVisible = true"> <a-icon name="add" />&nbsp;新建用户</a-button>
  </ASpace>
  <a-dialog width="50%" title="用户列表" v-model="dialogVisible1">
    <a-table class="vp-row" :data="tableData.tBody" :columns="tableData.tHead">
    </a-table>
  </a-dialog>
  <a-dialog icon="add" width="50%" title="新建成员" v-model="dialogVisible">
    <AForm :model="formState" :rules="rules" ref="formRef">
      <AFormItem label="姓名:" prop="name">
        <AInput placeholder="请输入姓名" v-model="formState.name" />
      </AFormItem>
      <AFormItem label="年龄:" prop="age">
        <AInput placeholder="请输入年龄" v-model="formState.age" />
      </AFormItem>
      <AFormItem label="家庭住址:" prop="address">
        <AInput clearable placeholder="请输入家庭住址" v-model="formState.address" />
      </AFormItem>
      <AFormItem label="出生日期:" prop="birthday">
        <ADatePicker v-model="formState.birthday" />
      </AFormItem>
      <AFormItem label="学校:" prop="school">
        <ASelect :options="options.slice(0, 6)" placeholder="请选择学校" v-model="formState.school">
        </ASelect>
      </AFormItem>

    </AForm>
    <template #footer>
     <ASpace>
      <AButton @click="onReset">重置</AButton>
      <AButton @click="onSubmit" type="primary">提交</AButton>
     </ASpace>
    </template>
  </a-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { AMessage } from "amu-ui";

const dialogVisible = ref(false)
const dialogVisible1 = ref(false)
const formRef = ref();
const formState = reactive({
  name: "坤坤",
  age: "",
  address: "",
  school: 2,
  birthday: "",
});

const tableData = ref({
  tHead: [
    {
      key: "id",
      title: "学号",
    },
    {
      key: "name",
      title: "姓名",
    },
    {
      key: "age",
      title: "年龄",
    },
    {
      key: "chinese",
      title: "语文",
    },
    {
      key: "math",
      title: "数学",
    },
    {
      key: "english",
      title: "英语",
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

const options = ref([
  {
    value: 1,
    title: "Yjj",
  },
  {
    value: 2,
    title: "Big龙",
  },
  {
    value: 3,
    title: "嘿毛",
  },
  {
    value: 4,
    title: "嫖瓜",
  },
  {
    value: 5,
    title: "吊毛",
  },
  {
    value: 6,
    title: "吴彦祖",
  },
  {
    value: 7,
    title: "陈冠希",
  },
  {
    value: 8,
    title: "林俊杰",
  },
]);

const onSubmit = () => {
  formRef.value
    .validate()
    .then((res) => {
      console.log(formState);
      AMessage.success({
        message: "提交成功",
      });
      dialogVisible.value = false
    })
    .catch((err) => {
      AMessage.error({
        message: err,
      });
      console.log(err);
    });
};
const onReset = () => {
  formRef.value.resetFields()
}
const rules = {
  name: [
    { required: true, message: "Please input Activity name", trigger: "blur" },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
  ],
  age: [
    { required: true, message: "Please input Activity age", trigger: "blur" },
    { min: 3, max: 5, message: "Length should be 3 to 5", trigger: "blur" },
  ],
  address: [
    {
      required: true,
      message: "Please input Activity address",
      trigger: "blur",
    },
    { min: 4, max: 15, message: "Length should be 5 to 15", trigger: "change" },
  ],
  birthday: [{ required: true, message: "请选择出生日期", trigger: "change" }],
  school: [{ required: true, message: "请选择学校", trigger: "change" }],
};
</script>
