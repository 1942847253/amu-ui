

<script setup>
import Basic from './component/Basic.vue'
import Flag from './component/Flag.vue'
import Icon from './component/Icon.vue'
</script>

# Breadcrumb面包屑

显示当前页面在系统层级结构中的位置，并能向上返回。

## 基础用法
<Demo>
<Basic/>

::: details
<<< @/examples/breadcrumb/component/Basic.vue
:::
</Demo>

## 自定义分隔符

你可以使用 `flag` 属性来自定义分隔符
<Demo>
<Flag/>

::: details
<<< @/examples/breadcrumb/component/Flag.vue
:::
</Demo>

## 自定义Icon
<Demo>
<Icon/>

::: details
<<< @/examples/breadcrumb/component/Icon.vue
:::
</Demo>
