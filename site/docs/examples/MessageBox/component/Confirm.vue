<template>
  <a-button type="success" @click="showMessageBox">Click to open the Message Box</a-button>
</template>

<script lang="ts" setup>
import { AMessage, AMessageBox } from '../../../../../packages/components';

const showMessageBox = () => {
  AMessageBox({
    title: 'confirm',
    content: 'you will be click the button to close this messagebox, are you ready?',
    showMessageBox: true,
    showCancelBtn: true
  }).then(() => {
    AMessage.message({
      message: "this is a confirm message",
    });
  }).catch(() => {
    AMessage.message({
      message: "action: cancel",
    });
  })

};
</script>

<style>
.a-button {
  margin: 0;
}
</style>
