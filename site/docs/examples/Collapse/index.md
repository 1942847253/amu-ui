<script setup>
import Basic from './component/Basic.vue'
import Accordion from './component/Accordion.vue'
</script>

# Collapse 折叠面板

通过折叠面板收纳内容区域

## 基础用法

可同时展开多个面板，面板之间不影响
<Demo>
<Basic/>

::: details
<<< @/examples/Collapse/component/Basic.vue
:::
</Demo>

## 手风琴效果

每次只能展开一个面板

通过 `accordion` 属性来设置是否以手风琴模式显示
<Demo>
<Accordion/>

::: details
<<< @/examples/Collapse/component/Accordion.vue
:::
</Demo>
