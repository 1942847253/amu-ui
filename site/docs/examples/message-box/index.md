
<script setup>
import Basic from './component/Basic.vue';
import Confirm from './component/Confirm.vue'
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


## 确认消息

提示用户确认其已经触发的动作，并询问是否进行此操作时会用到此对话框。

<div class="example">
 <Confirm/>
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
