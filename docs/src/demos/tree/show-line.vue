<template>
    <AmuTree :data="data" show-line default-expand-all />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AmuTree } from 'amu-ui/tree';

const data = ref([
    {
        label: 'Parent 1',
        children: [
            {
                label: 'Child 1-1',
                children: [
                    { label: 'Grandchild 1-1-1' },
                    { label: 'Grandchild 1-1-2' }
                ]
            },
            { label: 'Child 1-2' }
        ]
    },
    {
        label: 'Parent 2',
        children: [
            { label: 'Child 2-1' },
            { label: 'Child 2-2' }
        ]
    }
]);
</script>
