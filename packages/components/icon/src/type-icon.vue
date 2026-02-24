<template>
    <AmuIcon v-if="props.icon" :style="{ color: iconColor }" v-bind="$attrs">
        <component :is="icon" :class="iconClass" />
    </AmuIcon>
    <component v-else-if="props.type === 'loading'" :is="typeComponent" v-bind="$attrs" :class="iconClass" :style="{ color: iconColor }" />
    <AmuIcon v-else="typeComponent" :style="{ color: iconColor }" :class="iconClass" v-bind="$attrs">
        <component :is="typeComponent" />
    </AmuIcon>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AmuIcon from './icon.vue'
import { TypeComponentsMap } from '@amu-ui/utils'
import AmuSpinner from '../../spinner'

defineOptions({
    name: 'AmuTypeIcon'
})

const props = defineProps({
    icon: {
        type: [Object, Function, String],
        default: null
    },
    type: {
        type: String,
        default: ''
    }
})

const typeComponent = computed(() => {
    if (props.type === 'loading') {
        return AmuSpinner
    }
    return TypeComponentsMap[props.type as keyof typeof TypeComponentsMap] || null
})

const iconClass = computed(() => {
    return props.type === 'loading' ? 'is-loading' : ''
})

const iconColor = computed(() => {
    switch (props.type) {
        case 'info':
            return 'var(--amu-color-primary)'
        case 'success':
            return 'var(--amu-color-status-success)'
        case 'warning':
            return 'var(--amu-color-status-warning)'
        case 'error':
            return 'var(--amu-color-status-danger)'
        case 'help':
        case 'loading':
            return 'var(--amu-color-primary)'
        default:
            return 'var(--amu-color-text-default)'
    }
})
</script>
