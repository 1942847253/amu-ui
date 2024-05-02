<script setup>
import Basic from './component/Basic.vue'
import Closeable from './component/Closeable.vue'
</script>

# Tag 标签

用于标记和选择。

## 基础用法

使用 `type` 来定义选择 tag 的类型。
<Demo>
<Basic/>

::: details
<<< @/examples/tag/component/Basic.vue
:::
</Demo>

## 可移除标签

设置 `closable` 属性可以定义一个标签是否可移除。
<Demo>
<Closeable/>

::: details
<<< @/examples/tag/component/Closeable.vue
:::
</Demo>

