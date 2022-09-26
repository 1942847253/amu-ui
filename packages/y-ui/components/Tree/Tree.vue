<template>
    <div class="y-tree-menu">
        <div class="y-tree-list" v-for="(item, index) in data" :key="item[props.key]">
            <button class="y-tree-item" @click="changeStatus(index)"
                :class="['treeNode', { 'treeNode--select': item.onSelect }]">
                <i v-show="item[props.children]"
                    :class="['iconfont icon-tree-retract', state.carets[state.tapScopes[index]]]" />
                <label class="checkbox-wrap" @click="checked(item)">
                    <input v-if="isSelect" v-model="item.checked" type="checkbox" class="checkbox" />
                </label>
                <span class="title" @click="tap(item, index)">{{ item[props.label] }}</span>
            </button>
            <y-tree v-show="state.scopes[index]" :isSelect="isSelect" :data="item[props.children]"></y-tree>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, inject } from "vue";
import $bus from "../../bus/bus";
import { uuid } from '../../shared/utils'
import { YCheckbox } from "index";

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
        bus: {
            type: Object as any
        }
    },
    setup(props, { emit }) {
        const uniKey = inject("uniKey")
        const state = reactive({
            carets: CARETS,
            tapScopes: {},
            scopes: {},
            height: 0
        }) as any

        const operation = (type, treeNode) => {
            $bus.$emit('operation' + uniKey, { type, treeNode })
        }

        const tap = (item, index) => {
            $bus.$emit('node-click' + uniKey, item)
        }

        const changeStatus = (index) => {
            $bus.$emit('change' + uniKey, props.data[index])
            // 图标变化
            state.tapScopes[index] = state.tapScopes[index] ? (state.tapScopes[index] === 'open' ? 'close' : 'open') : 'open';
            // 展开闭合
            state.scopes[index] = state.scopes[index] ? false : true;

        }

        const checked = (item) => {
            $bus.$emit('checked' + uniKey, item)
        }

        return {
            uniKey,
            state,
            operation,
            tap,
            changeStatus,
            checked,
        }
    }

})
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>