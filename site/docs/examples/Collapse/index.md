<script setup>
import Basic from './component/Basic.vue'
import Accordion from './component/Accordion.vue'
</script>

# Collapse 折叠面板

通过折叠面板收纳内容区域

## 基础用法

可同时展开多个面板，面板之间不影响

<div class="example">
 <Basic/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
 <ADatePicker v-model="dateValue" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const dateValue = ref("");

</script>

```

</details>

## 手风琴效果

每次只能展开一个面板

通过 `accordion` 属性来设置是否以手风琴模式显示

<div class="example">
 <Accordion />
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


