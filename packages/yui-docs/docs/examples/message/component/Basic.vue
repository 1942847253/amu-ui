<template>

    <y-button type="info"  @click="messageInfo">click to show a message</y-button>
</template>

<script lang="ts" setup>
import { YMessage } from '../../../../../y-ui';

const messageInfo = () => {
    YMessage({
        type:'info',
        message: "this is a message."
    })
}
</script>
