<template>
    <y-button type="info"  @click="messageInfo">click to show a message</y-button>
</template>

<script lang="ts" setup>
import { YMessage, YMessageBox } from '../../../../../y-ui';

const messageInfo = () => {
    YMessageBox({
        title: "Title",
        content: "This is a message",
        showCancelBtn: false,
    }).then(() => {
        YMessage.message({
            message: "action: confirm",
        });
    });
}
</script>
