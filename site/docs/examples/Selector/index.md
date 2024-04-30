<script setup>
import Basic from './component/Basic.vue'
import Search from './component/Search.vue'
</script>

# Select 选择器

常用的操作按钮。

## 基础用法

适用广泛的基础单选 `v-model` 的值为当前被选中的`option` 的 value 属性值

<Demo>
<Basic/>

::: details
<<< @/examples/selector/component/Basic.vue
:::
</Demo>


## 带搜索的选择器

选项过多时可以使用 `isSearch` 开启搜索模式 输入关键字自动检索选
<Demo>
<Search/>

::: details
<<< @/examples/selector/component/Search.vue
:::
</Demo>


## Select API

| 属性名   | 说明             | 类型    | 默认值 |
| -------- | ---------------- | ------- | ------ |
| v-model  | radio 绑定的值   | number  | —      |
| options  | 传入的选项数组   | array   | —      |
| isSearch | 是否为搜索选择器 | boolean | false  |

## options Attributes

| 属性名   | 说明           | 类型          | 默认值 |
| -------- | -------------- | ------------- | ------ |
| value    | 选项的值       | number        | —      |
| label    | 选项的标签     | string/number | —      |
| disabled | 是否禁用该选项 | boolean       | —      |

## Select Events

| 事件名       | 说明                 | 回调参数          |
| ------------ | -------------------- | ----------------- |
| setItemValue | 当选中值发生变化时触发 | val，目前的选中值 |
