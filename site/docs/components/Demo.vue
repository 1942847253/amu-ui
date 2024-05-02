<template>
    <div class="example" ref="demoRef">
        <div class="slot-content">
            <slot></slot>
        </div>
        <div class="tools">
            <a-icon name="code" v-tooltip.top="`查看源代码`" @click="foldCode" />
            <a-icon name="copy" v-tooltip.top="`复制代码`" @click="copyCode" />
            <a-icon name="layers" v-tooltip.top="`在 playground 中编辑`" @click="toPlayground" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { AMessage } from 'amu-ui'

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
    window.open(`https://amu-environment.github.io/amu-ui-playground/#${encoded}`)
}

const foldCode = () => {
    const codeElement = demoRef.value!.querySelector('summary')
    codeElement?.click()
}

const copyCode = () => {
    const copyBtn = demoRef.value!.querySelector('.copy') as HTMLButtonElement;
    copyBtn?.click()
    AMessage.success({
        message: '复制成功 !'
    })
}
</script>

<style lang="less" scoped>
.example {
    position: relative;
    border: 1px solid var(--a-border-weak-color);
    border-radius: 5px;
    padding: 20px;
    padding-top: 48px;
    overflow: hidden;
  

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