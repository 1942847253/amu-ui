<template>
  <transition>
    <div class="rotation-item" v-if="selfIndex === currentIndex">
      <slot></slot>
    </div>
  </transition>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  reactive,
  watch,
  toRefs,
} from "vue";
import "./style/index.less";

export default defineComponent({
  name: "ARotationItem",
  setup(props, { emit }) {
    const instance = getCurrentInstance() as any;
    const state = reactive({
      selfIndex: instance?.vnode.key,
      currentIndex: instance.parent.ctx.currentIndex,
    });
    watch(
      () => instance.parent.ctx.currentIndex,
      (val) => {
        state.currentIndex = val;
      }
    );

    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="less" scoped></style>
