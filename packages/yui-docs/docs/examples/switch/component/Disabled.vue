<template>
    <y-switch v-model="value" disabled></y-switch>
    <y-switch disabled></y-switch>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(true);
</script>
