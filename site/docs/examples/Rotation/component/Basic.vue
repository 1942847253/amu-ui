<template>
  <ARotation
    :autoplay="true"
    :duration="3000"
    :initial="1"
    :hasDot="true"
    dotPositon="center"
    :hasDirector="true"
  >
    <ARotationItem v-for="(item, index) in picList" :key="index">
      <img  height="360" width="726" :src="item.path" alt="" />
    </ARotationItem>
  </ARotation>
</template>

<script lang="ts" setup>
const picList = [
   {
    id: 1,
    path: "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/a7f4917c0a8eb1dc952baa2f0a75e509.jpg?w=2452&h=920",
  },
  {
    id: 2,
    path: "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/cc04061612b77ff4112c399ce461dc58.jpg?thumb=1&w=2452&h=920&f=webp&q=90",
  },
  {
    id: 3,
    path: "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/cc7066c191db41583516f8b49c78c503.jpg?thumb=1&w=2452&h=920&f=webp&q=90",
  },
];
</script>
