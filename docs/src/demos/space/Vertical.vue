<template>
    <AmuSpace direction="vertical">
        <AmuButton>Default</AmuButton>
        <AmuButton type="primary">Primary</AmuButton>
        <AmuButton status="danger">Error</AmuButton>
        <AmuButton status="warning">Warning</AmuButton>
        <AmuButton status='success'>Info</AmuButton>
    </AmuSpace>
</template>

<script setup lang="ts">
import { AmuButton, AmuSpace } from 'amu-ui'
</script>
