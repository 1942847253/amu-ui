<template>
     <YButton @click="showDrawer = true" type="primary">beforeClose</YButton>
  <YDrawer
    direction="right"
    title="Drawer1"
    v-model="showDrawer"
    closeOnClickModal
    :beforeClose="beforeClose"
  >
    <template #default> hello, I am there! </template>
  </YDrawer>
</template>

<script lang="ts" setup>
import YMessageBox from '../../../../../y-ui/components/MessageBox';
import { ref } from 'vue';

const showDrawer = ref(false)

const beforeClose = (done: () => void) => {
  YMessageBox({
    title: "提示",
    content: "确认关闭当前抽屉吗",
    showCancelBtn: true,
  }).then(() => {
    done();
  });
};
</script>
