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
      <div :style="[{ background: item.background }]" class="img-item">
        <h3>{{ item.id }}</h3>
      </div>
    </ARotationItem>
  </ARotation>
</template>

<script lang="ts" setup>
const picList = [
  {
    id: 1,
    background: "#d3dce6",
  },
  {
    id: 2,
    background: "#99a9bf",
  },
  {
    id: 3,
    background: "#d3dce6",
  },
  {
    id: 4,
    background: "#99a9bf",
  },
];
</script>

<style lang="less" scoped>
.img-item {
  height: 300px;
  width: 648px;
  display: flex;
  align-items: center;
  justify-content: center;
  h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
  }
}
</style>
