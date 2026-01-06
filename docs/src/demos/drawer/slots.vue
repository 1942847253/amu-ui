<template>
    <div>
        <AmuButton type="primary" @click="visible = true">Open Drawer with Footer</AmuButton>
        <AmuDrawer v-model="visible" show-footer>
            <template #header>
                <h4>Custom Header</h4>
            </template>

            <p>Content...</p>

            <template #footer>
                <AmuSpace>
                    <AmuButton @click="visible = false">Cancel</AmuButton>
                    <AmuButton type="primary" @click="visible = false">Confirm</AmuButton>
                </AmuSpace>
            </template>
        </AmuDrawer>
    </div>
</template>

<script lang="ts" setup>
import { AmuSpace } from 'amu-ui';
import { ref } from 'vue'

const visible = ref(false)
</script>
