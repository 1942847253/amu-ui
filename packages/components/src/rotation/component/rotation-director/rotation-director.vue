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
import './style/index.less'
export default defineComponent({
  name: "ADirector",
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