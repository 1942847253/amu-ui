<template>
    <AButton type="success" @click="showSuccess">show success </AButton>
    <AButton type="info" @click="showMessage">show   Info  </AButton>
    <AButton type="danger" @click="showError">show  error </AButton>
   
    <AButton type="warning" @click="showWarning">show warning </AButton>
    
</template>

<script lang="ts" setup>
import { AMessage } from 'amu-ui';

const showError = () => {
    AMessage.error({
        message: "Display an error message when you click the button",
    });
};

const showSuccess = () => {
    AMessage.success({
        message: "Display an success message when you click the button",
    });
};

const showWarning = () => {
    AMessage.warning({
        message: "this is a warning message",
    });
};

const showMessage = () => {
    AMessage.message({
        message: "this is a info message",
    });
};
</script>
