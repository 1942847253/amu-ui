<script setup>
import Basic from './component/Basic.vue'
import Rule from './component/Rule.vue'
</script>

# Form 表单

表单包含 `输入框`, `单选框`, `下拉选择`, `多选框` 等用户输入的组件。 使用表单，您可以收集、验证和提交数据。

## 典型表单

最基础的表单包括各种输入表单项，比如`input`、`select`、`radio`、`checkbox`等。

在每一个 form 组件中，你需要一个 form-item 字段作为输入项的容器，用于获取值与验证值
<Demo>
<Basic/>

::: details
<<< @/examples/Form/component/Basic.vue
:::
</Demo>

## 表单校验
Form 组件允许你验证用户的输入是否符合规范，来帮助你找到和纠正错误。
Form 组件提供了表单验证的功能，只需为 `rules` 属性传入约定的验证规则，并将 `form-Item` 的 `prop` 属性设置为需要验证的特殊键值即可。
<Demo>
<Rule/>

::: details
<<< @/examples/Form/component/Rule.vue
:::
</Demo>

