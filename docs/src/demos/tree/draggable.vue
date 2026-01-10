<template>
    <AmuTree :data="data" draggable default-expand-all @drop="handleDrop" />
</template>

<script lang="ts" setup>
import { AmuTree } from 'amu-ui/tree';
import { ref } from 'vue';

const data = ref([
    {
        key: '1',
        label: 'Root 1',
        children: [
            { key: '1-1', label: 'Child 1-1' },
            { key: '1-2', label: 'Child 1-2' }
        ]
    },
    {
        key: '2',
        label: 'Root 2',
        children: [
            { key: '2-1', label: 'Child 2-1' },
            { key: '2-2', label: 'Child 2-2' }
        ]
    }
]);

const handleDrop = (draggingNode, dropNode, dropType) => {
    console.log('Tree drop: ', dropType, draggingNode.label, dropNode.label);
    // User should implement data change logic here
};
</script>
