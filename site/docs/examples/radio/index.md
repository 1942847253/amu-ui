<script setup>
import Basic from './component/Basic.vue'
import Disabled from './component/Disabled.vue'
</script>

# Radio 单选框

在一组备选项中进行单选。

## 基础用法

一般为一组数据中单选某个数据，如需选择多个选项推荐使用 Checkbox 多选框
<Demo>
<Basic/>

::: details
<<< @/examples/radio/component/Basic.vue
:::
</Demo>

## 禁用状态

单选框不可用状态。
设置 `disabled` 属性即可。
<Demo>
<Disabled/>

::: details
<<< @/examples/radio/component/Disabled.vue
:::
</Demo>

## Radio API

| 属性名  | 说明           | 类型   | 默认值 |
| ------- | -------------- | ------ | ------ |
| v-model | radio 绑定的值 | number | —      |
| options | 传入的选项数组 | array  | —      |

## Option Attributes

| 属性名   | 说明           | 类型          | 默认值 |
| -------- | -------------- | ------------- | ------ |
| value    | 选项的值       | number        | —      |
| label    | 选项的标签     | string/number | —      |
| disabled | 是否禁用该选项 | boolean       | —      |

<style>
  table td {
      width:200px
  }
</style>
