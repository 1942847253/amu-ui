<template>
    <div class="y-collapse-content">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'YCollapse',
    emits: [],
    setup() {

        return {}
    }
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>