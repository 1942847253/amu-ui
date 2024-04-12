<template>
  <div class="vp-raw">
    <a-radio-group class="vp-raw"  v-model="checked1" :options="options1"></a-radio-group>
    <a-radio-group class="vp-raw" v-model="checked2" :options="options2"></a-radio-group>
  </div>

</template>

<script lang="ts" setup>
import { ref } from "vue";

const checked1 = ref(2);
const checked2 = ref(3);

const options1 = ref([
  {
    label: "选项 A",
    value: 1,
  },
  {
    label: "选项 B",
    value: 2,
  },
]);
const options2 = ref([
  {
    label: "选项 C",
    value: 3,
    disabled: true,
  },
  {
    label: "选项 D",
    value: 4,
    disabled: true,
  },
]);
</script>

<style>

</style>
