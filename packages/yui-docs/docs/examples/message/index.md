
<script setup>
import Basic from './component/Basic.vue'
import DiffType from './component/DiffType.vue'
</script>

# Message 消息提示

常用于主动操作后的反馈提示。

## 基础用法

从顶部出现，3 秒后自动消失。

<div class="example">
 <Basic/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <div>
    <y-button>default</y-button>
    <y-button type="primary">primary</y-button>
    <y-button type="success">success</y-button>
    <y-button type="warning">warning</y-button>
    <y-button type="danger">error</y-button>
    <y-button type="info">info</y-button>
  </div>
</template>
<script lang="ts" setup>
import { YButton } from "y-ui";
</script>
```

</details>


## 不同状态

用来显示「成功、警告、消息、错误」类的操作反馈。

<div class="example">
 <DiffType/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <div>
    <y-button>default</y-button>
    <y-button type="primary">primary</y-button>
    <y-button type="success">success</y-button>
    <y-button type="warning">warning</y-button>
    <y-button type="danger">error</y-button>
    <y-button type="info">info</y-button>
  </div>
</template>
<script lang="ts" setup>
import { YButton } from "y-ui";
</script>
```

</details>
