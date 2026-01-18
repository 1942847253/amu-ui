import { createVNode, render, reactive, toRefs, nextTick, type ShallowRef, shallowRef } from 'vue'
import LoadingConstructor from './loading'
import type { LoadingOptions, LoadingInstance } from './types'

const getScrollBarWidth = () => {
    const el = document.createElement('div')
    el.style.cssText = 'width:100px;height:100px;overflow:scroll !important;position:absolute;top:-9999px'
    document.body.appendChild(el)
    const result = el.offsetWidth - el.clientWidth
    document.body.removeChild(el)
    return result
}

let fullScreenLoading: LoadingInstance | undefined

const defaults: LoadingOptions = {
  text: '',
  fullscreen: true,
  body: false,
  lock: false,
  customClass: ''
}

const Loading = (options: LoadingOptions = {}): LoadingInstance => {
  options = { ...defaults, ...options }

  if (typeof options.target === 'string') {
    options.target = document.querySelector(options.target) as HTMLElement
  }

  options.target = options.target || document.body

  if (options.target !== document.body) {
    options.fullscreen = false
  } else {
    options.body = true
  }

  if (options.fullscreen && fullScreenLoading) {
    return fullScreenLoading
  }

  const data = reactive({
    ...options,
    visible: false
  })

  const container = document.createElement('div')
  // 使用 createVNode 渲染组件
  const vm = createVNode(LoadingConstructor, data)
  
  render(vm, container)
  
  // 此时 vm.component.exposed 或者 props 是无法直接修改的，因为是 props
  // 这里我们利用 reactive data 传入 props，组件更新依赖父组件更新机制
  // 但 createVNode 单独使用时，我们需要重新 render 或者使用一个 wrapper
  // 为了简单，我们让 loading 组件接收一个响应式对象或者我们直接修改组件实例的状态
  
  // 更好的方式：让 createVNode 的 props 指向 reactive data
  // 但是 vue 的 props 是 shallow readonly。
  // 我们可以通过这种方式：在 render 时传入最新的 data。
  
  // 修正：上述 createVNode(LoadingConstructor, data) 只会渲染一次。
  // 若要响应式更新，可以自定义一个组件 wrapper 或者直接操作 DOM 似乎不够优雅。
  // 
  // 实际上 Element Plus 等库的做法是：
  // 这里的 data 是 reactive 的。
  // 我们不需要组件内部响应，而是通过手动 render 更新？
  // 不，Vue 3 的 createVNode 若传入 reactive 对象作为 props，并不会自动建立响应式连接给组件内部（除非在父组件模板中使用）。
  // 
  // 解决方案：使用一个 setup 函数返回 render 函数的闭包来维持响应式。
  
  // 重写一下实现逻辑：
  
  // 为了支持服务式调用的响应式更新（如 setText），我们需要持有一个可以修改 props 的机制。
  // Hacky way: 将 reactive defineComponent 包装一层。
  
  // 这里简化处理：我们不追求过度的响应式更新 props，主要关注 visible 和 close。
  // close 时我们需要销毁。

  const parent = options.target
  parent.appendChild(container.firstElementChild!)

  let originalPaddingRight: string | undefined

  const instance = {
    vm,
    $el: container.firstElementChild as HTMLElement,
    close: () => {
       const exposed = vm.component?.exposed as any
       if (exposed) {
           exposed.visible.value = false
       } else {
           data.visible = false
       }
       
       setTimeout(() => {
         if (options.fullscreen) {
            fullScreenLoading = undefined
         }
         // 移除 classes
         if (options.lock) {
            parent.classList.remove('amu-loading-parent--hidden')
            if (originalPaddingRight !== undefined) {
                document.body.style.paddingRight = originalPaddingRight
            }
         }
         parent.classList.remove('amu-loading-parent--relative')
         
         if (parent.contains(instance.$el)) {
             parent.removeChild(instance.$el)
         }
         render(null, container) // 销毁
       }, 300) // 等待动画结束
    },
    setText: (text: string) => {
        const exposed = vm.component?.exposed as any
        if (exposed) {
             exposed.setText(text)
        } else {
            data.text = text
        }
    }
  }

  // 必须处理父容器样式
  if (getComputedStyle(parent).position === 'static' && !options.fullscreen) {
     parent.classList.add('amu-loading-parent--relative')
  }

  if (options.lock) {
     const isBody = parent === document.body;
     if (isBody && window.innerWidth > document.documentElement.clientWidth) {
         const scrollBarWidth = getScrollBarWidth()
         if (scrollBarWidth > 0) {
             originalPaddingRight = document.body.style.paddingRight
             const computedPaddingRight = window.getComputedStyle(document.body).paddingRight
             document.body.style.paddingRight = `calc(${computedPaddingRight} + ${scrollBarWidth}px)`
         }
     }
     parent.classList.add('amu-loading-parent--hidden')
  }
  
  // 显示
  // 稍微延迟一下确保 transition 生效
  requestAnimationFrame(() => {
      const exposed = vm.component?.exposed as any
      if (exposed) {
          exposed.visible.value = true
      } else {
        data.visible = true
      }
  })
  
  return instance
}


export default Loading
