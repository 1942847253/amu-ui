<template>
    <AmuTree :data="data" default-expand-all>
        <template #icon="{ node, expanded }">
            <AmuIcon v-if="!node.isLeaf">
                <IconFolderOpen v-if="expanded" style="color: #409eff" />
                <IconFolder v-else style="color: #409eff" />
            </AmuIcon>
            <AmuIcon v-else>
                <IconDocument />
            </AmuIcon>
        </template>
    </AmuTree>
</template>

<script setup lang="ts">
import { ref, defineComponent, h } from 'vue';
import { AmuTree } from 'amu-ui/tree';
import { AmuIcon } from 'amu-ui/icon';

// Mock Icons using simple SVGs for demo
const IconFolder = defineComponent({ render: () => h('svg', { viewBox: '0 0 1024 1024', width: '1em', height: '1em' }, [h('path', { fill: 'currentColor', d: 'M880 298.4H521L403.7 186.2l-1.5-1.4c-1.7-2-4.2-3.2-6.9-3.2H144c-17.7 0-32 14.3-32 32v596c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V330.4c0-17.7-14.3-32-32-32z' })]) });
const IconFolderOpen = defineComponent({ render: () => h('svg', { viewBox: '0 0 1024 1024', width: '1em', height: '1em' }, [h('path', { fill: 'currentColor', d: 'M928 444H820V330.4c0-17.7-14.3-32-32-32H473L355.7 186.2l-1.5-1.4c-1.7-2-4.2-3.2-6.9-3.2H144c-17.7 0-32 14.3-32 32v600c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V508h112c17.7 0 32-14.3 32-32v-32c0-17.7-14.3-32-32-32zM184 256h165l117 112h318v76H242.4c-14.1 0-26.6 9.6-30.8 23.6L144 766V256z' })]) });
const IconDocument = defineComponent({ render: () => h('svg', { viewBox: '0 0 1024 1024', width: '1em', height: '1em' }, [h('path', { fill: 'currentColor', d: 'M854.6 288.7L639.4 73.4c-6-6-14.2-9.4-22.7-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.6-9.4-22.6zM790.2 326H602V137.8L790.2 326z' })]) });

const data = ref([
    {
        label: 'Documents',
        children: [
            { label: 'Work', children: [{ label: 'Report.doc' }, { label: 'Budget.xls' }] },
            { label: 'Private', children: [{ label: 'Photos' }] }
        ]
    },
    {
        label: 'Downloads',
        children: [{ label: 'Installer.exe' }]
    }
]);
</script>
