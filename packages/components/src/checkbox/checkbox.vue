<template>
    <div class="y-checked-content" @click="changeChecked">
        <span>
            <input class="checkbox" :id="valueSlot" type="checkbox" :checked="checked" /></span>
        <div :class="`label ${checked ? 'checked' : ''}`">
            <slot>{{ valueSlot && valueSlot }}</slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref, onMounted } from "vue";
import './style/index.less';

export default defineComponent({
    name:'YCheckbox',
    props: {
        modelValue: {
            type: [Array, Boolean],
            default: [],
        },
        value: {
            type: [Number, Boolean],
            default: false
        },
    },
    emits: ["update:modelValue"],
    setup(props, { emit }) {
        const instance = getCurrentInstance();
        const valueSlot = ref<string>("");
        const checked = ref<boolean>(false);

        onMounted(() => {
            if (Array.isArray(props.modelValue)) {
                checked.value = props.modelValue.indexOf(props.value) !== -1 ? true : false;
            } else {
                checked.value = props.modelValue;
            }

         
            if (instance!.slots.default) {
                valueSlot.value = instance!.slots.default()[0].children as string;
            }
        });

        const changeChecked = () => {
            checked.value = !checked.value;
            if (typeof props.modelValue === "boolean") {
                emit("update:modelValue", checked.value);
            }
        };

        return {
            valueSlot,
            checked,
            changeChecked,
        };
    },
});
</script>

<style lang="less" scoped>
</style>
