<script setup>
import Basic from './component/Basic.vue'
import Step from './component/Step.vue'
import Disabled from './component/Disabled.vue'
import Number from './component/Number.vue'
</script>

# Slider 滑块

通过拖动滑块在一个固定区间内进行选择

## 基础用法

在拖动滑块时，显示当前值

通过设置绑定值自定义滑块的初始值
<Demo>
<Basic/>

::: details
<<< @/examples/slider/component/Basic.vue
:::
</Demo>

## 离散值

选项可以是离散的

改变`step`的值可以改变步长， 通过设置 `show-stops` 属性可以显示间断点
<Demo>
<Step/>

::: details
<<< @/examples/slider/component/Step.vue
:::
</Demo>

## 带有输入框的滑块

通过输入框输入来改变当前的值。

设置 `show-input` 属性会在右侧显示一个输入框
<Demo>
<Number/>

::: details
<<< @/examples/slider/component/Number.vue
:::
</Demo>

## Slider API

| 属性名     | 说明            | 类型    | 默认值 |
| ---------- | --------------- | ------- | ------ |
| v-model    | slider 绑定的值 | number  | 0      |
| step       | 步长            | number  | 1      |
| show-stops | 是否显示间断点  | boolean | false  |
| show-input | 是否显示输入框  | boolean | false  |

## Slider Events

| 事件名 | 说明                   | 回调参数          |
| ------ | ---------------------- | ----------------- |
| change | 当选中值发生变化时触发 | val，目前的选中值 |
