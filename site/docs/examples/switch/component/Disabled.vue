<template>
    <a-switch v-model="value" disabled></a-switch>
    <a-switch disabled></a-switch>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(true);
</script>
