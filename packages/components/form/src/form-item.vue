<template>
    <div :class="itemClasses" class="amu-form-item">
        <label v-if="label || $slots.label" :class="labelClasses" :style="labelStyle" :for="labelFor">
            <slot name="label" :label="label">
                {{ label }}
            </slot>
        </label>
        <div class="amu-form-item__content" :style="contentStyle">
            <slot />
            <transition name="amu-form-error-fade">
                <div v-if="shouldShowError" class="amu-form-item__error">
                    <slot name="error" :error="validateMessage">
                        {{ validateMessage }}
                    </slot>
                </div>
            </transition>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, inject, onMounted, onBeforeUnmount, provide, ref, watch, nextTick, toRef, reactive, useSlots } from 'vue'
import Schema from 'async-validator'
import { cloneDeep } from 'lodash-es'
import { formItemProps } from './props'
import { formContextKey, formItemContextKey } from './constants'
import { getProp, setProp, ensureArray } from './utils'
import type { FormItemContext, FormValidateCallback, FormItemRule, FormItemValidationState } from './types'
import type { CSSProperties } from 'vue'

defineOptions({
    name: 'AmuFormItem',
})

const props = defineProps(formItemProps)

const formContext = inject(formContextKey)
const validateState = ref<FormItemValidationState>('')
const validateMessage = ref('')
const isResetting = ref(false)

let initialValue: any = undefined

const fieldValue = computed(() => {
    if (!formContext?.model || !props.prop) {
        return undefined
    }
    return getProp(formContext.model, props.prop)
})

const labelFor = computed(() => props.for || props.prop)

const isRequired = computed(() => {
    if (props.required !== undefined) {
        return props.required
    }
    const rules = getMergedRules()
    return rules.some(rule => rule.required)
})

const shouldShowError = computed(() => {
    return validateState.value === 'error' && props.showMessage && (formContext?.props.showMessage ?? true)
})

const getMergedRules = (): FormItemRule[] => {
    const rules: FormItemRule[] = []
    if (formContext?.rules && props.prop) {
        const formRules = getProp(formContext.rules, props.prop)
        if (formRules) {
            rules.push(...ensureArray(formRules))
        }
    }
    if (props.rules) {
        rules.push(...ensureArray(props.rules))
    }
    if (props.required !== undefined) {
        rules.push({ required: props.required })
    }
    return rules
}

const getFilteredRules = (trigger: string) => {
    const rules = getMergedRules()
    return rules.filter(rule => {
        if (!rule.trigger || !trigger) return true
        return ensureArray(rule.trigger).includes(trigger)
    })
}

const validate = async (trigger: string, callback?: FormValidateCallback): Promise<boolean> => {
    if (isResetting.value || !props.prop) {
        callback?.(false)
        return false
    }

    const rules = getFilteredRules(trigger)
    if (rules.length === 0) {
        callback?.(true)
        return true
    }

    validateState.value = 'validating'

    const descriptor: Record<string, FormItemRule[]> = {}
    descriptor[props.prop] = rules

    const validator = new Schema(descriptor)
    const model = { [props.prop]: fieldValue.value }

    return new Promise((resolve) => {
        validator.validate(model, { firstFields: true }, (errors, fields) => {
            if (errors) {
                validateState.value = 'error'
                validateMessage.value = errors[0].message || 'Validation Failed'
                callback?.(false, fields)
                // Emit event to Form? usually not needed if Form calls validate
                resolve(false)
            } else {
                validateState.value = 'success'
                validateMessage.value = ''
                callback?.(true)
                resolve(true)
            }
        })
    })
}

const resetField = () => {
    validateState.value = ''
    validateMessage.value = ''
    isResetting.value = true

    if (formContext?.model && props.prop) {
        setProp(formContext.model, props.prop, cloneDeep(initialValue))
    }

    nextTick(() => {
        isResetting.value = false
    })
}

const clearValidate = () => {
    validateState.value = ''
    validateMessage.value = ''
}

const context: FormItemContext = reactive({
    prop: toRef(props, 'prop'),
    validate,
    resetField,
    clearValidate,
    setValidationState: (state: FormItemValidationState) => validateState.value = state,
    fieldValue,
    validateState,
})

provide(formItemContextKey, context)

onMounted(() => {
    if (props.prop) {
        if (formContext?.model) {
             const value = getProp(formContext.model, props.prop)
             initialValue = cloneDeep(value)
        }
        formContext?.addField(context)
    }
})

onBeforeUnmount(() => {
    formContext?.removeField(context)
})

watch(fieldValue, () => {
    if (isResetting.value) return
    validate('change')
})

const slots = useSlots()

const itemClasses = computed(() => [
    'amu-form-item',
    {
        'amu-form-item--error': validateState.value === 'error',
        'amu-form-item--validating': validateState.value === 'validating',
        'amu-form-item--success': validateState.value === 'success',
        'amu-form-item--required': isRequired.value,
        'amu-form-item--no-label': !props.label && !slots.label
    }
])

const labelClasses = computed(() => [
    'amu-form-item__label',
    {
        [`amu-form-item__label--${formContext?.props.labelAlign}`]: formContext?.props.labelAlign
    }
])

const labelStyle = computed<CSSProperties>(() => {
    const width = props.labelWidth || formContext?.props.labelWidth
    if (width) {
        return { width: typeof width === 'number' ? `${width}px` : width }
    }
    return {}
})

const contentStyle = computed<CSSProperties>(() => {
    // If label position is left/right AND has width, we might need flex.
    // Usually implemented via flexbox in CSS.
    return {}
})

defineExpose({
    validate,
    resetField,
    clearValidate,
    validateState,
    validateMessage
})
</script>
