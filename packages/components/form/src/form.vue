<template>
    <form :class="formClasses" class="amu-form" @submit.prevent>
        <slot />
    </form>
</template>

<script lang="ts" setup>
import { computed, provide, reactive, toRefs } from 'vue'
import { formProps, formEmits } from './props'
import { formContextKey } from './constants'
import type { FormItemContext, FormValidateCallback, Arrayable } from './types'
import type { ValidateFieldsError } from 'async-validator'

defineOptions({
    name: 'AmuForm',
})

const props = defineProps(formProps)
const emit = defineEmits(formEmits)

const fields: FormItemContext[] = []

const addField = (field: FormItemContext) => {
    fields.push(field)
}

const removeField = (field: FormItemContext) => {
    if (field.prop) {
        const index = fields.indexOf(field)
        if (index > -1) {
            fields.splice(index, 1)
        }
    }
}

const resetFields = (keys?: Arrayable<string>) => {
    if (!props.model) {
        return
    }
    const keysArray = keys ? (Array.isArray(keys) ? keys : [keys]) : []
    fields.forEach(field => {
        if (!keysArray.length || (field.prop && keysArray.includes(field.prop))) {
            field.resetField()
        }
    })
}

const clearValidate = (keys?: Arrayable<string>) => {
    const keysArray = keys ? (Array.isArray(keys) ? keys : [keys]) : []
    fields.forEach(field => {
        if (!keysArray.length || (field.prop && keysArray.includes(field.prop))) {
            field.clearValidate()
        }
    })
}

const validate = async (callback?: FormValidateCallback): Promise<boolean> => {
    return validateField(undefined, callback)
}

const validateField = async (
    keys?: Arrayable<string>,
    callback?: FormValidateCallback
): Promise<boolean> => {
    const keysArray = keys ? (Array.isArray(keys) ? keys : [keys]) : []

    const filterFields = fields.filter(field => {
        if (!keysArray.length) return true
        return field.prop && keysArray.includes(field.prop)
    })

    if (filterFields.length === 0) {
        callback?.(true)
        return true
    }

    let validationErrors: ValidateFieldsError = {}
    
    for (const field of filterFields) {
        try {
            await field.validate('', (isValid, errors) => {
                if (errors) {
                    validationErrors = { ...validationErrors, ...errors }
                }
            })
        } catch (error) {
           // Ignored, handled in callback
        }
    }

    if (Object.keys(validationErrors).length === 0) {
        callback?.(true)
        return true
    } else {
        callback?.(false, validationErrors)
        return Promise.reject(validationErrors)
    }
}

const scrollToField = (prop: string) => {
    const field = fields.find(f => f.prop === prop)
    if (field) {
        // Implement scrolling later if we have ref to element
    }
}

const formClasses = computed(() => [
    `amu-form--${props.layout}`,
    props.size ? `amu-form--${props.size}` : '',
    {
        'amu-form--label-top': props.labelAlign === 'top',
        'amu-form--label-left': props.labelAlign === 'left',
    }
])

const reactiveContext = reactive({
    ...toRefs(props),
    props,
    emit,
    addField,
    removeField,
    resetFields,
    clearValidate,
    validateField,
})

provide(formContextKey, reactiveContext)

defineExpose({
    validate,
    validateField,
    resetFields,
    clearValidate,
    scrollToField
})
</script>
