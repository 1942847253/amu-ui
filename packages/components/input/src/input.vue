<template>
    <div :class="[
        'amu-input-wrapper',
        `amu-input--${size}`,
        `amu-input--${variant}`,
        {
            'amu-input--disabled': disabled,
            'amu-input--borderless': borderless,
            'amu-input--group': $slots.prepend || $slots.append,
            [`amu-input--status-${status}`]: status !== 'normal'
        }
    ]" @click="focus">
        <!-- 前置插槽 -->
        <div v-if="$slots.prepend" class="amu-input-group__prepend">
            <slot name="prepend" />
        </div>

        <div class="amu-input__inner-wrapper">
            <!-- 前缀 -->
            <span v-if="$slots.prefix" class="amu-input__prefix">
                <slot name="prefix" />
            </span>

            <!-- 输入框元素 -->
            <input ref="inputRef" class="amu-input__inner" :type="inputType" :value="displayValue"
                :placeholder="placeholder" :disabled="disabled" :readonly="readonly" :maxlength="nativeMaxlength"
                :style="inputStyle" @input="handleInput" @focus="handleFocus" @blur="handleBlur" @change="handleChange"
                @keydown.enter="handleEnter" />

            <!-- 用于自适应宽度的隐藏 span -->
            <span v-if="autoWidth" ref="mirrorRef" class="amu-input__mirror">{{ displayValue || placeholder }}</span>

            <!-- 清空图标 -->
            <span v-if="showClear" class="amu-input__clear-btn" @click.stop="handleClear" @mousedown.prevent>
                <AmuIcon>
                    <IconX />
                </AmuIcon>
            </span>

            <!-- 密码显隐切换 -->
            <span v-if="showPasswordToggle" class="amu-input__password-btn" @click.stop="togglePassword"
                @mousedown.prevent>
                <AmuIcon>
                    <IconEye v-if="passwordVisible" />
                    <IconEyeOff v-else />
                </AmuIcon>
            </span>

            <!-- 后缀 -->
            <span v-if="$slots.suffix || showLimitNumber" class="amu-input__suffix">
                <span v-if="showLimitNumber" class="amu-input__word-limit">
                    {{ textLength }}/{{ maxLimit }}
                </span>
                <slot name="suffix" />
            </span>
        </div>

        <!-- 后置插槽 -->
        <div v-if="$slots.append" class="amu-input-group__append">
            <slot name="append" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import { IconEye, IconEyeOff, IconX } from '@amu-ui/icons'
import { inputProps, inputEmits } from './props'
import { AmuIcon } from 'amu-ui'

defineOptions({
    name: 'AmuInput'
})

const props = defineProps(inputProps)
const emit = defineEmits(inputEmits)

const inputRef = ref<HTMLInputElement>()
const mirrorRef = ref<HTMLElement>()
const focused = ref(false)
const passwordVisible = ref(false)

// 输入类型控制
const inputType = computed(() => {
    if (props.showPassword) {
        return passwordVisible.value ? 'text' : 'password'
    }
    return props.type
})

// 值处理
const innerValue = computed({
    get: () => props.modelValue,
    set: (val) => {
        emit('update:modelValue', val)
    }
})

const displayValue = computed(() => {
    if (focused.value) {
        return String(innerValue.value)
    }
    if (props.formatter && props.formatOnBlur) {
        return props.formatter(String(innerValue.value))
    }
    return String(innerValue.value)
})

// 长度计算
const textLength = computed(() => {
    const val = String(innerValue.value || '')
    if (props.maxcharacter) {
        // 中文 = 2 字符，其他 = 1 字符
        let len = 0
        for (let i = 0; i < val.length; i++) {
            len += val.charCodeAt(i) > 127 || val.charCodeAt(i) === 94 ? 2 : 1
        }
        return len
    }
    return val.length
})

const maxLimit = computed(() => {
    return props.maxcharacter || props.maxlength
})

const nativeMaxlength = computed(() => {
    // 如果使用了 maxcharacter 或 allowInputOverMax，则禁用原生 maxlength
    if (props.maxcharacter || props.allowInputOverMax) {
        return undefined
    }
    return props.maxlength ? Number(props.maxlength) : undefined
})

// 可清空
const showClear = computed(() => {
    return (
        props.clearable &&
        !props.disabled &&
        !props.readonly &&
        String(innerValue.value).length > 0 &&
        (focused.value || hovering.value)
    )
})

const hovering = ref(false)
const handleMouseEnter = () => { hovering.value = true }
const handleMouseLeave = () => { hovering.value = false }

// 密码显隐切换
const showPasswordToggle = computed(() => {
    return (
        props.showPassword &&
        !props.disabled &&
        !props.readonly &&
        String(innerValue.value).length > 0
    )
})

// 自适应宽度
const inputStyle = computed(() => {
    const style: Record<string, string> = {
        textAlign: props.align
    }
    if (props.autoWidth) {
        style.width = '10px' // 最小宽度，如果需要会被 JS 覆盖，但实际上我们依赖 mirror
        // 实际上，对于 autoWidth，我们通常根据 mirror 计算出的值设置宽度
        if (mirrorWidth.value) {
            style.width = `${mirrorWidth.value}px`
        }
    }
    return style
})

const mirrorWidth = ref(0)
const updateMirror = () => {
    if (props.autoWidth && mirrorRef.value) {
        mirrorWidth.value = mirrorRef.value.offsetWidth + 4 // +4 缓冲
    }
}

watch(
    () => [innerValue.value, props.placeholder, props.autoWidth],
    () => {
        nextTick(updateMirror)
    }
)

onMounted(() => {
    updateMirror()
})

// 事件处理
const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    let val = target.value

    // 如果需要，手动处理 maxcharacter 限制
    if (props.maxcharacter && !props.allowInputOverMax) {
        // 在 'input' 事件中完美处理 CJK 比较复杂，
        // 但对于基本实现：
        // 如果超出限制，我们可能需要截断
        // 目前，我们依赖验证或如果严格要求则进行简单截断
        // 但通常 maxcharacter 是软限制或通过 composition 处理
    }

    emit('input', val)
    emit('update:modelValue', val)

    nextTick(updateMirror)
}

const handleFocus = (event: FocusEvent) => {
    focused.value = true
    emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
    focused.value = false
    // 如果存在 parser，则在失焦时解析值
    if (props.parser) {
        const parsed = props.parser(String(innerValue.value))
        if (parsed !== innerValue.value) {
            emit('update:modelValue', parsed)
            emit('change', parsed)
        }
    }
    emit('blur', event)
}

const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    emit('change', target.value)
}

const handleClear = () => {
    emit('update:modelValue', '')
    emit('change', '')
    emit('clear')
    inputRef.value?.focus()
}

const togglePassword = () => {
  passwordVisible.value = !passwordVisible.value
  nextTick(() => {
    const input = inputRef.value
    if (!input) return
    input.focus()
    
    // 使用 setTimeout 确保在浏览器完成 type 属性切换后的默认行为（重置光标）之后执行
    setTimeout(() => {
      const len = input.value.length
      try {
        input.setSelectionRange(len, len)
      } catch (e) {
        // 忽略不支持 setSelectionRange 的情况
      }
    }, 0)
  })
}

const handleEnter = (e: KeyboardEvent) => {
    emit('enter', e)
}

const focus = () => {
    inputRef.value?.focus()
}

defineExpose({
    input: inputRef,
    focus,
    blur: () => inputRef.value?.blur()
})
</script>

<style src="./style.css"></style>
