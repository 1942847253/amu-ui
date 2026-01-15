import type { RuleItem } from 'async-validator'

export type Arrayable<T> = T | T[]

export interface FormItemRule extends RuleItem {
    trigger?: Arrayable<string>
}

export type FormRules = Record<string, Arrayable<FormItemRule>>
