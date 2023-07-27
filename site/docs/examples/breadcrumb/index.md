

<script setup>
import Basic from './component/Basic.vue'
import Flag from './component/Flag.vue'
import Icon from './component/Icon.vue'
</script>

# Breadcrumb面包屑

显示当前页面在系统层级结构中的位置，并能向上返回。

## 基础用法

<div class="example">
 <Basic/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <ABreadcrumb>
    <ABreadcrumbItem path="/Application">
      home
    </ABreadcrumbItem>
    <ABreadcrumbItem path="/Application/list">
      Application List
    </ABreadcrumbItem>
    <ABreadcrumbItem path="/Application/list/item">
      Application
    </ABreadcrumbItem>
  </ABreadcrumb>
</template>

```
</details>

## 自定义分隔符

你可以使用 `flag` 属性来自定义分隔符

<div class="example">
 <Flag/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <ABreadcrumb flag=">">
    <ABreadcrumbItem path="/Application"> home </ABreadcrumbItem>
    <ABreadcrumbItem path="/Application/list">
      Application List
    </ABreadcrumbItem>
    <ABreadcrumbItem path="/Application/list/item">
      Application
    </ABreadcrumbItem>
  </ABreadcrumb>
</template>
```

</details>

## 自定义Icon
<div class="example">
 <Icon/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
  <ABreadcrumb flag=">">
    <ABreadcrumbItem path="/Application"> home </ABreadcrumbItem>
    <ABreadcrumbItem path="/Application/list">
      Application List
    </ABreadcrumbItem>
    <ABreadcrumbItem path="/Application/list/item">
      Application
    </ABreadcrumbItem>
  </ABreadcrumb>
</template>
```

</details>