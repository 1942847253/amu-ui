<template>
  <div class="rotation">
    <div
      class="inner"
      :style="`height:${contentHeight + 'px'};`"
      @mouseenter="showDirectorFn(true)"
      @mouseleave="showDirectorFn(false)"
    >
      <div ref="slotContent">
        <slot></slot>
      </div>
      <Dot
        :hasDot="hasDot"
        :currentIndex="currentIndex"
        :dotLength="picLength"
        :dotBgColor="dotBgColor"
        :dotPositon="dotPositon"
        @dotClick="dotClick"
      />
      <Director
        :showDirector="hasDirector && showDirector"
        @clickDirector="clickDirector"
      />
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
  ref,
  nextTick,
  provide,
  toRef,
} from "vue";
import Dot from "./component/rotation-dot/rotation-dot.vue";
import Director from "./component/rotation-director/rotation-director.vue";
import "./style/index.less";
import { getStyleAttributeValue } from "@/shared/utils";

export default defineComponent({
  name: "ARotation",
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
      default: 1,
    },
    hasDot: {
      type: Boolean,
      default: true,
    },
    hasDirector: {
      type: Boolean,
      default: true,
    },
    dotPositon: {
      type: String,
      default: "center",
    },
  },
  emits: [],
  setup(props, { emit }) {
    let timer: null | any = null;
    const instance = getCurrentInstance();
    const slotContent = ref<null | HTMLDivElement>(null);
    const state = reactive({
      currentIndex: props.initial - 1,
      picLength: 0,
      contentHeight: 0,
      contentWidth: 0,
      showDirector: false,
    });

    provide("currentIndex", toRef(state, "currentIndex"));

    onMounted(() => {
      nextTick(() => {
        setSlotContentStyle();
        const slots = instance!.slots.default!()[0].children!;
        state.picLength = slots.length as number;
        autoplay();
      });
    });

    const clearReferrer = () => {
      const meta = document.createElement("meta");
      document.head.appendChild(meta);
      meta.setAttribute("name", "referrer");
      meta.setAttribute("content", "no-referrer");
    };

    onBeforeUnmount(() => {
      clearInterval(timer as any);
      timer = null;
    });

    const setSlotContentStyle = () => {
      const slotItem =
        (slotContent.value!.children[0] as HTMLDivElement) || 250;
      state.contentHeight = getStyleAttributeValue(slotItem, "height");
      state.contentWidth = getStyleAttributeValue(slotItem, "width");
    };

    const autoplay = () => {
      clearInterval(timer!);
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
      state.currentIndex = index;
      autoplay();
    };

    const clickDirector = (dir: "next" | "pre") => {
      setPicIndex(dir);
      autoplay();
    };

    const showDirectorFn = (flag: boolean) => {
      if (flag) {
        clearInterval(timer!);
      } else {
        autoplay();
      }
      state.showDirector = flag;
    };

    return {
      showDirectorFn,
      slotContent,
      dotClick,
      clickDirector,
      ...toRefs(state),
    };
  },
});
</script>
