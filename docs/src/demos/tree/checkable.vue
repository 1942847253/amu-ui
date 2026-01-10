<template>
  <AmuTree 
        :data="data" 
        checkable 
        check-on-click-node
        default-expand-all
        @check="handleCheck"
     />
</template>

<script lang="ts" setup>
import { AmuTree } from 'amu-ui/tree';

const handleCheck = (checkedKeys, { checked, node }) => {
    console.log('check:', checkedKeys, checked, node);
};

const data = [
  {
    label: 'Frameworks',
    children: [
        { label: 'Vue' },
        { label: 'React' },
        { label: 'Angular' }
    ]
  },
  {
    label: 'Languages',
    children: [
        { label: 'TypeScript' },
        { label: 'JavaScript' },
        { label: 'Rust', disabled: true }
    ]
  }
];
</script>
