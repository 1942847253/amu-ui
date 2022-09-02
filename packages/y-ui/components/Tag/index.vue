<template>
    <div v-if="!closeable" :class="`tag ${getTagType(props.type)}`">
        <slot></slot>
        <span v-if="props.closeable" @click.stop="closeTag">X</span>
    </div>

</template>

<script lang="ts" setup>import { ref } from 'vue';

const props = defineProps({
    type: {
        type: String,
        default: () => ''
    },
    closeable: {
        type: Boolean,
        default: () => false
    }


})

const emit = defineEmits(['closeEvent'])
const closeable = ref<boolean>(false)
const closeTag = () => {

    emit('closeEvent');
    closeable.value = true
}
const getTagType = (type) => {
    switch (type) {
        case 'success':
            return 'tag-success'
        case 'processing':
            return 'tag-processing'
        case 'error':
            return 'tag-error'
        case 'warning':
            return 'tag-warning'
        default:
            return 'tag-default'
    }
}

</script>

<style lang="scss" scoped>
.tag {
    display: inline-block;
    height: auto;
    padding: 1px 7px;
    font-size: 12px;
    line-height: 20px;
    white-space: nowrap;
    border-radius: 2px;
    border-width: 1px;
    border-style: solid;
    opacity: 1;
    transition: all .3s;
    margin: 0 8px 0 0;



    span {
        user-select: none;
        color: #ffffffe4;
        margin-left: 5px;
        cursor: pointer;
    }

    span:hover {
        color: #e9e9e973
    }
}


.tag-default {
    background-color: #e6e6e6;
    border-color: #c6c6c6;
    color: #000000;

    span {
        user-select: none;
        color: #000000;
        margin-left: 5px;
        cursor: pointer;
    }

    span:hover {
        color: #00000073
    }
}

.tag-success {
    background: #67c23a;
    border-color: #67c23a;
    color: #ffff;
}

.tag-processing {
    background: #409eff;
    border-color: #409eff;
    color: #ffff;
}

.tag-error {
    background: #f56c6c;
    border-color: #f56c6c;
    color: #ffff;
}

.tag-warning {
    background: #e6a23c;
    border-color: #e6a23c;
    color: #ffff;
}
</style>