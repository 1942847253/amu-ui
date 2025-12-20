<template>
    <div class="demo-tag">
        <amu-tag type="primary">
            <template #icon>
               <AmuIcon size="10">
                   <IconBell />
               </AmuIcon>
            </template>
          IconBell  
        </amu-tag>
        <amu-tag type="success">
            <template #icon>
               <AmuIcon size="10">
                   <IconCheckCircle />
               </AmuIcon>   
            </template>
            passed
        </amu-tag>
    </div>
</template>

<script setup lang="ts">
import { AmuTag,AmuIcon } from 'amu-ui'
import { IconBell, IconCheckCircle } from '@amu-ui/icons'
</script>

<style scoped>
.demo-tag {
    display: flex;
    gap: 10px;
}
</style>
