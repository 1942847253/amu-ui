<template>
  <div class="director">
    <span @click="clickDirector('pre')" class="director-left">
      <a>&lt;</a>
    </span>
    <span @click="clickDirector('next')" class="director-right"
      ><a> > </a></span
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from "vue";
export default defineComponent({
  name: "Director",

  emits: ["clickDirector"],
  setup(props, { emit }) {
    const clickDirector = (dir: "pre" | "next") => {
      emit("clickDirector", dir);
    };
    return {
      clickDirector,
    };
  },
});
</script>

<style lang="scss" scoped>
.director {
  cursor: pointer;
  font-size: 20px;
  span {
    background-color: rgba(157, 156, 156, 0.356);
    border-radius: 5px;
    width: 30px;
    height: 30px;
    line-height: 28 px;
    text-align: center;

    a {
      color: #fff;
      font-size: 17px;
      font-weight: 550;
      user-select: none;
    }
  }
  .director-left {
    position: absolute;
    left: 8px;
    top: 45%;
  }
  .director-right {
    position: absolute;
    right: 8px;
    top: 45%;
  }
}
</style>
