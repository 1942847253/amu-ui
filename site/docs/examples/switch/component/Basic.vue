<template>
    <a-switch v-model="value"></a-switch>
    <a-switch></a-switch>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(true);
</script>
