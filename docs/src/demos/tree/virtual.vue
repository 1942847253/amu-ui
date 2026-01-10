<template>
    <div>
        <div style="margin-bottom: 10px;">
            Generated 10,000 nodes.
        </div>
        <AmuTree :data="data" virtual :height="380" checkable check-on-click-node
            :default-expanded-keys="['0', '0-0', '0-1']" />
    </div>
</template>

<script lang="ts" setup>
import { AmuTree } from 'amu-ui/tree';
import { ref, onMounted } from 'vue';

const data = ref([]);

const generateData = (x = 3, y = 2, z = 1) => {
    const list = [];
    for (let i = 0; i < x; i++) {
        const children = [];
        for (let j = 0; j < y; j++) {
            const grandChildren = [];
            for (let k = 0; k < z; k++) {
                grandChildren.push({
                    key: `${i}-${j}-${k}`,
                    label: `Node ${i}-${j}-${k}`,
                });
            }
            children.push({
                key: `${i}-${j}`,
                label: `Node ${i}-${j}`,
                children: grandChildren
            });
        }
        list.push({
            key: `${i}`,
            label: `Node ${i}`,
            children: children
        });
    }
    return list;
};

// Generate large list
// Flat structure with hierarchy
// Let's make a deep random tree generator or just a predictable large one
// 100 roots * 10 children * 10 grandchildren = 10000 nodes
data.value = generateData(100, 10, 10);

</script>
