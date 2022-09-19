<template>
    <y-switch size="large" v-model="value" open-title="是" off-title="否" :disabled="true"></y-switch>
    <y-switch v-model="value" open-title="开" off-title="关"></y-switch>
    <y-switch size="small" v-model="value" open-title="上" off-title="下"></y-switch>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const value = ref(true);
</script>
