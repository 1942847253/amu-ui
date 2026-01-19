<template>
    <amu-space direction="vertical" fill>
        <amu-card title="Project: Apollo" style="width: 360px">
            <template #extra>
                <amu-button type="text" size="mini">
                    <template #icon>
                        <amu-icon>
                            <IconSettings />
                        </amu-icon>
                    </template>
                    Settings
                </amu-button>
            </template>
            <div class="card-demo-content">
                <p class="description">High-performance commercial-grade component library designed for complex
                    enterprise
                    scenarios.</p>
                <amu-space style="margin-top: 16px">
                    <amu-tag type="primary" size="small">TypeScript</amu-tag>
                    <amu-tag color="green" size="small">Vue 3</amu-tag>
                    <amu-tag color="orange" size="small">Vite</amu-tag>
                </amu-space>
            </div>
        </amu-card>

        <amu-card size="small" title="Quick Task" style="width: 360px">
            <template #extra>
                <amu-tag color="gray" bordered>Draft</amu-tag>
            </template>
            <div class="card-demo-content">
                <p style="margin: 0; color: var(--amu-color-text-default)">Finish the documentation for the Card
                    component.</p>
            </div>
        </amu-card>
    </amu-space>
</template>

<script lang="ts" setup>
import { AmuCard, AmuSpace, AmuButton, AmuTag, AmuIcon } from 'amu-ui'
import { IconSettings } from '@amu-ui/icons';
</script>

<style scoped>
.description {
    margin: 0;
    color: var(--amu-color-text-default);
    line-height: 1.5;
}
</style>
