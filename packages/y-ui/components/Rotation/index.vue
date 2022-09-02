<template>
  <div class="rotation">
    <div class="inner">
      <slot></slot>
      <Dot :hasDot="hasDot" :currentIndex="currentIndex" :dotLength="picLength" :dotBgColor="dotBgColor"
        @dotClick="dotClick" />
      <Director @clickDirector="clickDirector" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  getCurrentInstance,
  onBeforeUnmount,
  onMounted,
} from "vue";
import Dot from "./Dot/Dot.vue";
import Director from "./Director/Director.vue";

export default defineComponent({
  name: "Rotation",
  components: {
    Dot,
    Director,
  },
  props: {
    dotBgColor: {
      type: String,
    },
    autoplay: {
      type: Boolean,
      default: true,
    },
    duration: {
      type: Number,
      default: 3000,
    },
    initial: {
      type: Number,
      default: 0,
    },
    hasDot: {
      type: Boolean,
      default: true,
    },
    hasDirector: {
      type: Boolean,
      default: true,
    },
  },
  emits: [],
  setup(props, { emit }) {
    let timer: null | any = null;
    const instance = getCurrentInstance();
    const state = reactive({
      currentIndex: props.initial,
      picLength: 0,
    });

    onMounted(() => {
      state.picLength = instance!.slots.default!()[0].children!
        .length as number;
      autoplay();
    });

    onBeforeUnmount(() => {
      clearInterval(timer as any);
      timer = null;
    });

    const autoplay = () => {
      if (props.autoplay) {
        timer = setInterval(() => {
          setPicIndex("next");
        }, props.duration);
      }
    };

    const setPicIndex = (dir: "next" | "pre") => {
      switch (dir) {
        case "next":
          state.currentIndex! += 1;
          if (state.currentIndex === state.picLength) {
            state.currentIndex = 0;
          }
          break;
        case "pre":
          state.currentIndex! -= 1;
          if (state.currentIndex === -1) {
            state.currentIndex = state.picLength - 1;
          }
          break;
        default:
          break;
      }
    };

    const dotClick = (index: number) => {
      clearInterval(timer!);
      state.currentIndex = index;
      autoplay();
    };

    const clickDirector = (dir: "next" | "pre") => {
      clearInterval(timer!);
      setPicIndex(dir);
      autoplay();
    };
    return {
      dotClick,
      clickDirector,
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped>
.rotation {
  width: 100%;
  height: 100%;

  .inner {
    position: relative;
    width: 100%;
    height: calc(100%);
    overflow: hidden;
  }
}
</style>
