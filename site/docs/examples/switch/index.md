<script setup>
import Basic from './component/Basic.vue'
import Disabled from './component/Disabled.vue'
import Title from './component/Title.vue'
</script>

# Switch 开关

表示两种相互对立的状态间的切换，多用于触发「开/关」。

## 基础用法

绑定 `v-model` 到一个 `Boolean` 类型的变量。

<div class="example">
 <Basic/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <a-switch v-model="value"></a-switch>
  <a-switch></a-switch>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const value = ref(true);
</script>
```

</details>

## 禁用状态

使用 `disabled` 属性来禁用开关。

<div class="example">
 <Disabled/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <a-switch v-model="value" disabled></a-switch>
  <a-switch disabled></a-switch>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const value = ref(true);
</script>
```

</details>

## 文字描述

使用 `openTitle` 与 `offTitle` 设置一组单个字的反义词

<div class="example">
 <Title/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <a-switch
    size="large"
    v-model="value"
    open-title="是"
    off-title="否"
    :disabled="true"
  ></a-switch>
  <a-switch v-model="value" open-title="开" off-title="关"></a-switch>
  <a-switch
    size="small"
    v-model="value"
    open-title="上"
    off-title="下"
  ></a-switch>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const value = ref(true);
</script>
```

</details>

## Switch API

| 属性名     | 说明             | 类型    | 默认值 |
| ---------- | ---------------- | ------- | ------ |
| v-model    | switch 绑定的值  | boolean | —      |
| disabled   | 是否禁用         | boolean | false  |
| open-title | 打开时的文字描述 | string  | —      |
| off-title  | 关闭时的文字描述 | string  | —      |
