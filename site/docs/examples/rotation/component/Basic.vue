<template>
  <ARotation
    :autoplay="false"
    :duration="3000"
    :initial="1"
    :hasDot="true"
    dotPositon="center"
    :hasDirector="true"
  >
    <ARotationItem v-for="(item, index) in picList" :key="index">
      <img
        style="height: 360px"
        height="360"
        width="726"
        :src="item.path"
        alt=""
      />
    </ARotationItem>
  </ARotation>
</template>

<script lang="ts" setup>
const picList = [
  {
    id: 1,
    path: "https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg",
  },
  {
    id: 2,
    path: "https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg",
  },
  {
    id: 3,
    path: "https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg",
  },
  {
    id: 4,
    path: "https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg",
  },
];
</script>

<style scoped>
img {
}
</style>
