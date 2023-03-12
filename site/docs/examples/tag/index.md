<script setup>
import Basic from './component/Basic.vue'
import Closeable from './component/Closeable.vue'
</script>

# Tag 标签

用于标记和选择。

## 基础用法

使用 `type` 来定义选择 tag 的类型。

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

