<script setup>
import Basic from './component/Basic.vue'
import Rule from './component/Rule.vue'
</script>

# Drawer 抽屉

有些时候, Dialog 组件并不满足我们的需求, 比如你的表单很长, 亦或是你需要临时展示一些文档, Drawer 拥有和 Dialog 几乎相同的 API, 在 UI 上带来不一样的体验.

## 基础用法

呼出一个临时的侧边栏, 可以从多个方向呼出

 设置 `model-value` 属性来控制 Drawer 的显示与隐藏状态，该属性接受一个 `boolean` 类型。 Drawer 包含三部分: `title & body & footer`, 其中 `title` 是一个具名 slot, 你还可以通过 `title` 属性来设置标题, 默认情况下它是一个空字符串, 其中 body 部分是 Drawer 组件的主区域, 它包含了用户定义的主要内容. footer和title用法一致, 用来显示页脚信息. 当 Drawer 打开时，默认设置是从右至左打开 `30%` 浏览器宽度。 你可以通过传入对应的 `direction` 和 `size` 属性来修改这一默认行为。
<div class="example">
 <Basic/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
 <YDatePicker v-model="dateValue" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const dateValue = ref("");

</script>

```

</details>

## 表单校验
Form 组件允许你验证用户的输入是否符合规范，来帮助你找到和纠正错误。
Form 组件提供了表单验证的功能，只需为 `rules` 属性传入约定的验证规则，并将 `form-Item` 的 `prop` 属性设置为需要验证的特殊键值即可。

<div class="example">
 <Rule />
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <YRate v-model="rateValue" color="red"></YRate>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const rateValue = ref(4);
</script>
```

</details>


