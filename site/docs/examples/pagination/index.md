<script setup>
import Basic from './component/Basic.vue'
import Background from './component/Background.vue'
import ShowSizeChanger from './component/ShowSizeChanger.vue'
import AppointPage from './component/AppointPage.vue'

</script>

# Pagination 分页
当数据量过多时，使用分页分解数据。

## 基础用法
` total `表示总条目数，` size `用于设置每页显示的页码数量
<div class="example">
 <Basic/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
   <a-pagination total="50" :current-page="currentPage" @page-change="pageChange"/>
</template>

<script setup>
import { ref } from 'vue';
const currentPage = ref(1)
const pageChange = (page)=>{
    currentPage.value = page
}
</script>
```

</details>

## 带有背景色的分页

设置` background `属性可以为分页按钮添加背景色。

<div class="example">
 <Background />
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
    <a-pagination total="50" :current-page="currentPage" @page-change="pageChange" background/>
 </template>
 
 <script setup>
 import { ref } from 'vue';
 const currentPage = ref(1)
 const pageChange = (page)=>{
     currentPage.value = page
 }
 </script>
 
```

</details>



## 更改每页显示条目个数
设置` showSizeChanger `为true可以更改每页显示条目个数
<div class="example">
 <ShowSizeChanger />
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
    <a-pagination total="500" :current-page="currentPage" @page-change="pageChange" background  showSizeChanger/>
 </template>
 <script setup>
 
 import { ref } from 'vue';
 const currentPage = ref(1)
 const pageChange = (page)=>{
     currentPage.value = page
 }
 </script>
 
```
</details>

## 跳转至指定页码
设置` showQuickJumper `为true可以跳转至指定页码
<div class="example">
 <AppointPage />
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
    <a-pagination total="1000" :current-page="currentPage" @page-change="pageChange" background  showSizeChanger showQuickJumper/>
 </template>

 <script setup>
 import { ref } from 'vue';
 const currentPage = ref(1)
 const pageChange = (page)=>{
     currentPage.value = page
 }
 </script>
```
</details>

