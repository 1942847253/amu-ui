<script setup>
import Basic from './component/Basic.vue'
import Disabled from './component/Disabled.vue' 
</script>

# Input Number 数字输入框

仅允许输入标准的数字值，可定义范围

## 基础用法
要使用它，只需要在 `<a-input-number>` 元素中使用 v-model 绑定变量即可，变量的初始值即为默认值。

<div class="example">
 <Basic/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <a-input-number v-model="input" placeholder="Please input" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const input = ref(520)
</script>

```

</details>

## 禁用状态

通过 `disabled` 属性指定是否禁用 input-number 组件

<div class="example">
 <Disabled />
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <a-input v-model="input" disabled placeholder="Please input" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const input = ref('')
</script>
```

</details>

