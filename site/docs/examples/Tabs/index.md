<script setup>
import Basic from './component/Basic.vue'
import Position from './component/Position.vue'
</script>

# Tabs 标签页

分隔内容上有关联但属于不同类别的数据集合。

## 基础用法

基础的、简洁的标签页。

Tabs 组件提供了选项卡功能， 默认选中第一个标签页，你也可以通过 value 属性来指定当前选中的标签页。
<Demo>
<Basic/>

::: details
<<< @/examples/Tabs/component/Basic.vue
:::
</Demo>

## 标签位置的设置

每次只能展开一个面板

通过 `position` 设置标签的位置
标签一共有两个方向的设置 `position="top|left"`
<Demo>
<Position/>

::: details
<<< @/examples/Tabs/component/Position.vue
:::
</Demo>

