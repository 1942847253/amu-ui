<template>
     <AButton @click="showDrawer = true" type="primary">beforeClose</AButton>
  <ADrawer
    direction="right"
    title="Drawer1"
    v-model="showDrawer"
    closeOnClickModal
    :beforeClose="beforeClose"
  >
    <template #default> hello, I am there! </template>
  </ADrawer>
</template>

<script lang="ts" setup>
import {  AMessageBox } from '../../../../../packages/components';
import { ref } from 'vue';

const showDrawer = ref(false)

const beforeClose = (done: () => void) => {
  AMessageBox({
    title: "提示",
    content: "确认关闭当前抽屉吗",
    showCancelBtn: true,
  }).then(() => {
    done();
  });
};
</script>
