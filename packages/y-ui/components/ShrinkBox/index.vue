<template>
  <div ref="shrinkRef" class="y-shrink-box">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { onClickOutside } from "@vueuse/core";

export enum EShrinkFlag {
  COLSE = 0,
  OPEN = 1,
}

export default defineComponent({
  name: "YShrinkBox",
  props: {
    shrinkViewSwitch: Function,
    contentClass: String,
  },
  setup(props, { emit }) {
    const shrinkRef = ref<null | HTMLDivElement>(null);
    onMounted(() => {
      initOutClick();
      props.shrinkViewSwitch!(shrinkViewConfigSwitch);
    });

    const initOutClick = () => {
      const target = document.querySelector(`.${props.contentClass}`) as HTMLElement;
      onClickOutside(target, () => {
        shrinkViewConfigSwitch(EShrinkFlag.COLSE);
      });
    };

    const shrinkViewConfigSwitch = (num: number) => {
      shrinkRef.value!.style.transform = `scaleY(${num})`;
    };
    return {
      shrinkRef,
    };
  },
});
</script>

<style lang="scss">
@import "./index.scss";
</style>
