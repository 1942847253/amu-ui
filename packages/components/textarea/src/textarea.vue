<template>
    <div :class="[
        'amu-textarea-wrapper',
        `amu-textarea--${textareaSize}`,
        `amu-textarea--${variant}`,
        {
            'amu-textarea--disabled': disabled,
            [`amu-textarea--status-${status}`]: status !== 'normal',
            'amu-textarea--has-limit': showWordLimit && maxlength
        }
    ]">
        <div class="amu-textarea__inner-wrapper">
            <textarea ref="textareaRef" :class="['amu-textarea__inner', { 'amu-textarea--autosize': autosize }]"
                :value="modelValue" :rows="rows" :id="id" :name="name" :form="form" :placeholder="placeholder"
                :disabled="disabled" :readonly="readonly" :maxlength="maxlength" :style="textareaStyle"
                @input="handleInput" @focus="handleFocus" @blur="handleBlur" @change="handleChange" />
            <span v-if="showWordLimit && maxlength" class="amu-textarea__word-limit">
                {{ textLength }}/{{ maxlength }}
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, inject, type StyleValue } from 'vue'
import { textareaProps, textareaEmits } from './props'
import { formContextKey } from '../../form/src/constants'

defineOptions({
    name: 'AmuTextarea'
})

const props = defineProps(textareaProps)
const emit = defineEmits(textareaEmits)

const formContext = inject(formContextKey, undefined)

const textareaRef = ref<HTMLTextAreaElement>()
const heightStyle = ref<string>()

const textareaSize = computed(() => {
    return props.size || formContext?.props.size || 'medium'
})

const textLength = computed(() => {
    return String(props.modelValue || '').length
})

const overflowState = ref<'hidden' | 'auto'>('hidden')

const textareaStyle = computed(() => {
    const styles: StyleValue = {
        resize: props.resize
    }

    const isAutosize = props.autosize === true || props.autosize === '' || (typeof props.autosize === 'object' && props.autosize !== null)

    if (isAutosize) {
        styles.overflow = overflowState.value
        if (heightStyle.value) {
            styles.height = heightStyle.value
        }
    }
    return styles
})

const handleInput = (e: Event) => {
    const target = e.target as HTMLTextAreaElement
    emit('update:modelValue', target.value)
    emit('input', target.value)
}

const handleFocus = (e: FocusEvent) => {
    emit('focus', e)
}

const handleBlur = (e: FocusEvent) => {
    emit('blur', e)
}

const handleChange = (e: Event) => {
    const target = e.target as HTMLTextAreaElement
    emit('change', target.value)
}

// --- Auto Size Logic ---
const calculateNodeStyling = (targetElement: HTMLTextAreaElement) => {
    const style = window.getComputedStyle(targetElement)

    const boxSizing = style.getPropertyValue('box-sizing')
    const paddingBottom = parseFloat(style.getPropertyValue('padding-bottom'))
    const paddingTop = parseFloat(style.getPropertyValue('padding-top'))
    const borderBottom = parseFloat(style.getPropertyValue('border-bottom-width'))
    const borderTop = parseFloat(style.getPropertyValue('border-top-width'))

    const contextStyle = {
        'box-sizing': boxSizing,
        'padding-top': style.getPropertyValue('padding-top'),
        'padding-bottom': style.getPropertyValue('padding-bottom'),
        'border-top-width': style.getPropertyValue('border-top-width'),
        'border-bottom-width': style.getPropertyValue('border-bottom-width'),
        'font-size': style.getPropertyValue('font-size'),
        'line-height': style.getPropertyValue('line-height'),
        'font-family': style.getPropertyValue('font-family'),
        'font-weight': style.getPropertyValue('font-weight'),
        'letter-spacing': style.getPropertyValue('letter-spacing'),
        'text-rendering': style.getPropertyValue('text-rendering'),
        'text-transform': style.getPropertyValue('text-transform'),
        'text-indent': style.getPropertyValue('text-indent'),
        'padding-left': style.getPropertyValue('padding-left'),
        'padding-right': style.getPropertyValue('padding-right'),
        // Essential for correct wrapping
        'word-break': style.getPropertyValue('word-break'),
        'word-wrap': style.getPropertyValue('word-wrap'),
        'white-space': style.getPropertyValue('white-space'),
        'overflow-wrap': style.getPropertyValue('overflow-wrap'),
        'tab-size': style.getPropertyValue('tab-size')
    }

    return { contextStyle, paddingSize: paddingTop + paddingBottom, borderSize: borderTop + borderBottom, boxSizing }
}

const resize = () => {
    const isAutosize = props.autosize === true || props.autosize === '' || (typeof props.autosize === 'object' && props.autosize !== null)
    if (!isAutosize || !textareaRef.value) return
    const el = textareaRef.value

    const { contextStyle, paddingSize, borderSize, boxSizing } = calculateNodeStyling(el)

    const hiddenTextarea = document.createElement('textarea')
    document.body.appendChild(hiddenTextarea)

    // Apply ghost styles
    for (const [key, value] of Object.entries(contextStyle)) {
        hiddenTextarea.style.setProperty(key, value)
    }

    // Accurate width calculation:
    // Using box-sizing: content-box allows us to set the width to exactly the content width of the original element.
    // el.clientWidth = content + padding (excludes scrollbar and border)
    // We subtract padding to get pure content width.
    hiddenTextarea.style.setProperty('box-sizing', 'content-box')

    // Calculate content width
    const paddingLeft = parseFloat(contextStyle['padding-left'])
    const paddingRight = parseFloat(contextStyle['padding-right'])
    const contentWidth = el.clientWidth - paddingLeft - paddingRight

    hiddenTextarea.style.setProperty('width', `${contentWidth}px`)

    hiddenTextarea.style.setProperty('position', 'absolute')
    hiddenTextarea.style.setProperty('top', '-9999px')
    hiddenTextarea.style.setProperty('left', '-9999px')
    hiddenTextarea.style.setProperty('height', '0') // Collapse to force scrollHeight to represent content
    hiddenTextarea.style.setProperty('overflow', 'hidden')

    // Set value
    hiddenTextarea.value = el.value || props.placeholder || ''

    let height = hiddenTextarea.scrollHeight
    const result = { height, overflow: 'hidden' as 'hidden' | 'auto' }

    if (boxSizing === 'border-box') {
        // scrollHeight doesn't include border, but we need to set a height that includes border.
        // So height = scrollHeight + borderSize.
        height = height + borderSize
    } else {
        height = height - paddingSize
    }

    hiddenTextarea.value = ''
    const singleRowHeight = hiddenTextarea.scrollHeight - paddingSize

    if (typeof props.autosize === 'object') {
        const { minRows, maxRows } = props.autosize
        if (minRows) {
            let minHeight = singleRowHeight * minRows
            if (boxSizing === 'border-box') minHeight = minHeight + paddingSize + borderSize
            else minHeight = minHeight + paddingSize
            height = Math.max(height, minHeight)
        }
        if (maxRows) {
            let maxHeight = singleRowHeight * maxRows
            if (boxSizing === 'border-box') maxHeight = maxHeight + paddingSize + borderSize
            else maxHeight = maxHeight + paddingSize
            
            if (height > maxHeight) {
                height = maxHeight
                result.overflow = 'auto'
            } else {
                result.overflow = 'hidden'
            }
        }
    }

    document.body.removeChild(hiddenTextarea)

    heightStyle.value = `${height}px`
    overflowState.value = result.overflow
}

watch(() => props.modelValue, () => nextTick(resize))
watch(() => props.autosize, () => nextTick(resize))
onMounted(() => nextTick(resize))

</script>
