<script setup>
import Basic from './component/Basic.vue'
import Color from './component/Color.vue'
import Disabled from './component/Disabled.vue'
import Length from './component/Length.vue'
</script>

# Rate 评分

用于评分

## 基础用法

通过 v-model 来绑定当前评分值。
<Demo>
<Basic/>

::: details
<<< @/examples/Rate/component/Basic.vue
:::
</Demo>

## 可自定义颜色

设置 `color` 属性可以设置选中时的颜色
<Demo>
<Color/>

::: details
<<< @/examples/Rate/component/Color.vue
:::
</Demo>

## 禁用状态

设置 `disabled` 来禁用评分。
<Demo>
<Disabled/>

::: details
<<< @/examples/Rate/component/Disabled.vue
:::
</Demo>

## 自定义长度

设置 `max` 来定义评分的长度。
<Demo>
<Length/>

::: details
<<< @/examples/Rate/component/Length.vue
:::
</Demo>

| 属性名   | 说明     | 类型    | 默认值 |
| -------- | -------- | ------- | ------ |
| v-model  | 绑定的值 | number  | —      |
| color    | 颜色     | string  | —      |
| disabled | 是否禁用 | boolean | —      |
| max      | 定义长度 | boolean | —      |
