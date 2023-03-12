<script setup>
import Basic from './component/Basic.vue'
import Footer from './component/Footer.vue'
import BeforeClose from './component/BeforeClose.vue'
</script>

# Drawer 抽屉

有些时候, Dialog 组件并不满足我们的需求, 比如你的表单很长, 亦或是你需要临时展示一些文档, Drawer 拥有和 Dialog 几乎相同的 API

## 基础用法

呼出一个临时的侧边栏, 可以从多个方向呼出

 设置 `model-value` 属性来控制 Drawer 的显示与隐藏， 通过 `title` 属性来设置标题, 默认设置是从右至左打开 `30%` 浏览器宽度。 你可以通过传入对应的 `direction` 和 `size` 属性来修改这一默认行为。
<div class="example">
 <Basic/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
 <ADatePicker v-model="dateValue" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const dateValue = ref("");

</script>

```

</details>

## 自定义底部内容
多用于提交From表单时的确定与取消按钮

<div class="example">
 <Footer />
</div>

<details>
<summary>展开示例代码</summary>

```vue
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
const Footers = {
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
```

</details>

## 关闭 Drawer 前的回调

 可在关闭前自定义不同操作设置 `beforeClose` 属性来控制 Drawer 关闭前的某些操作，将关闭Drawer的权力从组件移交到用户
<div class="example">
 <BeforeClose/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
 <ADatePicker v-model="dateValue" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const dateValue = ref("");

</script>

```

</details>


