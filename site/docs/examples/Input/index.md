<script setup>
import Basic from './component/Basic.vue'
import Disabled from './component/Disabled.vue' 
import Clearable from './component/Clearable.vue'
import ShowPassword from './component/ShowPassword.vue'
</script>

# Input 输入框

通过折叠面板收纳内容区域

## 基础用法

<div class="example">
 <Basic/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <a-input v-model="input" placeholder="Please input" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const input = ref('')
</script>

```

</details>

## 禁用状态

每次只能展开一个面板

通过 `disabled` 属性指定是否禁用 input 组件

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

## 一键清空

通过 `clearable` 属性即可得到一个可一键清空的输入框

<div class="example">
 <Clearable />
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <a-input v-model="input" placeholder="Please input" clearable />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const input = ref('')
</script>
```

</details>

## 密码框

通过 `show-password` 属性即可得到一个可切换显示隐藏的密码框

<div class="example">
 <ShowPassword />
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <a-input
    v-model="input"
    type="password"
    placeholder="Please input password"
    show-password
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const input = ref('')
</script>
```

</details>
