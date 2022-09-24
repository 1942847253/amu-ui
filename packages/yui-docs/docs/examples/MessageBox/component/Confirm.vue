<template>
  <y-button type="success" @click="showMessageBox">Click to open the Message Box</y-button>
</template>

<script lang="ts" setup>
import { YMessage, YMessageBox } from '../../../../../y-ui';

const showMessageBox = () => {
  YMessageBox({
    title: 'confirm',
    content: 'you will be click the button to close this messagebox, are you ready?',
    showMessageBox: true,
    showCancelBtn: true
  }).then(() => {
    YMessage.message({
      message: "this is a confirm message",
    });
  }).catch(() => {
    YMessage.message({
      message: "action: cancel",
    });
  })

};
</script>

<style>
.y-button {
  margin: 0;
}
</style>
