<template>
  <div class="no-data-tip">未找到匹配的内容</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NoDataTip",
  components: {},
  directives: {},
  emits: [],
  setup(props, { emit }) {
    return {};
  },
});
</script>

<style lang="less" scoped>
@import './index.less';
</style>
