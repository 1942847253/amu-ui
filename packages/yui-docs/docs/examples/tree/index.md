<script setup>
import Basic from './component/Basic.vue'
import Closeable from './component/Closeable.vue'
</script>

# Tree 树形控件

用清晰的层级结构展示信息，可展开或折叠。

## 基础用法

基础的树形结构展示

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

## 可移除标签

设置 `closable` 属性可以定义一个标签是否可移除。

<div class="example">
 <Closeable />
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

