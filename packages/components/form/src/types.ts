import type { ValidateError, ValidateFieldsError } from 'async-validator'
import type { SetupContext, Ref } from 'vue'
import type { FormProps, FormItemProps } from './props'
import type { Arrayable, FormRules, FormItemRule } from './interface'
export type { Arrayable, FormRules, FormItemRule }

export type FormValidationResult = Promise<boolean>

export type FormValidateCallback = (
    isValid: boolean,
    invalidFields?: ValidateFieldsError
) => void

export interface FormContext {
    model?: Record<string, any>
    rules?: FormRules
    props: FormProps
    addField: (field: FormItemContext) => void
    removeField: (field: FormItemContext) => void
    resetFields: (props?: Arrayable<string>) => void
    clearValidate: (props?: Arrayable<string>) => void
    validateField: (
        props?: Arrayable<string>,
        callback?: FormValidateCallback
    ) => FormValidationResult
}

export interface FormItemContext {
    prop: string | undefined
    validate: (
        trigger: string,
        callback?: FormValidateCallback
    ) => FormValidationResult
    resetField: () => void
    clearValidate: () => void
    setValidationState: (state: FormItemValidationState) => void
    fieldValue: any
    validateState: FormItemValidationState
}

export type FormItemValidationState = '' | 'error' | 'validating' | 'success'

export interface FormValidateFailure {
    errors: ValidateError[] | null
    fields: ValidateFieldsError
}
