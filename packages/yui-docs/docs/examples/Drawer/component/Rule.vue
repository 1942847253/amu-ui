<template>
  <YForm :model="formState" :rules="rules" ref="formRef">
    <YFormItem label="姓名:" prop="name">
      <YInput placeholder="请输入姓名" v-model="formState.name" />
    </YFormItem>
    <YFormItem label="年龄:" prop="age">
      <YInput
        placeholder="请输入年龄"
        v-model="formState.age"
      />
    </YFormItem>
    <YFormItem label="家庭住址:" prop="address">
      <YInput
        clearable
        placeholder="请输入家庭住址"
        v-model="formState.address"
      />
    </YFormItem>
    <YFormItem label="出生日期:" prop="birthday">
      <YDatePicker v-model="formState.birthday" />
    </YFormItem>
    <YFormItem label="学校:" prop="school">
      <YSelector
        :options="options.slice(0, 6)"
        placeholder="请选择学校"
        v-model="formState.school"
      >
      </YSelector>
    </YFormItem>
    <YFormItem>
      <YButton @click="onSubmit" type="primary">Submit</YButton>
      <YButton @click="onReset">Reset</YButton>
    </YFormItem>
  </YForm>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { YMessage } from "../../../../../y-ui";

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
      YMessage.success({
        message: "提交成功",
      });
    })
    .catch((err) => {
      YMessage.error({
        message: err,
      });
      console.log(err);
    });
};
const onReset = ()=>{
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
  school:[{ required: true, message: "请选择学校", trigger: "change" }],
};
</script>
