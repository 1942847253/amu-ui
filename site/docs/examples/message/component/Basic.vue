<template>
    <a-button type="info"  @click="messageInfo">click to show a message</a-button>
</template>

<script lang="ts" setup>
import { AMessage } from 'amu-ui';

const messageInfo = () => {
    AMessage.message({
        message:'this is a info message'
    })
}
</script>
