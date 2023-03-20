<template>
  <transition>
    <div class="rotation-item" v-show="selfIndex === currentIndex">
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
  inject,
  Ref,
  ref,
} from "vue";
import "./style/index.less";

export default defineComponent({
  name: "ARotationItem",
  setup() {
    const currentIndex = inject<Ref<number>>("currentIndex", ref(0));
    const instance = getCurrentInstance() as any;
    const state = reactive({
      selfIndex: instance?.vnode.key,
      currentIndex: currentIndex,
    });
    watch(currentIndex, (val) => {
      state.currentIndex = val;
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>

<style lang="less" scoped></style>
