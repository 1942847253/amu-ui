<script setup>
import Basic from './component/Basic.vue'
import Color from './component/Color.vue'
import Disabled from './component/Disabled.vue'
import Length from './component/Length.vue'
</script>

# DatePicker 日期选择器

用于选择日期

## 基础用法

通过 v-model 来绑定当前日期。

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
