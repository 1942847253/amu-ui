<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="'#' + name"></use>
  </svg>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import "../../iconfont/font/line/iconfont.js";
import "../../iconfont/font/surface/iconfont.js";
import './style/index.less';
export default defineComponent({
  name: "AIcon",
  props: {
    name: {
      type: String,
      defalut: "amu-amudesign",
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="less" scoped></style>
