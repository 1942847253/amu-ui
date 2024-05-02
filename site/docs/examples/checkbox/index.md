<script setup>
import Basic from './component/Basic.vue'
import CheckboxGroup from './component/CheckboxGroup.vue'
import Disabled from './component/Disabled.vue'
</script>

# Checkbox 多选框

在一组备选项中进行多选。

## 基础用法

单独使用可以表示两种状态之间的切换，写在标签中的内容为 checkbox 按钮后的介绍。
<Demo>
<Basic/>

::: details
<<< @/examples/checkbox/component/Basic.vue
:::
</Demo>

## 禁用状态

多选框不可用状态。
设置 `disabled` 属性即可。
<Demo>
<Disabled/>

::: details
<<< @/examples/checkbox/component/Disabled.vue
:::
</Demo>

## 成组的多选框

适用于多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项。
<Demo>
<CheckboxGroup/>

::: details
<<< @/examples/checkbox/component/CheckboxGroup.vue
:::
</Demo>

## Checkbox API

| 属性名       | 说明             | 类型    | 默认值 |
| ------------ | ---------------- | ------- | ------ |
| v-model      | 选中项绑定值     | Boolean | —      |
| defaultValue | Array / Boolean  | Boolean | —      |
| loading      | 是否为加载中状态 | boolean | false  |
| disabled     | 是否为禁用状态   | boolean | false  |

## Checkbox Group API

| 属性名  | 说明         | 类型  | 默认值 |
| ------- | ------------ | ----- | ------ |
| v-model | 选中项绑定值 | array | —      |
| options | 传入的选项数组     | array | —      |

## options Attributes

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
