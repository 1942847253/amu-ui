<script setup>
import Basic from './component/Basic.vue'
import Dark from './component/Dark.vue'
</script>

# Menu 菜单

为网站提供导航功能的菜单。

## 侧栏

垂直菜单，可内嵌子菜单。

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

## 深色菜单



通过 `dark` 属性修改为深色主题的菜单

<div class="example">
 <Dark />
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


