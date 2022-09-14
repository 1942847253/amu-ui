<template>
    <div :style="`padding-right:${props.closeable?'20px':'9px'};`" v-if="!closeable"
        :class="`tag ${getTagType(props.type)}`">
        <slot></slot>
        <div v-if="props.closeable" :class="`close-content ${mouseEnter&&`close-${props.type}`}`" @mouseleave="mouseEnter = false"
            @mouseenter="mouseEnter=true">
            <span class="iconfont icon-close" v-if="props.closeable" @click.stop="closeTag"></span>
        </div>
    </div>

</template>

<script lang="ts" setup>import { ref } from 'vue';

const props = defineProps({
    type: {
        type: String,
        default: 'default'
    },
    closeable: {
        type: Boolean,
        default: false
    }


})

const emit = defineEmits(['closeEvent'])
const closeable = ref<boolean>(false)
const mouseEnter = ref<boolean>(false)
const closeTag = () => {
    emit('closeEvent');
    closeable.value = true
}
const getTagType = (type: string) => {
    switch (type) {
        case 'success':
            return 'tag-success'
        case 'info':
            return 'tag-info'
        case 'danger':
            return 'tag-danger'
        case 'warning':
            return 'tag-warning'
        default:
            return 'tag-default'
    }
}

</script>

<style lang="scss" scoped>
@import "../../assets/index.scss";
@import '../../iconfont/iconfont.css';

.tag {
    position: relative;
    display: inline-flex;
    font-size: 12px;
    line-height: 20px;
    white-space: nowrap;
    padding: 0.5px 9px;
    border-radius: 3px;
    border-width: 1px;
    border-style: solid;
    transition: all .3s;
    margin: 0 8px 0 0;

    .close-content {
        position: absolute;
        right: 2px;
        top: 4.3px;
        user-select: none;
        border-radius: 50%;
        height: 13px;
        width: 13px;

        span {
            position: absolute;
            font-size: 10px;
            top: -3.3px;
            left: 0.5px;
            cursor: pointer;
        }

        span:hover {
            color: #fff;
        }
    }

    .close-success {
        background-color: $success-color;
    }

    .close-info {
        background-color: $info-color;
    }

    .close-danger {
        background-color: $danger-color;
    }

    .close-warning {
        background-color: $warning-color;
    }

    .close-default {
        background-color: rgba(0, 0, 0, 0.385);
    }
}


.tag-default {
    background-color: #e6e6e6;
    border-color: #c6c6c6;
    color: #000000;

    span:hover {
        color: #00000073
    }
}

.tag-success {
    background: #e3f4f1;
    border-color: #02c39913;
    color: #02c39a;
}

.tag-info {
    background: #dfe9f3e0;
    border-color: #3f5e7d12;
    color: #3f5e7de0;
}

.tag-danger {
    background: #f5e6e1;
    border-color: #ff400018;
    color: #FF3F00;
}

.tag-warning {
    background: #f4eedf;
    border-color: #d699001a;
    color: #D69800;
}
</style>