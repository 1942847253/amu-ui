import { type DirectiveBinding, type ObjectDirective, nextTick } from 'vue'
import Loading from './service'
import type { LoadingInstance, LoadingComponentPublicInstance } from './types'

const INSTANCE_KEY = Symbol('AmuLoading')

interface ElementWithLoading extends HTMLElement {
  [INSTANCE_KEY]?: LoadingInstance
}

const createInstance = (el: ElementWithLoading, binding: DirectiveBinding) => {
    const text = el.getAttribute('amu-loading-text')
    const background = el.getAttribute('amu-loading-background')
    const customClass = el.getAttribute('amu-loading-custom-class')
    const size = el.getAttribute('amu-loading-size')
    const spinner = el.getAttribute('amu-loading-spinner')
    const fullscreen = !!binding.modifiers.fullscreen

    // 如果使用了 body 修饰符，就挂载到 body 上
    // 但 Element Plus 的逻辑是：v-loading.body 意味着遮罩插入到 body 元素上，
    // 但是它是否全屏显示取决于样式和定位。通常全屏使用 fullscreen。
    // 这里我们简单处理：.fullscreen 或 .body 都可能影响 target。
    
    const instance = Loading({
        text: text || undefined,
        background: background || undefined,
        customClass: customClass || undefined,
        size: size || undefined,
        spinner: spinner || undefined,
        fullscreen,
        target: binding.modifiers.body ? document.body : el,
        body: !!binding.modifiers.body,
        visible: true, // 创建即显示
        lock: !!binding.modifiers.lock
    })
    
    el[INSTANCE_KEY] = instance
}

export const vLoading: ObjectDirective<ElementWithLoading> = {
    mounted(el, binding) {
        if (binding.value) {
            createInstance(el, binding)
        }
    },
    updated(el, binding) {
        const instance = el[INSTANCE_KEY]
        if (binding.value) {
            if (instance) {
                 if (binding.value !== binding.oldValue) {
                     // 已经是 true, 什么都不做，或者是从 false 变 true (走 else 逻辑)
                 }
                 // 更新 text 属性
                 const text = el.getAttribute('amu-loading-text')
                 if (text && instance.setText) {
                     instance.setText(text)
                 }
                 // TODO: 这里应支持动态更新 background, spinner 等，但目前 Service 只暴露了 setText
            } else {
                createInstance(el, binding)
            }
        } else {
            if (instance) {
                instance.close()
                el[INSTANCE_KEY] = undefined
            }
        }
    },
    unmounted(el) {
        el[INSTANCE_KEY]?.close()
        el[INSTANCE_KEY] = undefined
    }
}
