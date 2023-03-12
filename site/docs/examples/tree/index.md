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
    <a-button>default</a-button>
    <a-button type="primary">primary</a-button>
    <a-button type="success">success</a-button>
    <a-button type="warning">warning</a-button>
    <a-button type="danger">error</a-button>
    <a-button type="info">info</a-button>
  </div>
</template>
<script lang="ts" setup>
import { YButton } from "amu-ui";
</script>
```

</details>

## 可选择

适用于需要选择层级时使用。

<div class="example">
 <Closeable />
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <div>
    <a-button>default</a-button>
    <a-button type="primary">primary</a-button>
    <a-button type="success">success</a-button>
    <a-button type="warning">warning</a-button>
    <a-button type="danger">error</a-button>
    <a-button type="info">info</a-button>
  </div>
</template>
<script lang="ts" setup>
import { YButton } from "amu-ui";
</script>
```

</details>

