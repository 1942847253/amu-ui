import { get, set } from 'lodash-es'
import type { Arrayable } from './types'

export const getProp = (obj: Record<string, any>, path: string | undefined): any => {
    if (!path || !obj) return undefined
    return get(obj, path)
}

export const setProp = (obj: Record<string, any>, path: string | undefined, value: any): void => {
    if (!path || !obj) return
    set(obj, path, value)
}

export const ensureArray = <T>(val: Arrayable<T>): T[] => {
    if (Array.isArray(val)) return val
    return [val]
}
