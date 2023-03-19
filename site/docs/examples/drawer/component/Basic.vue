<template>
  <AButton @click="showDrawer1 = true">Open Left</AButton>
  <AButton @click="showDrawer2 = true" type="primary">Open right</AButton>
  <AButton @click="showDrawer3 = true" type="success">Open top</AButton>
  <AButton @click="showDrawer4 = true" type="info">Open bottom</AButton>
  <ADrawer
    direction="left"
    title="Drawer1"
    v-model="showDrawer1"
    closeOnClickModal
  >
    <template #default> hello, I am there! </template>
    <!-- <template #footer>
            <AButton @click="onReset">取消</AButton>
            <AButton @click="onSubmit" type="primary">提交订单</AButton>
          </template> -->
  </ADrawer>
  <ADrawer title="Drawer2" v-model="showDrawer2" closeOnClickModal>
    <template #default> hello, I am there! </template>
    <!-- <template #footer>
            <AButton @click="onReset">取消</AButton>
            <AButton @click="onSubmit" type="primary">提交订单</AButton>
          </template> -->
  </ADrawer>
  <ADrawer
    direction="top"
    title="Drawer3"
    v-model="showDrawer3"
    closeOnClickModal
  >
    <template #default> hello, I am there! </template>
  </ADrawer>
  <ADrawer
    direction="bottom"
    title="Drawer4"
    v-model="showDrawer4"
    closeOnClickModal
  >
    <template #default> hello, I am there! </template>
  </ADrawer>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";

const showDrawer1 = ref(false);
const showDrawer2 = ref(false);
const showDrawer3 = ref(false);
const showDrawer4 = ref(false);
</script>
