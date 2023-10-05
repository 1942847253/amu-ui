<script setup>
import Basic from './component/Basic.vue'
import Content from './component/Content.vue'
import Center from './component/Center.vue'
import AlignCenter from './component/AlignCenter.vue'
</script>

# Dialog 对话框

在保留当前页面状态的情况下，告知用户并承载相关操作。

## 基础用法

Dialog 弹出一个对话框，适合需要定制性更大的场景。

需要设置 `model-value / v-model` 属性，它接收 `Boolean`，当为 `true` 时显示 Dialog。 Dialog 分为两个部分：`body` 和 `footer`，footer 需要具名为 footer 的 slot。 title 属性用于定义标题，它是可选的，默认值为空。
<div class="example">
 <Basic/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <a-button type="info" @click="dialogVisible = true">open</a-button>
  <a-dialog width="30%" title="Tips"  v-model="dialogVisible">
    <span>This is a message</span>
  </a-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const dialogVisible = ref(false)
</script>

```

</details>

## 自定义内容
对话框的内容可以是任何东西，甚至是一个表格或表单。 此示例显示如何在 Dialog 中使用 Amu UI 的表格和表单。

<div class="example">
 <Content />
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <a-button type="primary" @click="dialogVisible1 = true"> 用户列表</a-button>
  <a-button type="primary" @click="dialogVisible = true"> <a-icon name="add" />&nbsp;新建用户</a-button>
  <a-dialog width="50%" title="用户列表" v-model="dialogVisible1">
    <a-table :tableData="tableData.tBody" :tableColumn="tableData.tHead">
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
      <AButton @click="onReset">重置</AButton>
      <AButton @click="onSubmit" type="primary">提交</AButton>
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
      editable: false,
    },
    {
      key: "math",
      text: "数学",
      editable: false,
    },
    {
      key: "english",
      text: "英语",
      editable: false,
    },
    // {
    //     key: "operation",
    //     text: "操作",
    // },
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

```

</details>



## 内容居中
对话框的内容可以居中。
将`center`设置为`true`即可使标题和底部居中。 `center`仅影响标题和底部区域。 Dialog 的内容是任意的，在一些情况下，内容并不适合居中布局。 如果需要内容也水平居中，请自行为其添加 CSS 样式。

<div class="example">
 <Center />
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
    <a-button type="info" @click="dialogVisible = true">Click to open the Dialog</a-button>
    <a-dialog center width="30%" title="Warning"  v-model="dialogVisible">
      <span>It should be noted that the content will not be aligned in center by default</span>
    </a-dialog>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  
  const dialogVisible = ref(false)
  </script>
  
```

</details>

## 居中对话框
从屏幕中心打开对话框。

设置 `align-center` 为 `true` 使对话框水平垂直居中。 由于对话框垂直居中在弹性盒子中，所以`offset-top`属性将不起作用。

<div class="example">
 <AlignCenter />
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
    <a-button type="info" @click="dialogVisible = true">Click to open the Dialog</a-button>
    <a-dialog center width="30%" title="Warning"  v-model="dialogVisible">
      <span>It should be noted that the content will not be aligned in center by default</span>
    </a-dialog>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  
  const dialogVisible = ref(false)
  </script>
  
```

</details>