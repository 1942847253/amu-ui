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
    <a-radio-group  v-model="checked1" :options="options1"></a-radio-group>
    <a-radio-group v-model="checked2" :options="options2"></a-radio-group>
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
  <a-checkbox v-model="checked1" disabled>Disabled 1</a-checkbox>
  <a-checkbox v-model="checked2" disabled>Disabled 2</a-checkbox>
  <a-checkbox>Normal</a-checkbox>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { YCheckbox } from "amu-ui";

const checked1 = ref(false);
const checked2 = ref(true);
</script>
```

</details>



