<template>
  <div class="y-icon">☆</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import "./style/index.less";

export default defineComponent({
  name: "AIcon",
  props: {
    type:{
      type:String,
    }
  },
  setup(props) {
    return {
     
    };
  },
});
</script>
