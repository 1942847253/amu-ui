<script setup>
import Basic from './component/Basic.vue'
import Content from './component/Content.vue'
</script>

# Dialog 对话框

在保留当前页面状态的情况下，告知用户并承载相关操作。

## 典型表单

Dialog 弹出一个对话框，适合需要定制性更大的场景。

需要设置 `model-value / v-model` 属性，它接收 `Boolean`，当为 `true` 时显示 Dialog。 Dialog 分为两个部分：`body` 和 `footer`，footer 需要具名为 footer 的 slot。 title 属性用于定义标题，它是可选的，默认值为空。
<div class="example">
 <Basic/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <a-button type="info" @click="dialogVisible = true">open</a-button>
  <a-dialog width="30%" title="Tips"  v-model="dialogVisible">
    <span>This is a message</span>
  </a-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const dialogVisible = ref(false)
</script>

```

</details>

## 自定义内容
对话框的内容可以是任何东西，甚至是一个表格或表单。 此示例显示如何在 Dialog 中使用 Amu UI 的表格和表单。

<div class="example">
 <Content />
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <ARate v-model="rateValue" color="red"></ARate>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const rateValue = ref(4);
</script>
```

</details>


