<template>
    <div class="y-tree-menu">
        <div :class="`y-tree-list tree-ref-${uid}`" ref="treeRef" :node-key="item[nodeKey]"
            v-for="(item, index) in treeData" :key="item[props.key]">
            <button class="y-tree-item" @click="changeStatus(index)"
                :class="['treeNode', { 'treeNode--select': item.onSelect }]">
                <i v-show="item[props.children]"
                    :class="['iconfont icon-tree-retract', state.carets[state.tapScopes[index]]] " />
                <YCheckBox style="margin-left:5px" v-model="item.checked"><span class="title"
                        @click="tap(item, index)">{{ item[props.label] }}</span></YCheckBox>

            </button>
            <y-tree v-show="state.scopes[index]" :isSelect="isSelect" :data="item[props.children]"></y-tree>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, inject, PropType, ref, onBeforeMount, onMounted, watch } from "vue";
import $bus from "../../bus/bus";
import YCheckBox from '../CheckBox/CheckBox.vue'
import { deepClone, uuid } from '../../shared/utils'


let test: HTMLDivElement;
const CARETS = { open: 'caret-down', close: 'caret-right' }
export default defineComponent({
    name: "YTree",
    props: {
        data: {
            type: Array,
            default: () => []
        },
        isSelect: {
            type: Boolean,
            default: false
        },
        expand: {
            type: Boolean,
            default: false
        },
        props: {
            type: Object,
            default: () => {
                return {
                    children: "children",
                    label: "title",
                    key: 'id',
                }
            }
        },
    },
    emits: ['checkedItem'],
    components: {
        YCheckBox
    },
    setup(props, { emit }) {
        const uniKey = inject("uniKey")
        const uid = uuid();
        const nodeKey = inject('node-key') as string;
        const treeData = reactive(props.data) as any
        console.log(treeData);

        const state = reactive({
            carets: CARETS,
            tapScopes: {},
            scopes: {},
            height: 0
        }) as any

        onBeforeMount(() => {
        })

        onMounted(() => {

        })

        watch(() => treeData, (val: any) => {
           
       
        }, { deep: true })

        const operation = (type, treeNode) => {
            $bus.$emit('operation' + uniKey, { type, treeNode })
        }

        const tap = (item, index) => {
            changeStatus(index)
            $bus.$emit('node-click' + uniKey, item)
        }

        const test = (index) => {
            changeStatus(index);
        }

        const changeStatus = (index) => {

            $bus.$emit('change' + uniKey, props.data[index])
            // 图标变化
            state.tapScopes[index] = state.tapScopes[index] ? (state.tapScopes[index] === 'open' ? 'close' : 'open') : 'open';
            // 展开闭合
            state.scopes[index] = state.scopes[index] ? false : true;

        }


        return {
            treeData,
            uniKey,
            nodeKey,
            state,
            operation,
            tap,
            changeStatus,
            uid,
            test
        }
    }

})
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>