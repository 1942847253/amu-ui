<template>
  <AButton type="primary" @click="showDrawer = true">open</AButton>
  <ADrawer title="编辑" v-model="showDrawer" closeOnClickModal>
    <template #default>
      <AForm :model="formState" :rules="rules" ref="formRef">
        <AFormItem label="姓名:" prop="name">
          <AInput placeholder="请输入姓名" v-model="formState.name" />
        </AFormItem>
        <AFormItem label="年龄:" prop="age">
          <AInput placeholder="请输入年龄" v-model="formState.age" />
        </AFormItem>
        <AFormItem label="家庭住址:" prop="address">
          <AInput
            clearable
            placeholder="请输入家庭住址"
            v-model="formState.address"
          />
        </AFormItem>
        <AFormItem label="出生日期:" prop="birthday">
          <ADatePicker v-model="formState.birthday" />
        </AFormItem>
        <AFormItem label="学校:" prop="school">
          <ASelect
            :options="options.slice(0, 6)"
            placeholder="请选择学校"
            v-model="formState.school"
          >
          </ASelect>
        </AFormItem>
      </AForm>
    </template>
    <template #footer>
      <AButton @click="onReset">Reset</AButton>
      <AButton @click="onSubmit" type="primary">Submit</AButton>
    </template>
  </ADrawer>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { AMessage } from "amu-ui";

const showDrawer = ref(false);
const formRef = ref();
const formState = reactive({
  name: "坤坤",
  age: "",
  address: "",
  school: 2,
  birthday: "",
});

const options = ref([
  {
    value: 1,
    text: "Yjj",
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

const onSubmit = () => {
  formRef.value
    .validate()
    .then((res) => {
      console.log(formState);
      AMessage.success({
        message: "提交成功",
      });
    })
    .catch((err) => {
      AMessage.error({
        message: err,
      });
      console.log(err);
    });
};
const onReset = () => {
  formRef.value.resetFields();
};
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
