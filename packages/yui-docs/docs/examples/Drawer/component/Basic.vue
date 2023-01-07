<template>
  <YButton @click="showDrawer1 = true" type="primary">Open Left</YButton>
  <YButton @click="showDrawer2 = true" type="primary">Open right</YButton>
  <YButton @click="showDrawer3 = true" type="primary">Open top</YButton>
  <YButton @click="showDrawer4 = true" type="primary">Open bottom</YButton>
  <YDrawer
    direction="left"
    title="Drawer1"
    v-model="showDrawer1"
    closeOnClickModal
  >
    <template #default> hello, I am there! </template>
    <!-- <template #footer>
            <YButton @click="onReset">取消</YButton>
            <YButton @click="onSubmit" type="primary">提交订单</YButton>
          </template> -->
  </YDrawer>
  <YDrawer title="Drawer2" v-model="showDrawer2" closeOnClickModal>
    <template #default> hello, I am there! </template>
    <!-- <template #footer>
            <YButton @click="onReset">取消</YButton>
            <YButton @click="onSubmit" type="primary">提交订单</YButton>
          </template> -->
  </YDrawer>
  <YDrawer
    direction="top"
    title="Drawer3"
    v-model="showDrawer3"
    closeOnClickModal
  >
    <template #default> hello, I am there! </template>
  </YDrawer>
  <YDrawer
    direction="bottom"
    title="Drawer4"
    v-model="showDrawer4"
    closeOnClickModal
  >
    <template #default> hello, I am there! </template>
  </YDrawer>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";

const showDrawer1 = ref(false);
const showDrawer2 = ref(false);
const showDrawer3 = ref(false);
const showDrawer4 = ref(false);
</script>
