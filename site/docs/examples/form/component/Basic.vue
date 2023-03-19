<template>
  <AForm :model="formState">
    <AFormItem label="姓名:">
      <AInput placeholder="请输入姓名" v-model="formState.name" />
    </AFormItem>
    <AFormItem label="年龄:">
      <AInput
        type="password"
        show-password
        placeholder="请输入年龄"
        v-model="formState.age"
      />
    </AFormItem>
    <AFormItem label="家庭住址:">
      <AInput
        clearable
        placeholder="请输入家庭住址"
        v-model="formState.address"
      />
    </AFormItem>
    <AFormItem label="出生日期:">
      <ADatePicker v-model="formState.birthday" />
    </AFormItem>
    <AFormItem label="学校:">
      <ASelect
        :options="options.slice(0, 6)"
        placeholder="请选择学校"
        v-model="formState.school"
      >
      </ASelect>
    </AFormItem>
    <AFormItem>
      <AButton type="primary">Submit</AButton>
      <AButton>Reset</AButton>
    </AFormItem>
  </AForm>
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
