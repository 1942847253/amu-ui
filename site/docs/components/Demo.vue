<template>
    <div class="example" ref="demoRef">
        <div class="slot-content">
            <slot></slot>
        </div>
        <div class="tools">
            <a-icon name="code" v-tooltip.top="`查看源代码`" @click="foldCode" />
            <a-icon name="copy" v-tooltip.top="`复制代码`" />
            <a-icon name="layers" v-tooltip.top="`在 playground 中编辑`" @click="toPlayground" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

const demoRef = ref<HTMLDivElement>()

onMounted(() => {

})


function utoa(data: string) {
    return btoa(unescape(encodeURIComponent(data)))
}

const toPlayground = () => {
    const codeElement = demoRef.value!.querySelector('code')!;
    const textContent = codeElement.textContent!
    const code = decodeURIComponent(textContent)
    const originCode = {
        ['App.vue']: code,
    }
    const encoded = utoa(JSON.stringify(originCode))
    window.open(`http://localhost:5173/#${encoded}`)
}

const foldCode = () => {
    const codeElement = demoRef.value!.querySelector('summary')
    codeElement?.click()
}
</script>

<style lang="less" scoped>
.example {
    position: relative;

    .tools {
        position: absolute;
        right: 20px;
        top: -5px;
        width: 100%;
        display: flex;
        flex-direction: row-reverse;
        margin-top: 10px;

        span {
            font-size: 16px;
            width: 32px;
            height: 32px;
            text-align: center;
            line-height: 32px;
            border-radius: 5px;
            transition: background-color 0.3s;
            cursor: pointer;
        }

        span:hover {
            background-color: var(--a-bg-hover-color);
        }

        span:active {
            background-color: var(--a-bg-hover-color);
        }
    }
}
</style>