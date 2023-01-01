<template>
  <YForm :model="formState">
    <YFormItem label="姓名:">
      <YInput placeholder="请输入姓名" v-model="formState.name" />
    </YFormItem>
    <YFormItem label="年龄:">
      <YInput
        type="password"
        show-password
        placeholder="请输入年龄"
        v-model="formState.age"
      />
    </YFormItem>
    <YFormItem label="家庭住址:">
      <YInput
        clearable
        placeholder="请输入家庭住址"
        v-model="formState.address"
      />
    </YFormItem>
    <YFormItem label="出生日期:">
      <YDatePicker v-model="formState.birthday" />
    </YFormItem>
    <YFormItem label="学校:">
      <YSelector
        :options="options.slice(0, 6)"
        placeholder="请选择学校"
        v-model="formState.school"
      >
      </YSelector>
    </YFormItem>
    <YFormItem>
      <YButton type="primary">Submit</YButton>
      <YButton>Reset</YButton>
    </YFormItem>
  </YForm>
</template>

<script lang="ts" setup>import { reactive, ref } from 'vue';

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
</script>
