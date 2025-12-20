<template>
    <div class="demo-tag">
        <amu-tag type="primary" v-for="(tag, index) in tags" :key="tag" closable @close="handleClose(index)">
            {{ tag }}
        </amu-tag>
        <amu-button size="mini" type="dashed" @click="handleAdd">
            + New Tag
        </amu-button>
    </div>
    <div class="demo-tag" style="margin-top:20px;">
        <amu-tag v-for="(tag, index) in tagsBordered" :key="tag.value" :type="tag.type" bordered closable @close="handleCloseBordered(index)">
            {{ tag.value }}
        </amu-tag>
        <amu-button size="mini" type="dashed" @click="handleAddBordered">
            + New Tag
        </amu-button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuTag, AmuButton } from 'amu-ui'

const tags = ref(['Tag 1', 'Tag 2', 'Tag 3'])
const tagsBordered = ref([{type:'default',value:'Tag 1'}, {type:'primary',value:'Tag 2'}, {type:'success',value:'Tag 3'},{type:'warning',value:'Tag 4'},{type:'danger',value:'Tag 5'}])

const handleClose = (index: number) => {
    tags.value.splice(index, 1)
}

const handleAddBordered = () => {
    tagsBordered.value.push({type:'default',value:`Tag ${tagsBordered.value.length + 1}`})
}

const handleAdd = () => {
    tags.value.push(`Tag ${tags.value.length + 1}`)
}

const handleCloseBordered = (index: number) => {
    tagsBordered.value.splice(index, 1)
}
</script>

<style scoped>
.demo-tag {
    display: flex;
    gap: 10px;
    align-items: center;
    flex-wrap: wrap;
}
</style>
