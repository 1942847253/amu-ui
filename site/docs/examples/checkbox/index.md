<script setup>
import Basic from './component/Basic.vue'
import CheckboxGroup from './component/CheckboxGroup.vue'
import Disabled from './component/Disabled.vue'
</script>

# Checkbox 多选框

在一组备选项中进行多选。

## 基础用法

单独使用可以表示两种状态之间的切换，写在标签中的内容为 checkbox 按钮后的介绍。

<div class="example">
 <Basic/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <div>
    <a-checkbox v-model="checked1.value">我已阅读并同意此协议</a-checkbox>
    <a-checkbox v-model="checked2">选项 1</a-checkbox>
    <a-checkbox v-model="checked3">选项 2</a-checkbox>
    <a-checkbox v-model="checked4">选项 3</a-checkbox>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
const checked1 = reactive({ value: true });
const checked2 = ref(false);
const checked3 = ref(false);
const checked4 = ref(false);
</script>
```

</details>

## 禁用状态

多选框不可用状态。
设置 `disabled` 属性即可。

<div class="example">
 <Disabled/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <a-checkbox v-model="checked1" disabled>Disabled 1</a-checkbox>
  <a-checkbox v-model="checked2" disabled>Disabled 2</a-checkbox>
  <a-checkbox>Normal</a-checkbox>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const checked1 = ref(false);
const checked2 = ref(true);
</script>
```

</details>

## 成组的多选框

适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。

<div class="example">
 <CheckboxGroup/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <div style="margin-bottom: 10px">
    checkedList：<a-tag type="info" v-for="item in checkedList" :key="item"
      >选项 {{ item }}
    </a-tag>
  </div>
  <a-checkbox-group v-model="checkedList" :options="options"></a-checkbox-group>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { YCheckboxGroup, YTag } from "amu-ui";

const checkedList = ref<Array<any>>([1, 2]);
const options = ref([
  {
    label: "选项一",
    value: 1,
  },
  {
    label: "选项二",
    value: 2,
  },
  {
    label: "选项三",
    value: 3,
    disabled: true,
  },
  {
    label: "选项四",
    value: 4,
  },
  {
    label: "选项五",
    value: 5,
  },
]);
</script>
```

</details>

## Checkbox API

| 属性名       | 说明             | 类型    | 默认值 |
| ------------ | ---------------- | ------- | ------ |
| v-model      | 选中项绑定值     | Boolean | —      |
| defaultValue | Array / Boolean  | Boolean | —      |
| loading      | 是否为加载中状态 | boolean | false  |
| disabled     | 是否为禁用状态   | boolean | false  |

## Checkbox Group API

| 属性名  | 说明         | 类型  | 默认值 |
| ------- | ------------ | ----- | ------ |
| v-model | 选中项绑定值 | array | —      |
| options | 传入的选项数组     | array | —      |

## options Attributes

| 属性名   | 说明           | 类型          | 默认值 |
| -------- | -------------- | ------------- | ------ |
| value    | 选项的值       | number        | —      |
| label    | 选项的标签     | string/number | —      |
| disabled | 是否禁用该选项 | boolean       | —      |

<style>
  table td {
      width:200px
  }
</style>
