
<script setup>
import Basic from './component/Basic.vue'
import DiffType from './component/DiffType.vue'
</script>

# Loading 加载

加载数据时显示动效。

## 区域加载

在需要的时候展示加载动画，防止页面失去响应提高用户体验（例如表格）。

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


## 全屏加载
传入`global`属性时加载数据时显示全屏动画。

<div class="example">
 <DiffType/>
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
