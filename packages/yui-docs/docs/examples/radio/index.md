<script setup>
import Basic from './component/Basic.vue'
import CheckboxGroup from './component/CheckboxGroup.vue'
import Disabled from './component/Disabled.vue'
</script>

# Radio 单选框

在一组备选项中进行单选。

## 基础用法

一般为一组数据中单选某个数据，如需选择多个选项推荐使用Checkbox多选框

<div class="example">
 <Basic/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
    <y-radio-group  v-model="checked1" :options="options1"></y-radio-group>
    <y-radio-group v-model="checked2" :options="options2"></y-radio-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checked1 = ref(1)
const checked2 = ref(3)

const options1 = ref([
    {
        label: "选项 A",
        value: 1,
    },
    {
        label: "选项 B",
        value: 2,
    },

]);
const options2 = ref([
    {
        label: "选项 C",
        value: 3,
        disabled:true,
    },
    {
        label: "选项 D",
        value: 4,
        disabled: true,
    },

]);
</script>

```

</details>

## 禁用状态

单选框不可用状态。
设置 `disabled` 属性即可。

<div class="example">
 <Disabled/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <y-checkbox v-model="checked1" disabled>Disabled 1</y-checkbox>
  <y-checkbox v-model="checked2" disabled>Disabled 2</y-checkbox>
  <y-checkbox>Normal</y-checkbox>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { YCheckbox } from "y-ui";

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
    checkedList：<y-tag type="info" v-for="item in checkedList" :key="item"
      >选项 {{ item }}
    </y-tag>
  </div>
  <y-checkbox-group v-model="checkedList" :options="options"></y-checkbox-group>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { YCheckboxGroup, YTag } from "y-ui";

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
