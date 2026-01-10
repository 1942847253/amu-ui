<template>
    <div>
        <AmuTree :data="data" default-expand-all />
    </div>
</template>

<script lang="ts" setup>
import { AmuTree } from 'amu-ui/tree';
import { ref } from 'vue';

const data = [
    {
        label: 'Level one 1',
        children: [
            {
                label: 'Level two 1-1',
                children: [
                    { label: 'Level three 1-1-1' }
                ]
            }
        ]
    },
    {
        label: 'Level one 2',
        children: [
            {
                label: 'Level two 2-1',
                children: [
                    { label: 'Level three 2-1-1' }
                ]
            },
            {
                label: 'Level two 2-2',
                children: [
                    { label: 'Level three 2-2-1' }
                ]
            }
        ]
    },
    {
        label: 'Level one 3',
        children: [
            {
                label: 'Level two 3-1',
                children: [
                    { label: 'Level three 3-1-1' }
                ]
            },
            {
                label: 'Level two 3-2',
                children: [
                    { label: 'Level three 3-2-1' }
                ]
            }
        ]
    }
];
</script>
