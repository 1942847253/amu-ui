<script setup>
import Basic from './component/Basic.vue'
import Color from './component/Color.vue'
import Disabled from './component/Disabled.vue'
import Length from './component/Length.vue'
</script>

# Rate 评分

用于评分

## 基础用法

通过 v-model 来绑定当前评分值。

<div class="example">
 <Basic/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <ARate v-model="rateValue"></ARate>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const rateValue = ref(3);
</script>
```

</details>

## 可自定义颜色

设置 `color` 属性可以设置选中时的颜色

<div class="example">
 <Color />
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <ARate v-model="rateValue" color="red"></ARate>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const rateValue = ref(4);
</script>
```

</details>

## 禁用状态

设置 `disabled` 来禁用评分。

<div class="example">
 <Disabled />
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <ARate v-model="rateValue" color="red" disabled></ARate>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const rateValue = ref(4);
</script>
```

</details>

## 自定义长度

设置 `max` 来定义评分的长度。

<div class="example">
 <Length />
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <ARate :max="10" v-model="rateValue" color="red"></ARate>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const rateValue = ref(7);
</script>
```

</details>

| 属性名   | 说明     | 类型    | 默认值 |
| -------- | -------- | ------- | ------ |
| v-model  | 绑定的值 | number  | —      |
| color    | 颜色     | string  | —      |
| disabled | 是否禁用 | boolean | —      |
| max      | 定义长度 | boolean | —      |
