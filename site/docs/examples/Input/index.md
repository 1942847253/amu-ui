<script setup>
import Basic from './component/Basic.vue'
import Disabled from './component/Disabled.vue' 
import Clearable from './component/Clearable.vue'
import ShowPassword from './component/ShowPassword.vue'
</script>

# Input 输入框

通过折叠面板收纳内容区域

## 基础用法
<Demo>
<Basic/>

::: details
<<< @/examples/Input/component/Basic.vue
:::
</Demo>

## 禁用状态

每次只能展开一个面板

通过 `disabled` 属性指定是否禁用 input 组件
<Demo>
<Disabled/>

::: details
<<< @/examples/Input/component/Disabled.vue
:::
</Demo>

## 一键清空

通过 `clearable` 属性即可得到一个可一键清空的输入框
<Demo>
<Clearable/>

::: details
<<< @/examples/Input/component/Clearable.vue
:::
</Demo>

## 密码框

通过 `show-password` 属性即可得到一个可切换显示隐藏的密码框
<Demo>
<ShowPassword/>

::: details
<<< @/examples/Input/component/ShowPassword.vue
:::
</Demo>

