<script setup>
import Basic from './component/Basic.vue'
import CustomSize from './component/CustomSize.vue'
import Column from './component/Column.vue'
import Size from './component/Size.vue'
</script>

# Space 间距

设置组件之间的间距

## 基础用法

间距组件的基本用法。
使用 `size` 在设置间距大小, 默认为 `small` ,也可设定为数字值
<Demo>
<Basic/>

::: details
<<< @/examples/space/component/Basic.vue
:::
</Demo>

## 垂直布局

将 `direction` 设置为 `column` 即可实现垂直布局 , 背后实际上是利用了 flex-direction 来控制.
<Demo>
<Column/>

::: details
<<< @/examples/space/component/Column.vue
:::
</Demo>

## 控制间距的大小

通过调整 size 的值来控制间距的大小

使用内置的 `small`、`default`、`large` 来设置间距大小，分别对应 `8px`、`12px` 和 `16px` 的间距。 默认的间距大小为 `small`，也就是 `8px`。

您也可以通过自定义的 `size` 来控制大小， 参见下一个部分。
<Demo>
<Size/>

::: details
<<< @/examples/space/component/Size.vue
:::
</Demo>

## 自定义 Size

很多时候，内建的大小不满足设计师的要求，我们可以通过传入自己定义的大小 (数值类型) 来设置。
<Demo>
<CustomSize/>

::: details
<<< @/examples/space/component/CustomSize.vue
:::
</Demo>

## Space API

| 属性名     | 说明           | 类型                                   | 默认值     |
| ---------- | -------------- | -------------------------------------- | ---------- |
| size       | 间隔大小       | `string / number`                      | small      |
| direction  | 间距方向       | `'vertical' / 'horizontal'`            | horizontal |
| align      | 对齐方式       | `'start' / 'end' / 'end' / 'baseline'` | start      |
