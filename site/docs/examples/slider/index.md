<script setup>
import Basic from './component/Basic.vue'
import Step from './component/Step.vue'
import Disabled from './component/Disabled.vue'

</script>

# Slider 滑块

通过拖动滑块在一个固定区间内进行选择

## 基础用法

在拖动滑块时，显示当前值

通过设置绑定值自定义滑块的初始值

<div class="example">
 <Basic/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <div class="list">
    <div class="item">
      <span>Default value</span> <a-slider v-model="value1" />
    </div>
    <div class="item">
      <span>Customized initial value</span> <a-slider v-model="value2" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const value1 = ref(0);
const value2 = ref(50);
</script>

<style lang="less" scoped>
.list {
  .item {
    display: flex;
    align-items: center;
    span {
      min-width: 200px;
      font-size: 13.5px;
    }
  }
}
</style>
```

</details>

## 离散值

选项可以是离散的

改变`step`的值可以改变步长

<div class="example">
 <Step/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <div class="list">
    <div class="item">
      <span>step {{ value1 }}</span> <a-slider v-model="value1" :step="5" />
    </div>
    <div class="item">
      <span>step {{ value2 }}</span> <a-slider v-model="value2" :step="10" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const value1 = ref(25);
const value2 = ref(70);
</script>

<style lang="less" scoped>
.list {
  .item {
    display: flex;
    align-items: center;
    span {
      min-width: 100px;
      font-size: 13.5px;
    }
  }
}
</style>
```

</details>

## Slider API

| 属性名  | 说明            | 类型   | 默认值 |
| ------- | --------------- | ------ | ------ |
| v-model | slider 绑定的值 | number | 0      |
| step    | 步长            | number | 1      |

## Slider Events

| 事件名 | 说明                   | 回调参数          |
| ------ | ---------------------- | ----------------- |
| change | 当选中值发生变化时触发 | val，目前的选中值 |
