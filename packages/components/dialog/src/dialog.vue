<template>
  <Teleport :to="teleportTarget" :disabled="!teleportTarget">
    <Transition 
      name="amu-dialog-fade" 
      appear
      @enter="onEnter"
      @after-enter="onOpened" 
      @before-leave="onBeforeLeave"
      @after-leave="onClosed"
    >
      <div
        v-if="visible"
        class="amu-dialog-overlay"
        :class="{ 'is-non-modal': !modal }"
        :style="[overlayStyle, { zIndex: zIndex ?? currentZIndex }]"
        @click.self="handleOverlayClick"
      >
        <div
          ref="dialogRef"
          class="amu-dialog"
          :class="{ 'is-draggable': draggable }"
          :style="dialogStyle"
          role="dialog"
          aria-modal="true"
          :aria-label="title"
          tabindex="-1"
        >
          <div
            class="amu-dialog-header"
            @mousedown="handleHeaderMouseDown"
          >
            <slot name="header">
              <div class="amu-dialog-title">
                <slot name="icon">
                  <AmuIcon v-if="iconName" class="amu-dialog-icon" :class="[`is-${iconType}`]">
                    <component :is="iconComponent" />
                  </AmuIcon>
                </slot>
                <slot name="title">{{ title }}</slot>
              </div>
            </slot>
            <button
              v-if="showClose"
              class="amu-dialog-close"
              @click="handleClose"
            >
              <slot name="close">
                <AmuIcon>
                  <IconX />
                </AmuIcon>
              </slot>
            </button>
          </div>

          <div class="amu-dialog-body">
            <slot>
              <div v-if="type === 'feedback' && description" class="amu-dialog-body-content">
                {{ description }}
              </div>
              <div v-else class="amu-dialog-body-content">
                {{ description }}
              </div>
            </slot>
          </div>

          <div v-if="$slots.footer || showFooter" class="amu-dialog-footer">
            <slot name="footer">
              <slot name="cancelBtn">
                <AmuButton
                  v-if="showCancelBtn"
                  v-bind="cancelBtnProps"
                  @click="handleCancel"
                >
                  {{ cancelBtnText }}
                </AmuButton>
              </slot>
              <slot name="confirmBtn">
                <AmuButton
                  v-if="showConfirmBtn"
                  type="primary"
                  :loading="asyncLoading || confirmLoading"
                  v-bind="confirmBtnProps"
                  @click="handleConfirm"
                >
                  {{ confirmBtnText }}
                </AmuButton>
              </slot>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts">
// 全局鼠标位置追踪（模块级）
let mousePosition: { x: number; y: number } | null = null
if (typeof window !== 'undefined') {
  document.addEventListener('click', (e: MouseEvent) => {
    mousePosition = { x: e.clientX, y: e.clientY }
    // 记录最后一次点击位置，确保动画总是有目标
    // 我们不清除它，因为对于此效果，过期的点击原点比中心原点更好
  }, true)
}
</script>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick, type CSSProperties, isVNode } from 'vue'
import { dialogProps, dialogEmits } from './props'
import type { ButtonProps } from '../../button/src/props'
import AmuButton from '../../button'
import AmuIcon from '../../icon'
import { useZIndex, useLocale } from '@amu-ui/hooks'

import { 
  IconX, 
  IconCheck, 
  IconAlertCircle, 
  IconInfo 
} from '@amu-ui/icons'

defineOptions({
  name: 'AmuDialog'
})

const props = defineProps(dialogProps)
const emit = defineEmits(dialogEmits)

const { t } = useLocale()
const { nextZIndex } = useZIndex()

const visible = ref(props.modelValue)
const currentZIndex = ref(props.zIndex || nextZIndex())
const dialogRef = ref<HTMLElement>()
const confirmLoading = ref(false)

// 拖拽状态
const dragX = ref(0)
const dragY = ref(0)
const hasMoved = ref(false)
const openPosition = ref<{x: number, y: number} | null>(
  props.modelValue && mousePosition ? { ...(mousePosition as {x: number, y: number}) } : null
)

// 同步 modelValue
watch(() => props.modelValue, (val) => {
  if (val) {
    currentZIndex.value = props.zIndex ?? nextZIndex()
    visible.value = true
    // 如果 destroyOnClose 为 true，重新打开时重置位置
    // 否则保持最后的位置
    if (props.destroyOnClose) {
      hasMoved.value = false
    }
    emit('open')
  } else {
    visible.value = false
    emit('close')
  }
})

const teleportTarget = computed(() => {
  if (typeof props.teleportTo === 'function') {
    return props.teleportTo()
  }
  return props.teleportTo
})

// 遮罩层样式（用于定位）
const overlayStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  
  // 如果已移动，我们不再依赖 flexbox 居中，
  // 但我们仍然需要遮罩层覆盖屏幕。
  // 对话框将绝对定位。
  
  const [v, h] = props.placement.split('-')
  
  // 垂直对齐
  if (v === 'top') style.justifyContent = 'flex-start'
  else if (v === 'bottom') style.justifyContent = 'flex-end'
  else if (v === 'center' || v === 'left' || v === 'right') style.justifyContent = 'center'

  // 水平对齐
  if (h === 'start' || v === 'left') style.alignItems = 'flex-start'
  else if (h === 'end' || v === 'right') style.alignItems = 'flex-end'
  else style.alignItems = 'center'

  // 顶部/底部定位的内边距
  if (v === 'top') style.paddingTop = typeof props.top === 'number' ? `${props.top}px` : props.top
  if (v === 'bottom') style.paddingBottom = typeof props.top === 'number' ? `${props.top}px` : props.top

  // 遮罩层可见性
  if (!props.mask) {
    style.backgroundColor = 'transparent'
    style.pointerEvents = 'none' // 如果遮罩层隐藏，允许点击穿透遮罩层（但对话框会捕获点击）
  }

  return style
})

// 对话框样式
const dialogStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    width: typeof props.width === 'number' ? `${props.width}px` : props.width
  }
  
  if (props.draggable && hasMoved.value) {
    style.position = 'absolute'
    style.left = `${dragX.value}px`
    style.top = `${dragY.value}px`
    style.margin = '0'
  }
  
  return style
})

// 图标逻辑
const iconType = computed(() => {
  const name = props.icon as string
  if (['success', 'warning', 'error', 'info', 'confirm'].includes(name)) {
    return name
  }
  if (props.type === 'feedback' && !name) return 'info'
  return ''
})

const iconName = computed(() => {
  if (props.icon) return props.icon
  if (props.type === 'feedback') return 'info'
  return ''
})

const iconComponent = computed(() => {
  if (typeof props.icon === 'object') return props.icon
  
  let name = props.icon as string
  if (!name && props.type === 'feedback') name = 'info'

  const map: Record<string, any> = {
    success: IconCheck,
    warning: IconAlertCircle,
    error: IconX,
    info: IconInfo,
    confirm: IconAlertCircle
  }
  return map[name] || null
})

// 按钮逻辑
const showFooter = computed(() => props.type !== 'custom' || props.confirmBtn || props.cancelBtn)
const showClose = computed(() => props.type !== 'feedback') // 反馈类型通常没有关闭 X，只有按钮
const showCancelBtn = computed(() => props.type === 'confirm' || (props.type === 'custom' && props.cancelBtn))
const showConfirmBtn = computed(() => true) // 总是显示确认按钮，除非被自定义逻辑隐藏？

const cancelBtnText = computed(() => {
  if (typeof props.cancelBtn === 'string') return props.cancelBtn
  if (typeof props.cancelBtn === 'object' && 'content' in (props.cancelBtn as any)) return (props.cancelBtn as any).content
  return t('amu.dialog.cancel') || 'Cancel'
})

const confirmBtnText = computed(() => {
  if (typeof props.confirmBtn === 'string') return props.confirmBtn
  if (typeof props.confirmBtn === 'object' && 'content' in (props.confirmBtn as any)) return (props.confirmBtn as any).content
  return t('amu.dialog.confirm') || 'OK'
})

const cancelBtnProps = computed<Partial<ButtonProps>>(() => {
  if (typeof props.cancelBtn === 'object' && props.cancelBtn !== null && !isVNode(props.cancelBtn)) {
    return props.cancelBtn as Partial<ButtonProps>
  }
  return {}
})

const confirmBtnProps = computed<Partial<ButtonProps>>(() => {
  if (typeof props.confirmBtn === 'object' && props.confirmBtn !== null && !isVNode(props.confirmBtn)) {
    return props.confirmBtn as Partial<ButtonProps>
  }
  return {}
})

// 操作
const handleClose = () => {
  emit('update:modelValue', false)
}

const handleOverlayClick = () => {
  if (props.maskClosable && props.mask) {
    handleClose()
  }
}

const handleCancel = () => {
  emit('cancel')
  handleClose()
}

const handleConfirm = async () => {
  emit('confirm')
  
  // 插件模式支持
  if (props.pluginMode && props.onBeforeClose) {
    confirmLoading.value = true
    try {
      await new Promise<void>((resolve) => {
        props.onBeforeClose!(() => resolve())
      })
      handleClose()
    } finally {
      confirmLoading.value = false
    }
  } else if (!props.asyncLoading) {
    // 如果不是由 asyncLoading 属性控制，立即关闭
    // 如果 asyncLoading 为 true，父组件控制可见性
    if (props.type !== 'async') {
       handleClose()
    }
  }
}

const onEnter = (el: Element) => {
  const overlay = el as HTMLElement
  const dialogEl = overlay.querySelector('.amu-dialog') as HTMLElement
  
  if (!dialogEl) return

  // 捕获打开位置
  if (mousePosition) {
    openPosition.value = { ...mousePosition }
  }

  if (openPosition.value) {
    // 使用不受 transform: scale(...) 影响的 offsetLeft/Top
    // 这避免了重置 transform 和强制重排的需要，防止动画故障
    
    // 计算相对于视口的位置
    // offsetLeft 是相对于遮罩层（固定在 0,0）的，但我们必须考虑滚动
    const left = dialogEl.offsetLeft - overlay.scrollLeft
    const top = dialogEl.offsetTop - overlay.scrollTop
    
    const originX = openPosition.value.x - left
    const originY = openPosition.value.y - top
    
    dialogEl.style.transformOrigin = `${originX}px ${originY}px`
  }
}

const onBeforeLeave = (el: Element) => {
  const overlay = el as HTMLElement
  const dialogEl = overlay.querySelector('.amu-dialog') as HTMLElement
  
  // 使用存储的打开位置返回源点
  if (!dialogEl || !openPosition.value) return

  // 对于关闭，我们可以使用 getBoundingClientRect，因为元素是完全可见且未缩放的（大部分情况下）
  const rect = dialogEl.getBoundingClientRect()
  const originX = openPosition.value.x - rect.left
  const originY = openPosition.value.y - rect.top
  
  dialogEl.style.transformOrigin = `${originX}px ${originY}px`
}

const onOpened = () => emit('opened')
const onClosed = () => {
  emit('closed')
  openPosition.value = null
}

// 拖拽逻辑
const handleHeaderMouseDown = (e: MouseEvent) => {
  if (!props.draggable || !dialogRef.value) return
  
  const startX = e.clientX
  const startY = e.clientY
  
  // 获取当前 left/top
  const rect = dialogRef.value.getBoundingClientRect()
  const initialLeft = rect.left
  const initialTop = rect.top
  
  // 如果是第一次拖拽，我们需要显式设置初始位置，因为它是自动定位的
  if (!hasMoved.value) {
      dragX.value = initialLeft
      dragY.value = initialTop
      hasMoved.value = true
  }

  const moveHandler = (e: MouseEvent) => {
    const dx = e.clientX - startX
    const dy = e.clientY - startY
    
    let newX = initialLeft + dx
    let newY = initialTop + dy

    // 边界检查
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight
    const dialogWidth = rect.width
    const dialogHeight = rect.height

    if (newX < 0) newX = 0
    if (newX > windowWidth - dialogWidth) newX = windowWidth - dialogWidth
    
    if (newY < 0) newY = 0
    if (newY > windowHeight - dialogHeight) newY = windowHeight - dialogHeight

    dragX.value = newX
    dragY.value = newY
  }
  
  const upHandler = () => {
    document.removeEventListener('mousemove', moveHandler)
    document.removeEventListener('mouseup', upHandler)
  }
  
  document.addEventListener('mousemove', moveHandler)
  document.addEventListener('mouseup', upHandler)
}

// 锁定滚动 & 滚动条补偿
const originalOverflow = ref('')
const originalPaddingRight = ref('')

const getScrollbarWidth = () => {
  return window.innerWidth - document.documentElement.clientWidth
}

const lockScroll = () => {
  if (typeof document === 'undefined') return
  
  const scrollBarWidth = getScrollbarWidth()
  const body = document.body
  
  // 存储原始值
  originalOverflow.value = body.style.overflow
  originalPaddingRight.value = body.style.paddingRight
  
  // 应用锁定样式
  if (scrollBarWidth > 0) {
    body.style.paddingRight = `${parseInt(getComputedStyle(body).paddingRight || '0') + scrollBarWidth}px`
  }
  body.style.overflow = 'hidden'
}

const unlockScroll = () => {
  if (typeof document === 'undefined') return
  const body = document.body
  body.style.overflow = originalOverflow.value
  body.style.paddingRight = originalPaddingRight.value
}

const shouldLockScroll = computed(() => props.lockScroll && props.modal && props.mask)

watch(visible, (val) => {
  if (shouldLockScroll.value) {
    if (val) {
      lockScroll()
      nextTick(() => {
        if (dialogRef.value) dialogRef.value.focus()
      })
    } else {
      unlockScroll()
    }
  }
})

// 焦点陷阱
const handleKeydown = (e: KeyboardEvent) => {
  if (!visible.value) return
  
  // ESC 关闭
  if (e.key === 'Escape' && props.closeOnEsc) {
    e.stopPropagation()
    handleClose()
    return
  }
  
  // 焦点陷阱 (Tab)
  if (e.key === 'Tab' && props.modal) {
    const dialog = dialogRef.value
    if (!dialog) return
    
    const focusableEls = dialog.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]')
    const firstFocusableEl = focusableEls[0] as HTMLElement
    const lastFocusableEl = focusableEls[focusableEls.length - 1] as HTMLElement
    
    if (!e.shiftKey && document.activeElement === lastFocusableEl) {
      e.preventDefault()
      firstFocusableEl?.focus()
    } else if (e.shiftKey && document.activeElement === firstFocusableEl) {
      e.preventDefault()
      lastFocusableEl?.focus()
    }
  }
}

onMounted(() => {
  if (props.modelValue) {
    visible.value = true
    if (shouldLockScroll.value) lockScroll()
  }
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  if (shouldLockScroll.value && visible.value) unlockScroll()
})
</script>

<style scoped>
@import './style.css';
</style>
