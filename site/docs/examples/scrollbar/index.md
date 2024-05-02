<script setup>
import Basic from './component/Basic.vue'
import CustomSize from './component/CustomSize.vue'
import Column from './component/Column.vue'
import Size from './component/Size.vue'
</script>

# Scrollbar 滚动条

天下苦浏览器原生滚动条久矣，试试这个。

## 基础用法

通过 `height` 属性设置滚动条高度，若不设置则根据父容器高度自适应。
<Demo>
<Basic/>

::: details
<<< @/examples/scrollbar/component/Basic.vue
:::
</Demo>

## 横向滚动

设置 `x-scrollable` 为 `true` 当元素宽度大于滚动条宽度时，会显示横向滚动条。
<Demo>
<Column/>

::: details
<<< @/examples/scrollbar/component/Column.vue
:::
</Demo>

## 触发方式

你可以设定不同的触发方式，`trigger="none"` 会让滚动条一直显示，`trigger="hover"` 会让滚动条在鼠标悬浮的时候显示。
<Demo>
<Size/>

::: details
<<< @/examples/scrollbar/component/Size.vue
:::
</Demo>

## Scrollbar API

| 属性名       | 说明                                  | 类型                  | 默认值      |
| ------------ | ------------------------------------- | --------------------- | ----------- |
| trigger      | 显示滚动条的时机，'none' 表示一直显示 | `'hover' / 'none'   ` | `'hover'`   |
| x-scrollable | 是否可以横向滚动                      | `boolean`             | `false`     |
| on-scroll    | 滚动的回调                            | `(e: Event) => void`  | `undefined` |
