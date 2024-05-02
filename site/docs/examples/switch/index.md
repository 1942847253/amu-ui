<script setup>
import Basic from './component/Basic.vue'
import Disabled from './component/Disabled.vue'
import Title from './component/Title.vue'
</script>

# Switch 开关

表示两种相互对立的状态间的切换，多用于触发「开/关」。

## 基础用法

绑定 `v-model` 到一个 `Boolean` 类型的变量。
<Demo>
<Basic/>

::: details
<<< @/examples/switch/component/Basic.vue
:::
</Demo>

## 禁用状态

使用 `disabled` 属性来禁用开关。
<Demo>
<Disabled/>

::: details
<<< @/examples/switch/component/Disabled.vue
:::
</Demo>

## 文字描述

使用 `openTitle` 与 `offTitle` 设置一组单个字的反义词
<Demo>
<Title/>

::: details
<<< @/examples/switch/component/Title.vue
:::
</Demo>

## Switch API

| 属性名     | 说明             | 类型    | 默认值 |
| ---------- | ---------------- | ------- | ------ |
| v-model    | switch 绑定的值  | boolean | —      |
| disabled   | 是否禁用         | boolean | false  |
| open-title | 打开时的文字描述 | string  | —      |
| off-title  | 关闭时的文字描述 | string  | —      |
