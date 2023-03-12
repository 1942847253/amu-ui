<template>
  <div
    :style="`padding-right:${closeable ? '20px' : '9px'};`"
    v-if="!Closeable"
    :class="`tag ${getTagType(type)}`"
  >
    <slot></slot>
    <div
      v-if="closeable"
      :class="`close-content ${mouseEnter && `close-${type}`}`"
      @mouseleave="mouseEnter = false"
      @mouseenter="mouseEnter = true"
    >
      <span
        class="iconfont icon-close"
        v-if="closeable"
        @click.stop="closeTag"
      ></span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import "./style/index.less";

export default defineComponent({
  name: "ATag",
  props: {
    type: {
      type: String,
      default: "default",
    },
    closeable: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["closeEvent"],
  setup(props, { emit }) {
    const Closeable = ref<boolean>(false);
    const mouseEnter = ref<boolean>(false);
    const closeTag = () => {
      emit("closeEvent");
      Closeable.value = true;
    };
    const getTagType = (type: string) => {
      switch (type) {
        case "success":
          return "tag-success";
        case "info":
          return "tag-info";
        case "danger":
          return "tag-danger";
        case "warning":
          return "tag-warning";
        default:
          return "tag-default";
      }
    };

    return {
      mouseEnter,
      closeTag,
      getTagType,
      Closeable,
    };
  },
});
</script>
