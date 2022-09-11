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
export default defineComponent({
  name: "RotationItem",
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

<style lang="scss" scoped>
.rotation-item {
  position: absolute;
  top: 0;
  left: 0;
  width: max-content;
  user-select: none;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease-in-out;
}

.v-enter-active {
  transform: translateX(100%);
}

.v-enter-to {
  transform: translateX(0);
}

.v-leave-active {
  transform: translateX(0);
}

.v-leave-to {
  transform: translateX(-100%);
}
</style>