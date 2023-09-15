<script setup>
import Basic from './component/Basic.vue'
import DisabledDivided from './component/Disabled-Divided.vue'
import SplitButton from './component/SplitButton.vue'
import trigger from './component/trigger.vue'
import visible from './component/visible.vue'
import Slot from './component/SplitButton.vue'
</script>

# Dropdown 下拉菜单
将动作或菜单折叠到下拉菜单中。

## 基础用法

悬停在下拉菜单上以展开更多操作。

通过组件 slot 来设置下拉触发的元素以及需要通过具名 `slot` 为 `dropdown` 来设置下拉菜单。 默认情况下，只需要悬停在触发菜单的元素上即可，无需点击也会显示下拉菜单。

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

## 禁用选项与分隔符
给`el-dropdown-item`添加 `disabled`属性可禁用当前选项 ，添加`divided`可显示分隔符

<div class="example">
 <DisabledDivided/>
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

## 触发对象

可使用按钮触发下拉菜单。

设置 `split-button` 属性来让触发下拉元素呈现为按钮组，左边是功能按钮，右边是触发下拉菜单的按钮，设置为 `true` 即可。

<div class="example">
 <SplitButton/>
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

## 触发方式

可以配置点击激活或者悬停激活。

将 `trigger` 属性设置为 click 即可， 默认为 `hover`。

<div class="example">
 <trigger />
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

