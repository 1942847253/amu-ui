<template>
  <div class="no-data-tip" @click="getFocus">未找到匹配的内容</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NoDataTip",
  components: {},
  directives: {},
  emits: [],
  setup(props, { emit }) {
    const getFocus = () => {
      const input: HTMLInputElement = document.querySelector(".input")!;
      input.focus();
    };
    return {
      getFocus,
    };
  },
});
</script>

<style lang="scss" scoped>
.no-data-tip {
  height: 100px;
  line-height: 100px;
  text-align: center;
  font-size: 13px;
  font-weight: 500;
  color: #44444466;
}
</style>
