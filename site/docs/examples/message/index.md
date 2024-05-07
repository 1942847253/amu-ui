
<script setup>
import Basic from './component/Basic.vue'
import DiffType from './component/DiffType.vue'
</script>

# Message 消息提示

常用于主动操作后的反馈提示。

## 基础用法

从顶部出现，3 秒后自动消失。
<Demo>
<Basic/>

::: details
<<< @/examples/message/component/Basic.vue
:::
</Demo>

## 不同状态

用来显示「`成功`、`警告`、`消息`、`错误`」类的操作反馈。
<Demo>
<DiffType/>

::: details
<<< @/examples/message/component/DiffType.vue
:::
</Demo>
