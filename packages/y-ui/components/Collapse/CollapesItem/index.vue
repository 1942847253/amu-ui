<template>
    <div class="y-collapse-item">
        <div ref="collapseHeadRef" @click="clickHead" class="y-collapse-item-head">{{title}}</div>
        <div ref="collapseContentRef" class="y-collapse-item-content">
            <slot></slot>
            <div style="height:15px"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
export default defineComponent({
    name: 'YCollapseItem',
    props: {
        title: {
            type: String,
            default: ""
        },
        name: {
            type: String,
        }
    },
    emits: [],
    setup() {
        const collapseHeadRef = ref<null | HTMLDivElement>(null);
        const collapseContentRef = ref<null | HTMLDivElement>(null);
        const mainHeight = ref<number>(0);

        const clickHead = () => {
            const contnetHeight = Number(collapseContentRef.value!.style.height.split('p')[0]);

            if (contnetHeight === 0) {
                collapseContentRef.value!.style.borderBottom = '1px solid #ebeef5'
                collapseHeadRef.value!.style.borderBottom = 'none'
                collapseContentRef.value!.style.height = mainHeight.value + 'px'
               
               
            } else {
                setTimeout(() => {
                    collapseHeadRef.value!.style.borderBottom = '1px solid #ebeef5'
                    collapseContentRef.value!.style.borderBottom = 'none'
                }, 300);
               
               
                collapseContentRef.value!.style.height = '0px'
                
               
            }

        }
        onMounted(() => {
            mainHeight.value = collapseContentRef.value!.offsetHeight
            collapseContentRef.value!.style.height = 0 + 'px'
        })
        return {
            collapseHeadRef,
            collapseContentRef,
            clickHead
        }
    }
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>