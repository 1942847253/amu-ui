<script setup>
import Basic from './component/Basic.vue'
import Inner from './component/Inner.vue'
import Color from './component/Color.vue'


</script>

# Progress 进度条

用于展示操作进度，告知用户当前状态和预期。

## 直线进度条

Progress 组件设置 `percentage` 属性即可，表示进度条对应的百分比。 该属性必填，并且必须在 0-100 的范围内。 你可以通过设置 `format` 来自定义文字显示的格式
<Demo>
<Basic/>

::: details
<<< @/examples/progress/component/Basic.vue
:::
</Demo>

## 进度条内显示百分比标识

百分比不占用额外空间，适用于文件上传等场景。
Progress 组件可通过 `stroke-width` 属性更改进度条的高度，并可通过 `text-inside` 属性来改变进度条内部的文字
<Demo>
<Inner/>

::: details
<<< @/examples/progress/component/Inner.vue
:::
</Demo>

## 自定义进度条的颜色

可以通过 color 属性来设置进度条的颜色。 该属性可以接受十六进制颜色值和数组。
<Demo>
<Color/>

::: details
<<< @/examples/progress/component/Color.vue
:::
</Demo>

## Progress API

| 属性名       | 说明                                                 | 类型             | 默认值 |
| ------------ | ---------------------------------------------------- | ---------------- | ------ |
| percentage   | 百分比，必填                                         | `number`         | 0      |
| stroke-width | 进度条的宽度                                         | `number`         | 6      |
| text-inside  | 文字显示在进度条内                                   | `boolean`        | false  |
| status       | 进度条当前状态                                       | `string`         | ''     |
| stroke-width | 进度条的宽度                                         | `number`         | 6      |
| color        | 进度条背景色 进度条背景色 （会覆盖 status 状态颜色） | `string`/`Array` | --     |
| format       | 指定进度条文字内容                                   | `Function`       | --     |

<style>
  table td {
      width:max-content
  }
</style>
