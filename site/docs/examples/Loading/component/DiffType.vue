<template>
    <AButton type="success" @click="showLoading">show global loading </AButton>   
     <ALoading v-model="loading" title="please loading..."></ALoading> 
</template>

<script lang="ts" setup>
import { AMessage } from 'amu-ui';
import { ref } from 'vue';

const loading = ref(false)
const showLoading = () => {
    loading.value = true;
    setTimeout(() => {
        loading.value = false
    }, 2000);
};
</script>
