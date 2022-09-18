<style>
  .prev-next{
   border-top:none;
  }
   h2{
    border:none;
   }
    .example{
        border: 1px solid #dcdfe6ba;
        border-radius: 5px;
        padding:20px
    }
    .y-button {
        margin:10px 5px
    }
    
    details > summary:first-of-type {
        font-size: 10px;
        padding: 8px 0;
        cursor: pointer;
        color: #1989fa;
    }
</style>

<script setup>
import Basic from './component/Basic.vue'
</script>

# Button 按钮

常用的操作按钮。

## 基础用法

使用 `type` 来定义按钮的样式。

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
