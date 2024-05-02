<script setup>
import Basic from './component/Basic.vue'
import Checked from './component/Checked.vue'
</script>

# Tree 树形控件

用清晰的层级结构展示信息，可展开或折叠。

## 基础用法

基础的树形结构展示
<Demo>
<Basic/>

::: details
<<< @/examples/tree/component/Basic.vue
:::
</Demo>

## 可选择

适用于需要选择层级时使用。
<Demo>
<Checked/>

::: details
<<< @/examples/tree/component/Checked.vue
:::
</Demo>

## Select API

| 属性名 | 说明              | 类型  | 默认值 |
| ------ | ----------------- | ----- | ------ |
| data   | tree 绑定树型结构 | array | —      |

## options Attributes

| 属性名   | 说明               | 类型   | 默认值 |
| -------- | ------------------ | ------ | ------ |
| key      | 树型结构的唯一 key | number | —      |
| label    | 显示标题           | string | —      |
| children | 树形结构的子项     | object | —      |

## Select Events

| 事件名     | 说明                 | 回调参数              |
| ---------- | -------------------- | --------------------- |
| node-click | 点击当前节点时触发   | val，当前点击的节点值 |
| checked    | 选中或取消节点时触发 | val，当前选中的节点值 |
