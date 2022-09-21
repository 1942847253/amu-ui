<template>
    <YButton type="success" @click="showSuccess">show success </YButton>
    <YButton type="info" @click="showMessage">show   Info  </YButton>
    <YButton type="danger" @click="showError">show  error </YButton>
   
    <YButton type="warning" @click="showWarning">show warning </YButton>
    
</template>

<script lang="ts" setup>
import { YMessage } from '../../../../../y-ui';

const showError = () => {
    YMessage.error({
        message: "Display an error message when you click the button",
    });
};

const showSuccess = () => {
    YMessage.success({
        message: "Display an success message when you click the button",
    });
};

const showWarning = () => {
    YMessage.warning({
        message: "this is a warning message",
    });
};

const showMessage = () => {
    YMessage.message({
        message: "this is a info message",
    });
};
</script>
