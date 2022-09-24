<template>
    <ul class="treeMenu">
        <li v-for="(item, index) in data" :key="item[props.key]">
            <i v-show="item[props.children]" :class="['triangle', state.carets[state.tapScopes[index]]]"
                @click="changeStatus(index)" />
            <p :class="['treeNode', { 'treeNode--select': item.onSelect }]">
                <label class="checkbox-wrap" @click="checked(item)">
                    <input  v-if="isSelect" v-model="item.checked" type="checkbox" class="checkbox" />
                </label>
                <span class="title" @click="tap(item, index)">{{ item[props.label] }}</span>
            </p>
            <y-tree v-show="state.scopes[index]" :isSelect="isSelect" :data="item[props.children]"></y-tree>
        </li>
    </ul>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import $bus from "../../bus/bus";
import { YCheckbox } from "index";

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
        const state = reactive({
            carets: CARETS,
            tapScopes: {},
            scopes: {},
        }) as any

        const operation = (type, treeNode) => {
            $bus.$emit('operation', { type, treeNode })
        }

        const tap = (item, index) => {
            $bus.$emit('node-click', item)
        }

        const changeStatus = (index) => {
            $bus.$emit('change', props.data[index])
            // 图标变化
            state.tapScopes[index] = state.tapScopes[index] ? (state.tapScopes[index] === 'open' ? 'close' : 'open') : 'open';
            // 展开闭合
            state.scopes[index] = state.scopes[index] ? false : true;
        }

        const checked = (item) => {
            $bus.$emit('checked', item)
        }

        return {
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