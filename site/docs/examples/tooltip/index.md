

<script setup>
import Basic from './component/Basic.vue'
import bgColor from './component/bgColor.vue'
</script>

# Tooltip 文字提示

常用于展示鼠标 hover 时的提示信息。
<p></p>
Tooltip为自定义指令形式的组件，在指定组件上使用v-tooltip即可

## 基础用法

提供四个方向：`top`、`left`、`right`、`bottom`
<Demo>
<Basic/>

::: details
<<< @/examples/tooltip/component/Basic.vue
:::
</Demo>

## 自定义背景色

你可以使用 `bgColor` 属性来自定义背景色
<Demo>
<bgColor/>

::: details
<<< @/examples/tooltip/component/bgColor.vue
:::
</Demo>
