<template>
  <div class="no-data-tip">未找到匹配的内容</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import './style/index.less';

export default defineComponent({
  name: "DataTip",
  components: {},
  directives: {},
  emits: [],
  setup(props, { emit }) {
    return {};
  },
});
</script>
