<script setup>
import Basic from './component/Basic.vue'
import visible from './component/visible.vue'
import Slot from './component/slot.vue'
</script>

# Popover 气泡卡片

## 基础用法

`trigger` 属性被用来决定 popover 的触发方式，支持的触发方式： `hover`、`click`
<Demo>
<Basic/>

::: details
<<< @/examples/popover/component/Basic.vue
:::
</Demo>

## 受控模式

如果你想手动控制显示与隐藏，可以设置 `visible` 属性。
<Demo>
<visible/>

::: details
<<< @/examples/popover/component/visible.vue
:::
</Demo>

## 内容可扩展

可以在 Popover 中嵌套其它组件， 以下为嵌套表格的例子。
<Demo>
<Slot/>

::: details
<<< @/examples/popover/component/slot.vue
:::
</Demo>

## Slots

| 属性名    | 说明                          |
| --------- | ----------------------------- |
| -         | Popover 内嵌 HTML 文本        |
| reference | 触发 Popover 显示的 HTML 元素 |

## Attributes

| 属性名    | 说明                                               | 类型    | 可选值                        | 默认值 |
| --------- | -------------------------------------------------- | ------- | ----------------------------- | ------ |
| trigger   | 触发方式                                           | string  | click/hover | hover  |
| title     | 标题                                               | string  | —                             | —      |
| content   | 显示的内容，也可以通过写入默认 `slot` 修改显示内容 | string  | —                             | —      |
| width     | 宽度                                               | string  | —                             | 150px  |
| placement | 出现位置                                           | string  | top/left/bottom/right         | bottom |
| visible   | Popover 是否显示                                   | Boolean | —                             | null   |

<style>
  table td {
      width:fit-content
  }
</style>

