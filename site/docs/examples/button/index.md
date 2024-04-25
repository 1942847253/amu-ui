<script setup>
import Basic from './component/Basic.vue'
import Ghost from './component/Ghost.vue'
import Dashed from './component/Dashed.vue'
import Text from './component/Text.vue'
import Loading from './component/Loading.vue'
import Circle from './component/Circle.vue'
import Round from './component/Round.vue'
import Color from './component/Color.vue'
</script>

# Button 按钮

常用的操作按钮。

## 基础用法

按钮的 `type` 分别为 `default`、`primary`、`info`、`success`、`warning` 和 `error`。
<Demo>
<Basic/>

::: details
<<< @/examples/button/component/Basic.vue
:::
</Demo>

## 圆角按钮

使用 `round` 来使用圆形按钮。

<Demo>
 <Round/>

::: details
<<< @/examples/button/component/Round.vue
:::
</Demo>

## 圆形按钮

使用 `circle` 来使用圆形按钮。

<Demo>
 <Circle/>

::: details
<<< @/examples/button/component/Circle.vue
:::
</Demo>

## 透明背景

`Ghost` 按钮有透明的背景。
<Demo>
 <Ghost/>

::: details
<<< @/examples/button/component/Ghost.vue
:::
</Demo>


## 虚线按钮

使用 `dashed` 来使用虚线按钮。
<Demo>
 <Dashed/>

::: details
<<< @/examples/button/component/Dashed.vue
:::
</Demo>


## 文本按钮

使用 `text` 来使用文本按钮。
<Demo>
 <Text/>

::: details
<<< @/examples/button/component/Text.vue
:::
</Demo>

## Loading 按钮

使用 `loading` 来使用 Loading 按钮。
<Demo>
 <Loading/>

::: details
<<< @/examples/button/component/Loading.vue
:::
</Demo>


## 自定义按钮颜色

您可以自定义按钮的颜色。

我们将自动计算按钮处于 `hover` 和 `active` 状态时的颜色
<Demo>
 <Color/>

::: details
<<< @/examples/button/component/Color.vue
:::
</Demo>

## Button API

| 属性名   | Description        | Type      | Default Value |
| -------- | ------------------ | --------- | ------------- |
| type     | 控件类型           | `String`  | "default"     |
| size     | 控件尺寸           | `String`  | "default"     |
| disabled | 是否禁用           | `Boolean` | false         |
| loading  | 是否加载中         | `Boolean` | false         |
| dashed   | 是否虚线边框       | `Boolean` | false         |
| icon     | 图标名称           | `String`  | " "           |
| text     | 是否为纯文本按钮   | `Boolean` | false         |
| ghost    | 是否为幽灵按钮     | `Boolean` | false         |
| round    | 是否为圆角按钮     | `Boolean` | false         |
| circle   | 是否为圆形按钮     | `Boolean` | false         |
| color    | 按钮颜色           | `String`  | " "           |
| full     | 是否占满父容器宽度 | `Boolean` | false         |
