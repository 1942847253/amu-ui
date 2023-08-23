<script setup>
import Basic from './component/Basic.vue'
import Inner from './component/Inner.vue'
import Color from './component/Color.vue'


</script>

# Progress 进度条

用于展示操作进度，告知用户当前状态和预期。

## 直线进度条

Progress 组件设置 `percentage` 属性即可，表示进度条对应的百分比。 该属性必填，并且必须在 0-100 的范围内。 你可以通过设置 `format` 来自定义文字显示的格式

<div class="example">
 <Basic/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <div style="line-height: 30px;">
    <AProgress style="width: 500px" :percentage="50" />
    <AProgress style="width: 500px" :percentage="100" :format="format" />
    <AProgress style="width: 500px" :percentage="100" status="success" />
    <AProgress style="width: 500px" :percentage="100" status="prompt" />
    <AProgress style="width: 500px" :percentage="50" status="error" />
  </div>
</template>

<script setup>
const format = (percentage) => (percentage === 100 ? "Full" : `${percentage}%`);
</script>
```

</details>

## 进度条内显示百分比标识

百分比不占用额外空间，适用于文件上传等场景。
Progress 组件可通过 `stroke-width` 属性更改进度条的高度，并可通过 `text-inside` 属性来改变进度条内部的文字

<div class="example">
 <Inner />
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <AProgress
    style="width: 500px; margin-bottom: 10px"
    :percentage="70"
    :strokeWidth="20"
    textInside
  />
  <AProgress
    style="width: 500px; margin-bottom: 10px"
    :percentage="100"
    :strokeWidth="24"
    textInside
    status="success"
  />
  <AProgress
    style="width: 500px"
    :percentage="percentage"
    :strokeWidth="26"
    textInside
    status="error"
  />
</template>

<script setup>
import { ref } from "vue";
let timer = null;
const percentage = ref(0);

const SetInterval = () => {
  timer = setTimeout(() => {
    if (percentage.value >= 100) {
      percentage.value = 0;
    } else {
      percentage.value++;
    }
    SetInterval();
  }, 150);
};
SetInterval();
</script>
```

</details>

## 自定义进度条的颜色

可以通过 color 属性来设置进度条的颜色。 该属性可以接受十六进制颜色值和数组。

<div class="example">
 <Color />
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <div style="line-height: 30px">
    <AProgress style="width: 500px" :percentage="percentage" color="#fd8ca0" />
    <AProgress style="width: 500px" :percentage="percentage" color="#2b92ed" />
    <AProgress style="width: 500px" :percentage="percentage" color="#bd26b4" />
    <AProgress
      style="width: 500px"
      :percentage="percentage"
      :color="customColors"
    />
    <a-input-number v-model="percentage" :step="10" :min="0" :max="100" />
  </div>
</template>

<script setup>
import { ref } from "vue";
const percentage = ref(30);
const customColors = [
  { color: "#e53935", percentage: 20 },
  { color: "#d69800", percentage: 40 },
  { color: "#18a058", percentage: 60 },
  { color: "#0468dc", percentage: 80 },
  { color: "#4655ca", percentage: 100 },
];
</script>
```

</details>
