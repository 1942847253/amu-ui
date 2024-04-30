<script setup>
import Basic from './component/Basic.vue'
import Content from './component/Content.vue'
import Center from './component/Center.vue'
import AlignCenter from './component/AlignCenter.vue'
</script>

# Dialog 对话框

在保留当前页面状态的情况下，告知用户并承载相关操作。

## 基础用法

Dialog 弹出一个对话框，适合需要定制性更大的场景。

需要设置 `model-value / v-model` 属性，它接收 `Boolean`，当为 `true` 时显示 Dialog。 Dialog 分为两个部分：`body` 和 `footer`，footer 需要具名为 footer 的 slot。 title 属性用于定义标题，它是可选的，默认值为空。
<Demo>
<Basic/>

::: details
<<< @/examples/dialog/component/Basic.vue
:::
</Demo>

## 自定义内容
对话框的内容可以是任何东西，甚至是一个表格或表单。 此示例显示如何在 Dialog 中使用 Amu UI 的表格和表单。
<Demo>
<Content/>

::: details
<<< @/examples/dialog/component/Content.vue
:::
</Demo>

## 内容居中
对话框的内容可以居中。
将`center`设置为`true`即可使标题和底部居中。 `center`仅影响标题和底部区域。 Dialog 的内容是任意的，在一些情况下，内容并不适合居中布局。 如果需要内容也水平居中，请自行为其添加 CSS 样式。
<Demo>
<Center/>

::: details
<<< @/examples/dialog/component/Center.vue
:::
</Demo>

## 居中对话框
从屏幕中心打开对话框。

设置 `align-center` 为 `true` 使对话框水平垂直居中。 由于对话框垂直居中在弹性盒子中，所以`offset-top`属性将不起作用。
<Demo>
<AlignCenter/>

::: details
<<< @/examples/dialog/component/AlignCenter.vue
:::
</Demo>
