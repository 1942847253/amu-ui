<!-- button.vue -->
<template>
    <button :disabled="props.disabled"
        :class="`${props.disabled && 'y-button-disabled'} ${!props.disabled && 'y-button'} ${!props.disabled && getButtonType(props.type)} ${getButtonSize(props.size)}`">
        <span>
            <slot></slot>
        </span>
    </button>
</template>

<script lang="ts" setup>
import './style/index.less'
import { defineComponent, computed } from 'vue'
import { buttonProps } from './types'

const props = defineProps(buttonProps)
const getButtonType = (type: string | undefined) => {
    switch (type) {
        case 'primary':
            return 'button-primary'
        case 'success':
            return 'button-success'
        case 'danger':
            return 'button-danger'
        case 'warning':
            return 'button-warning'
        case 'info':
            return 'button-info'
        default:
            return ''
    }
}


const getButtonSize = (size: string | undefined) => {
    switch (size) {
        case 'small':
            return 'size-small'
        case 'default':
            return 'size-default'
        case 'large':
            return 'size-large'
        default:
            return 'size-default'
    }
}
</script>
