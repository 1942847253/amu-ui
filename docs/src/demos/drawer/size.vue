<template>
    <div>
        <AmuSpace>
            <AmuButton type="primary" @click="openDrawer">Open Custom Size Drawer (50%)</AmuButton>
            <AmuButton type="primary" @click="openResizableDrawer">Open Resizable Drawer</AmuButton>
        </AmuSpace>

        <AmuDrawer v-model="visible" title="Custom Size (50%)" size="50%">
            <p>This drawer is 50% width.</p>
        </AmuDrawer>

        <AmuDrawer v-model="visibleResizable" title="Resizable Drawer" :resizable="true" :min-size="300"
            :max-size="800">
            <p>Try to drag the left border of this drawer.</p>
        </AmuDrawer>
    </div>
</template>

<script lang="ts" setup>
import { AmuSpace } from 'amu-ui'
import { ref } from 'vue'

const visible = ref(false)
const visibleResizable = ref(false)

const openDrawer = () => {
    visible.value = true
}

const openResizableDrawer = () => {
    visibleResizable.value = true
}
</script>
