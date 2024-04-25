<script setup>
import Basic from './component/Basic.vue'
import Empty from './component/Empty.vue'
import Border from './component/Border.vue'
import SelfDefined from './component/SelfDefined.vue'
import Height from './component/Height.vue'

</script>

# Table 表格

用于展示多条结构类似的数据

## 基础用法

基础的表格展示用法。
<Demo>
 <Basic/>

::: details
   <<< @/examples/table/component/Basic.vue
:::
</Demo>

## 空表格
<Demo>
 <Empty/>

::: details
   <<< @/examples/table/component/Empty.vue
:::
</Demo>

## 带边框的表格

默认情况下，Table 组件是不具有竖直方向的边框的， 如果需要，可以使用 `single-line` 属性，把该属性设置为 `false` 即可启用。
<Demo>
 <Border/>

::: details
   <<< @/examples/table/component/Border.vue
:::
</Demo>


## 自定义表格内容

可以通过插槽嵌入自定义的组件

<Demo>
 <SelfDefined/>

::: details
   <<< @/examples/table/component/SelfDefined.vue
:::
</Demo>



## 固定表头

在展示大量数据的时候通过设定 `max-height` 来固定头部、滚动数据。

<Demo>
<Height/>

::: details
   <<< @/examples/table/component/Height.vue
:::
</Demo>


