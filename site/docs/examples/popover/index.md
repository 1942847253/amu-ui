<script setup>
import Basic from './component/Basic.vue'
import visible from './component/visible.vue'
import Slot from './component/slot.vue'
</script>

# Popover 气泡卡片

## 基础用法

`trigger` 属性被用来决定 popover 的触发方式，支持的触发方式： `hover`、`click`

<div class="example">
 <Basic/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <APopover
    title="Title"
    content="this is content, this is content, this is content"
    placement="top"
    trigger="hover"
  >
    <template #reference>
      <a-button type="primary">Hover to activate</a-button>
    </template>
  </APopover>
  <APopover
    title="Title"
    content="this is content, this is content, this is content"
  >
    <template #reference>
      <a-button type="primary">Click to activate</a-button>
    </template>
  </APopover>
</template>
```

</details>

## 受控模式

如果你想手动控制显示与隐藏，可以设置 `visible` 属性。

<div class="example">
 <visible/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <APopover
    :visible="popoverVisible"
    title="Title"
    content="this is content, this is content, this is content"
  >
    <template #reference>
      <a-button @click="popoverVisible = !popoverVisible" type="primary"
        >Manual to activate</a-button
      >
    </template>
  </APopover>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const popoverVisible = ref(false);
</script>
```

</details>

## 内容可扩展

可以在 Popover 中嵌套其它组件， 以下为嵌套表格的例子。

<div class="example">
 <Slot />
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <APopover
    width="400px"
    content="this is content, this is content, this is content"
  >
    <template #reference>
      <a-button type="primary">Click to activate</a-button>
    </template>
    <a-table :tableData="tableData.tBody" :tableColumn="tableData.tHead">
    </a-table>
  </APopover>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const tableData = ref({
  tHead: [
    {
      key: "id",
      text: "学号",
    },
    {
      key: "name",
      text: "姓名",
    },
    {
      key: "age",
      text: "年龄",
    },
    {
      key: "chinese",
      text: "语文",
      editable: false,
    },
    {
      key: "math",
      text: "数学",
      editable: false,
    },
    {
      key: "english",
      text: "英语",
      editable: false,
    },
    // {
    //     key: "operation",
    //     text: "操作",
    // },
  ],
  tBody: [
    {
      id: 1,
      name: "Yjj",
      age: 21,
      chinese: 121,
      math: 90,
      english: 138,
    },
    {
      id: 2,
      name: "嘿毛",
      age: 20,
      chinese: 111,
      math: 32,
      english: 43,
    },
    {
      id: 3,
      name: "big龙",
      age: 19,
      chinese: 44,
      math: 21,
      english: 11,
    },
    {
      id: 4,
      name: "嫖瓜",
      age: 21,
      chinese: 80,
      math: 40,
      english: 45,
    },
  ],
});
</script>
```

</details>

## Slots

| 属性名    | 说明                          |
| --------- | ----------------------------- |
| -         | Popover 内嵌 HTML 文本        |
| reference | 触发 Popover 显示的 HTML 元素 |

## Attributes

| 属性名    | 说明                                               | 类型    | 可选值                        | 默认值 |
| --------- | -------------------------------------------------- | ------- | ----------------------------- | ------ |
| trigger   | 触发方式                                           | string  | click/focus/hover/contextmenu | hover  |
| title     | 标题                                               | string  | —                             | —      |
| content   | 显示的内容，也可以通过写入默认 `slot` 修改显示内容 | string  | —                             | —      |
| width     | 宽度                                               | string  | —                             | 150px  |
| placement | 出现位置                                           | string  | top/left/bottom/right         | bottom |
| visible   | Popover 是否显示                                   | Boolean | —                             | null   |

<style>
  table td {
      width:fit-content
  }
</style>

