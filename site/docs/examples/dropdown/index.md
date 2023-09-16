<script setup>
import Basic from './component/Basic.vue'
import DisabledDivided from './component/Disabled-Divided.vue'
import SplitButton from './component/SplitButton.vue'
import trigger from './component/trigger.vue'
import HideOnClick from './component/HideOnClick.vue'
import command from './component/command.vue'

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
  <ADropdown>
    <span class="a-dropdown-link">
      Dropdown List
      <span><a-icon name="arrow-down" /></span>
    </span>
    <template #dropdown>
      <a-dropdown-menu>
        <a-dropdown-item command="a" icon="add">Action 1</a-dropdown-item>
        <a-dropdown-item command="b" icon="add-circle"
          >Action 2</a-dropdown-item
        >
        <a-dropdown-item command="c" icon="select-bold"
          >Action 3</a-dropdown-item
        >
        <a-dropdown-item command="d" icon="success-filling"
          >Action 4</a-dropdown-item
        >
        <a-dropdown-item command="e" icon="success">Action 5</a-dropdown-item>
      </a-dropdown-menu>
    </template>
  </ADropdown>
</template>

<style lang="less" scoped>
.a-dropdown-link {
  cursor: pointer;
  color: #0468dc;
  display: flex;
  align-items: center;

  span {
    margin-top: 2px;
    margin-left: 2px;
  }
}
</style>
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
  <div style="display: flex">
    <ADropdown style="margin-right: 40px">
      <span class="a-dropdown-link">
        Disabled List
        <span><a-icon name="arrow-down" /></span>
      </span>
      <template #dropdown>
        <a-dropdown-menu>
          <a-dropdown-item command="a">Action 1</a-dropdown-item>
          <a-dropdown-item command="b" disabled>Action 2</a-dropdown-item>
          <a-dropdown-item command="c">Action 3</a-dropdown-item>
          <a-dropdown-item command="d" disabled>Action 4</a-dropdown-item>
          <a-dropdown-item command="e">Action 5</a-dropdown-item>
        </a-dropdown-menu>
      </template>
    </ADropdown>
    <ADropdown>
      <span class="a-dropdown-link">
        Divided List
        <span><a-icon name="arrow-down" /></span>
      </span>
      <template #dropdown>
        <a-dropdown-menu>
          <a-dropdown-item command="a">Action 1</a-dropdown-item>
          <a-dropdown-item command="b">Action 2</a-dropdown-item>
          <a-dropdown-item command="c">Action 3</a-dropdown-item>
          <a-dropdown-item command="d">Action 4</a-dropdown-item>
          <a-dropdown-item command="e" divided>Action 5</a-dropdown-item>
        </a-dropdown-menu>
      </template>
    </ADropdown>
  </div>
</template>

<style lang="less" scoped>
.a-dropdown-link {
  cursor: pointer;
  color: #0468dc;
  display: flex;
  align-items: center;
  span {
    margin-top: 2px;
    margin-left: 2px;
  }
}
</style>
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
  <div style="display: flex">
    <ADropdown>
      <a-button type="primary">
        Dropdown List <a-icon style="margin-left: 5px;" name="arrow-down"
      /></a-button>
      <template #dropdown>
        <a-dropdown-menu>
          <a-dropdown-item>Action 1</a-dropdown-item>
          <a-dropdown-item>Action 2</a-dropdown-item>
          <a-dropdown-item>Action 3</a-dropdown-item>
          <a-dropdown-item>Action 4</a-dropdown-item>
          <a-dropdown-item>Action 5</a-dropdown-item>
        </a-dropdown-menu>
      </template>
    </ADropdown>
    <ADropdown @click="handleClick" split-button type="primary">
      Dropdown List
      <template #dropdown>
        <a-dropdown-menu>
          <a-dropdown-item>Action 1</a-dropdown-item>
          <a-dropdown-item>Action 2</a-dropdown-item>
          <a-dropdown-item>Action 3</a-dropdown-item>
          <a-dropdown-item>Action 4</a-dropdown-item>
          <a-dropdown-item>Action 5</a-dropdown-item>
        </a-dropdown-menu>
      </template>
    </ADropdown>
  </div>
</template>

<script setup lang="ts">
const handleClick = () => {
  alert("button click");
};
</script>

<style lang="less" scoped>
.a-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;

  span {
    margin-top: 2px;
    margin-left: 2px;
  }
}
</style>
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
  <div style="display: flex; align-items: center;">
    <div style="margin-right: 100px;">
      <span class="demonstration">hover to trigger</span>
      <a-dropdown>
        <span class="a-dropdown-link">
          Dropdown List
          <span><a-icon name="arrow-down" /></span>
        </span>
        <template #dropdown>
          <a-dropdown-menu>
            <a-dropdown-item command="a" icon="add">Action 1</a-dropdown-item>
            <a-dropdown-item command="b" icon="add-circle"
              >Action 2</a-dropdown-item
            >
            <a-dropdown-item command="c" icon="select-bold"
              >Action 3</a-dropdown-item
            >
            <a-dropdown-item command="d" icon="success-filling"
              >Action 4</a-dropdown-item
            >
            <a-dropdown-item command="e" icon="success"
              >Action 5</a-dropdown-item
            >
          </a-dropdown-menu>
        </template>
      </a-dropdown>
    </div>
    <div>
      <span class="demonstration">click to trigger</span>
      <a-dropdown trigger="click">
        <span class="a-dropdown-link">
          Dropdown List
          <span><a-icon name="arrow-down" /></span>
        </span>
        <template #dropdown>
          <a-dropdown-menu>
            <a-dropdown-item command="a" icon="add">Action 1</a-dropdown-item>
            <a-dropdown-item command="b" icon="add-circle"
              >Action 2</a-dropdown-item
            >
            <a-dropdown-item command="c" icon="select-bold"
              >Action 3</a-dropdown-item
            >
            <a-dropdown-item command="d" icon="success-filling"
              >Action 4</a-dropdown-item
            >
            <a-dropdown-item command="e" icon="success"
              >Action 5</a-dropdown-item
            >
          </a-dropdown-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
.demonstration {
  display: block;
  color: #909399;
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
```

</details>

## 菜单隐藏方式

可以通过 `hide-on-click` 属性来配置。

下拉菜单默认在点击菜单项后会被隐藏，将 `hide-on-click` 属性设置为 `false` 可以关闭此功能。

<div class="example">
 <HideOnClick />
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <ADropdown :hide-on-click="false">
    <span class="a-dropdown-link">
      Dropdown List
      <span><a-icon name="arrow-down" /></span>
    </span>
    <template #dropdown>
      <a-dropdown-menu>
        <a-dropdown-item command="a" icon="add">Action 1</a-dropdown-item>
        <a-dropdown-item disabled command="b" icon="add-circle"
          >Action 2</a-dropdown-item
        >
        <a-dropdown-item command="c" icon="select-bold"
          >Action 3</a-dropdown-item
        >
        <a-dropdown-item command="d" icon="success-filling" disabled
          >Action 4</a-dropdown-item
        >
        <a-dropdown-item command="e" icon="success">Action 5</a-dropdown-item>
      </a-dropdown-menu>
    </template>
  </ADropdown>
</template>

<style lang="less" scoped>
.a-dropdown-link {
  cursor: pointer;
  color: #0468dc;
  display: flex;
  align-items: center;
  span {
    margin-top: 2px;
    margin-left: 2px;
  }
}
</style>
```

</details>

## 指令事件

点击菜单项后会触发事件，用户可以通过相应的菜单项 key 进行不同的操作。

<div class="example">
 <command />
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <ADropdown @command="dropdownCommand">
    <span class="a-dropdown-link">
      Dropdown List
      <span><a-icon name="arrow-down" /></span>
    </span>
    <template #dropdown>
      <a-dropdown-menu>
        <a-dropdown-item command="a" icon="add">Action 1</a-dropdown-item>
        <a-dropdown-item disabled command="b" icon="add-circle"
          >Action 2</a-dropdown-item
        >
        <a-dropdown-item command="c" icon="select-bold"
          >Action 3</a-dropdown-item
        >
        <a-dropdown-item command="d" icon="success-filling"
          >Action 4</a-dropdown-item
        >
        <a-dropdown-item command="e" icon="success">Action 5</a-dropdown-item>
      </a-dropdown-menu>
    </template>
  </ADropdown>
</template>

<script lang="ts" setup>
import { AMessage } from "../../../../../packages/amu-ui";
const dropdownCommand = (command) => {
  AMessage.message({ message: `click on item ${command}` });
};
</script>

<style lang="less" scoped>
.a-dropdown-link {
  cursor: pointer;
  color: #0468dc;
  display: flex;
  align-items: center;

  span {
    margin-top: 2px;
    margin-left: 2px;
  }
}
</style>
```

</details>

## Dropdown Attributes#

| 属性名        | 说明                                                                       | 类型    | 可选值                | 默认值 |
| ------------- | -------------------------------------------------------------------------- | ------- | --------------------- | ------ |
| trigger       | 触发方式                                                                   | string  | click/hover           | hover  |
| hide-on-click | 是否在点击菜单项后隐藏菜单                                                 | boolean | —                     | true   |
| split-button  | 下拉触发元素呈现为按钮组                                                   | boolean | —                     | false  |
| type          | 菜单按钮类型，同 Button 组件一样，仅在 split-button 为 true 的情况下有效。 | string  | —                     | -      |
| placement     | 出现位置                                                                   | string  | top/left/bottom/right | bottom |

## Dropdown 插槽

| 属性名   | 说明                                                                                                             |
| -------- | ---------------------------------------------------------------------------------------------------------------- |
| -        | 下拉菜单的内容。 `注意：必须是有效的 html DOM 元素（例如 <span>、<button> 等）或 el-component，以附加监听触发器` |
| dropdown | 下拉列表，通常是 `<el-dropdown-menu>` 组件                                                                       |

## Dropdown Events

| 事件名  | 说明                                            | 参数                 |
| ------- | ----------------------------------------------- | -------------------- |
| click   | `split-button` 为 `true` 时，点击左侧按钮的回调 | —                    |
| command | 点击菜单项触发的事件回调                        | dropdown-item 的指令 |

## Dropdown-Menu Slots

| 插槽名 | 说明           | 子标签        |
| ------ | -------------- | ------------- |
| —      | 下拉菜单的内容 | Dropdown-Item |

## Dropdown-Item Attributes

| 属性名   | 说明                                | 类型                 | 可选值 | 默认值 |
| -------- | ----------------------------------- | -------------------- | ------ | ------ |
| command  | 派发到 `command` 回调函数的指令参数 | string/number/object | —      | —      |
| disabled | 是否禁用                            | boolean              | —      | false  |
| divided  | 是否显示分隔符                      | boolean              | —      | false  |
| icon     | 自定义图标                          | string               | —      | —      |

<style>
  table td {
      width:fit-content
  }
</style>
