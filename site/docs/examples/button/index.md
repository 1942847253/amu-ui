<script setup>
import Basic from './component/Basic.vue'
import Ghost from './component/Ghost.vue'
import Dashed from './component/Dashed.vue'
import Text from './component/Text.vue'
import Loading from './component/Loading.vue'
import Circle from './component/Circle.vue'
import Round from './component/Round.vue'
import Color from './component/Color.vue'
Color
</script>

# Button 按钮

常用的操作按钮。

## 基础用法

按钮的 `type` 分别为 `default`、`primary`、`info`、`success`、`warning` 和 `error`。

<div class="example">
 <Basic/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <ASpace>
    <AButton>Default</AButton>
    <AButton type="primary"> Primary</AButton>
    <AButton type="success"> Success</AButton>
    <AButton type="error">Error</AButton>
    <AButton type="warning">Warning</AButton>
    <AButton type="info">Info</AButton>
  </ASpace>
</template>
```

</details>

## 圆角按钮

使用 `round` 来使用圆形按钮。

<div class="example">
 <Round/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <ASpace>
    <AButton round>Default</AButton>
    <AButton round type="primary"> Primary</AButton>
    <AButton round type="success"> Success</AButton>
    <AButton round type="error">Error</AButton>
    <AButton round type="warning">Warning</AButton>
    <AButton round type="info">Info</AButton>
  </ASpace>
  <p></p>
  <ASpace>
    <AButton disabled round>Default</AButton>
    <AButton disabled round type="primary"> Primary</AButton>
    <AButton disabled round type="success"> Success</AButton>
    <AButton disabled round type="error">Error</AButton>
    <AButton disabled round type="warning">Warning</AButton>
    <AButton disabled round type="info">Info</AButton>
  </ASpace>
</template>
```

</details>

## 圆形按钮

使用 `circle` 来使用圆形按钮。

<div class="example">
 <Circle/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <ASpace>
    <AButton circle>
      <a-icon name="operation"></a-icon>
    </AButton>
    <AButton type="primary" circle>
      <a-icon name="upload"></a-icon>
    </AButton>
    <AButton type="success" circle>
      <a-icon name="good"></a-icon>
    </AButton>
    <AButton type="error" circle>
      <a-icon name="unlock" />
    </AButton>
    <AButton type="warning" circle><a-icon name="warning" /></AButton>
    <AButton type="info" circle><a-icon name="notification" /></AButton>
  </ASpace>
  <p></p>
  <ASpace>
    <AButton disabled circle>
      <a-icon name="operation"></a-icon>
    </AButton>
    <AButton disabled type="primary" circle>
      <a-icon name="upload"></a-icon>
    </AButton>
    <AButton disabled type="success" circle>
      <a-icon name="good"></a-icon>
    </AButton>
    <AButton disabled type="error" circle>
      <a-icon name="unlock" />
    </AButton>
    <AButton disabled type="warning" circle><a-icon name="warning" /></AButton>
    <AButton disabled type="info" circle
      ><a-icon name="notification"
    /></AButton>
  </ASpace>
</template>
```

</details>

## 透明背景

`Ghost` 按钮有透明的背景。

<div class="example">
 <Ghost/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <ASpace>
    <AButton>Default</AButton>
    <AButton ghost type="primary"> Primary</AButton>
    <AButton ghost type="success"> Success</AButton>
    <AButton ghost type="error">Error</AButton>
    <AButton ghost type="warning">Warning</AButton>
    <AButton ghost type="info">Info</AButton>
  </ASpace>
  <p />
  <ASpace>
    <AButton disabled>Default</AButton>
    <AButton ghost disabled type="primary"> Primary</AButton>
    <AButton ghost disabled type="success"> Success</AButton>
    <AButton ghost disabled type="error">Error</AButton>
    <AButton ghost disabled type="warning">Warning</AButton>
    <AButton ghost disabled type="info">Info</AButton>
  </ASpace>
</template>
```

</details>

## 虚线按钮

使用 `dashed` 来使用虚线按钮。

<div class="example">
 <Dashed/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <ASpace>
    <AButton>Default</AButton>
    <AButton dashed type="primary"> Primary</AButton>
    <AButton dashed type="success"> Success</AButton>
    <AButton dashed type="error">Error</AButton>
    <AButton dashed type="warning">Warning</AButton>
    <AButton dashed type="info">Info</AButton>
  </ASpace>
  <p />
  <ASpace>
    <AButton disabled>Default</AButton>
    <AButton dashed disabled type="primary"> Primary</AButton>
    <AButton dashed disabled type="success"> Success</AButton>
    <AButton dashed disabled type="error">Error</AButton>
    <AButton dashed disabled type="warning">Warning</AButton>
    <AButton dashed disabled type="info">Info</AButton>
  </ASpace>
</template>
```

</details>

## 文本按钮

使用 `text` 来使用文本按钮。

<div class="example">
 <Text/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <ASpace>
    <AButton type="info" text icon="operation">点击此处查看详情</AButton>
    <AButton type="error" text icon="ashbin">点击删除所有内容</AButton>
  </ASpace>
  <p />
  <ASpace>
    <AButton disabled type="info" text icon="operation"
      >点击此处查看详情</AButton
    >
    <AButton disabled type="error" text icon="ashbin">点击删除所有内容</AButton>
  </ASpace>
</template>
```

</details>

## Loading 按钮

使用 `loading` 来使用 Loading 按钮。

<div class="example">
 <Loading/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <ASpace>
    <AButton loading>Default</AButton>
    <AButton loading type="primary"> Primary</AButton>
    <AButton loading type="success"> Success</AButton>
    <AButton loading type="error">Error</AButton>
    <AButton loading type="warning">Warning</AButton>
    <AButton loading type="info">Info</AButton>
  </ASpace>
  <p></p>
  <ASpace>
    <AButton disabled loading>Default</AButton>
    <AButton disabled loading type="primary"> Primary</AButton>
    <AButton disabled loading type="success"> Success</AButton>
    <AButton disabled loading type="error">Error</AButton>
    <AButton disabled loading type="warning">Warning</AButton>
    <AButton disabled loading type="info">Info</AButton>
  </ASpace>
</template>
```

</details>

## 自定义按钮颜色

您可以自定义按钮的颜色。

我们将自动计算按钮处于 `hover` 和 `active` 状态时的颜色

<div class="example">
 <Color/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <ASpace>
    <AButton color="hotpink"> Hotpink </AButton>
    <AButton color="#7200da"> #7200da</AButton>
    <AButton color="hotpink" ghost> Hotpink </AButton>
    <AButton color="#7200da" ghost> #7200da</AButton>
  </ASpace>
  <p />
  <ASpace>
    <AButton disabled color="hotpink"> Hotpink </AButton>
    <AButton disabled color="#7200da"> #7200da</AButton>
    <AButton disabled color="hotpink" ghost> Hotpink </AButton>
    <AButton disabled color="#7200da" ghost> #7200da</AButton>
  </ASpace>
</template>
```

</details>

## Button API

| 属性名   | Description        | Type      | Default Value |
| -------- | ------------------ | --------- | ------------- |
| type     | 控件类型           | `String`  | "default"     |
| size     | 控件尺寸           | `String`  | "default"     |
| disabled | 是否禁用           | `Boolean` | false         |
| loading  | 是否加载中         | `Boolean` | false         |
| dashed   | 是否虚线边框       | `Boolean` | false         |
| icon     | 图标名称           | `String`  | " "            |
| text     | 是否为纯文本按钮   | `Boolean` | false         |
| ghost    | 是否为幽灵按钮     | `Boolean` | false         |
| round    | 是否为圆角按钮     | `Boolean` | false         |
| circle   | 是否为圆形按钮     | `Boolean` | false         |
| color    | 按钮颜色           | `String`  | " "            |
| full     | 是否占满父容器宽度 | `Boolean` | false         |
