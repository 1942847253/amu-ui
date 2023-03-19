<script setup>
import Basic from './component/Basic.vue'
</script>

# Rotation 轮播图

在有限空间内，循环播放同一类型的图片、文字等内容

## 基础用法

结合使用 `a-rotation` 和 `a-rotation-item` 标签生成一个轮播图。 将展示的内容放在 `a-rotation-item` 标签内。

<div class="example">
 <Basic/>
</div>

<details>
<summary>展开示例代码</summary>

```vue
<template>
    <a-rotation :autoplay="true" :duration="3000" :initial="1" :hasDot="true" dotPositon="center" :hasDirector="true">
        <a-rotation-item v-for="(item, index) in picList" :key="index">
            <img height="300" width="645" :src="item.path" alt="" />
        </a-rotation-item>
    </a-rotation>
</template>

<script lang="ts" setup>
const picList = [
  {
    id: 1,
    path: "http://img.netbian.com/file/2020/0904/7cab180eca805cce596b6870cb4e1379.jpg",
  },
  {
    id: 2,
    path: "https://pic.netbian.com/uploads/allimg/220909/000538-16626531386489.jpg",
  },
  {
    id: 3,
    path: "http://img.netbian.com/file/2021/0821/a49d58bea940c16ea6e5b2b2e159f687.jpg",
  },
];
</script>

```

</details>
