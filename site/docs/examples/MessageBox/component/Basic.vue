<template>
    <a-button type="info"  @click="messageInfo">click to show a message</a-button>
</template>

<script lang="ts" setup>
import { AMessage, AMessageBox } from "amu-ui";

const messageInfo = () => {
    AMessageBox({
        title: "Title",
        content: "This is a message",
        showCancelBtn: false,
    }).then(() => {
        AMessage.message({
            message: "action: confirm",
        });
    });
}
</script>
