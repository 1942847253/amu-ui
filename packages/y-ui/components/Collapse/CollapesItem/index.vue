<template>
    <div class="y-collapse-item">
        <div ref="collapseHeadRef" @click="clickHead" class="y-collapse-item-head">
            <div class="y-collapse-item-head-title">{{title}}</div>
            <div class="y-collapse-item-head-icon iconfont icon-right"></div>
        </div>
        <div ref="collapseContentRef" class="y-collapse-item-content">
            <slot></slot>
            <div style="height:15px"></div>
        </div>
    </div>
</template>

<script lang="ts">
import $bus from '../../../bus/bus';
import { defineComponent, onMounted, ref, inject, watch } from 'vue'
import { EAction, EventName } from '..';
export default defineComponent({
    name: 'YCollapseItem',
    props: {
        title: {
            type: String,
            default: ""
        },
        name: {
            type: String,
        },
        currentName: String
    },
    emits: [],
    setup(props) {
        let iconDom: HTMLDivElement;
        const modelValue = inject('model-value')
        const collapseHeadRef = ref<null | HTMLDivElement>(null);
        const collapseContentRef = ref<null | HTMLDivElement>(null);
        const mainHeight = ref<number>(0);

        onMounted(() => {
            mainHeight.value = collapseContentRef.value!.offsetHeight
            iconDom = collapseHeadRef.value!.querySelector('.y-collapse-item-head-icon')!;
            collapseContentRef.value!.style.height = 0 + 'px'
            if (Array.isArray(modelValue)) {
                const shouldShow = modelValue.includes(props.name);
                shouldShow && openContent();
            } else {
                const shouldShow = modelValue && modelValue === props.name
                shouldShow && openContent();
            }
        })

        watch(() => props.currentName, (name) => {
            name !== props.name && closeContent()
        })

        const clickHead = () => {
            const contentHeight = Number(collapseContentRef.value!.style.height.split('p')[0])
            if (contentHeight === 0) {
                openContent();
                $bus.$emit(EventName.UPDATE_MODEL_VALUE, EAction.OPEN, props.name)
            } else {
                closeContent();
                $bus.$emit(EventName.UPDATE_MODEL_VALUE, EAction.CLOSE, props.name)
            }
        }

        const openContent = () => {
            collapseContentRef.value!.style.borderBottom = '1px solid #ebeef5'
            collapseHeadRef.value!.style.borderBottom = 'none'
            collapseContentRef.value!.style.height = mainHeight.value + 'px'
            iconDom.style.transform = 'rotate(90deg)'
        }

        const closeContent = () => {
            iconDom.style.transform = 'rotate(0deg)'
            collapseContentRef.value!.style.height = '0px'
            setTimeout(() => {
                collapseHeadRef.value!.style.borderBottom = '1px solid #ebeef5'
                collapseContentRef.value!.style.borderBottom = 'none'
            }, 300);
        }

        return {
            collapseHeadRef,
            collapseContentRef,
            clickHead,
        }
    }
})
</script>

<style lang="less" scoped>
@import './index.less';
</style>