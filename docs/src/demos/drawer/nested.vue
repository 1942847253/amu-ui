<template>
    <div>
        <AmuButton type="primary" @click="visible = true">Open Main Drawer</AmuButton>

        <AmuDrawer v-model="visible" title="First Drawer" size="50%">
            <AmuButton type="primary" @click="innerVisible = true">Open Second Drawer</AmuButton>

            <AmuDrawer v-model="innerVisible" title="Second Drawer" :append-to-body="true">
                <p>This is the inner drawer.</p>
            </AmuDrawer>
        </AmuDrawer>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const visible = ref(false)
const innerVisible = ref(false)
</script>
