
<script setup>
import Basic from './component/Basic.vue'
import DiffType from './component/DiffType.vue'
</script>

# MessageBox 消息弹框

模拟系统的消息提示框而实现的一套模态对话框组件，用于消息提示、确认消息和提交内容。

## 消息提示

当用户进行操作时会被触发，该对话框中断用户操作，直到用户确认知晓后才可关闭。

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
