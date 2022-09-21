<template>
    <y-rotation :autoplay="true" :duration="3000" :initial="1" :hasDot="true" dotPositon="center" :hasDirector="true">
        <y-rotation-item v-for="(item, index) in picList" :key="index">
            <img height="300" width="645" :src="item.path" alt="" />
        </y-rotation-item>
    </y-rotation>
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
