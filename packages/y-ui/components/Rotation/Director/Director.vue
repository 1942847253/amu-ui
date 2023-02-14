<template>
  <transition name="fade">
    <div ref="directorRef" class="director" v-show="showDirector">
      <div @click="clickDirector('pre')" class="directorContent director-left">
        <span class="iconfont icon-left"></span>
      </div>
      <div
        @click="clickDirector('next')"
        class="directorContent director-right"
      >
        <span class="iconfont icon-right"></span>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
export default defineComponent({
  name: "Director",
  props: {
    showDirector: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["clickDirector"],
  setup(props, { emit }) {
    const directorRef = ref(null);
    const clickDirector = (dir: "pre" | "next") => {
      emit("clickDirector", dir);
    };

    onMounted(() => {});

    return {
      clickDirector,
      directorRef,
    };
  },
});
</script>

<style lang="less" scoped>
@import "../../../iconfont/iconfont.css";
.director {
  cursor: pointer;
  font-size: 20px;
  span {
    color: rgb(236, 236, 236);
    font-size: 20px;
  }
  .directorContent {
    background-color: rgba(157, 156, 156, 0.556);
    border-radius: 50%;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }
  .director-left {
    position: absolute;
    left: 20px;
    top: 43%;
  }
  .director-right {
    position: absolute;
    right: 20px;
    top: 43%;
  }
}
.fade-enter {
  opacity: 0;
  transition: opacity 0.4s;
}

.fade-leave {
  opacity: 1;
}

.fade-enter-active {
  transition: opacity 0.4s;
}

.fade-leave-active {
  opacity: 0;
  transition: opacity 0.4s;
}
</style>