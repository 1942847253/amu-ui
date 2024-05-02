<script setup>
import Basic from './component/Basic.vue'
import Disabled from './component/Disabled.vue' 
</script>

# Input Number 数字输入框

仅允许输入标准的数字值，可定义范围

## 基础用法
要使用它，只需要在 `<a-input-number>` 元素中使用 v-model 绑定变量即可，变量的初始值即为默认值。
<Demo>
<Basic/>

::: details
<<< @/examples/input-number/component/Basic.vue
:::
</Demo>

## 禁用状态

通过 `disabled` 属性指定是否禁用 input-number 组件
<Demo>
<Disabled/>

::: details
<<< @/examples/input-number/component/Disabled.vue
:::
</Demo>


