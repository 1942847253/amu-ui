<template>
  <span :class="`iconfont icon-${name}`"></span>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import "./style/index.less";
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
