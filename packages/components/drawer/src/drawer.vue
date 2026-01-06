<template>
  <Teleport :to="teleportTarget" :disabled="!teleportTarget">
    <!-- 将 Overlay 和 Drawer 分离为并行结构 -->
    <!-- 外层容器仅负责 z-index 管理，不做动画，不阻挡点击 -->
    <div
      v-if="shouldRender"
      class="amu-drawer-container"
      :style="{ zIndex: currentZIndex }"
    >
      <Transition 
        name="amu-drawer-fade"
      >
        <div
          v-show="visible && modal"
          class="amu-drawer-overlay"
          :class="{ 'is-non-modal': !modal }"
          @click.self="handleMaskClick"
        ></div>
      </Transition>

      <Transition 
        :name="`amu-drawer-slide-${placement}`" 
        @after-enter="onOpened" 
        @after-leave="onClosed"
      >
        <div
          v-show="visible"
          ref="drawerRef"
          class="amu-drawer"
          :class="[
            `amu-drawer--${placement}`,
            { 'is-dragging': isDragging }
          ]"
          :style="drawerStyle"
          role="dialog"
          aria-modal="true"
          :aria-label="title"
            @mousedown.stop
        >
          <!-- Resizer Handle -->
          <div
            v-if="resizable"
            class="amu-drawer__resizer"
            :class="`amu-drawer__resizer--${placement}`"
            @mousedown="handleResizeStart"
          ></div>

          <div v-if="showHeader" class="amu-drawer__header">
            <slot name="header">
                <div class="amu-drawer__title">
                  <slot name="title">{{ title }}</slot>
                </div>
            </slot>
            <button
              v-if="showClose"
              class="amu-drawer__close"
              @click="handleClose"
            >
                <slot name="close">
                  <span class="amu-drawer__close-icon">×</span>
                </slot>
            </button>
          </div>

          <div class="amu-drawer__body" :class="{ 'is-scrollable': bodyScrollable }">
            <slot></slot>
          </div>

          <div v-if="showFooter || $slots.footer" class="amu-drawer__footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onBeforeUnmount, nextTick, CSSProperties } from 'vue'
import { drawerProps, drawerEmits } from './props'
import drawerManager from './drawer-manager'
import { useZIndex } from '@amu-ui/hooks'

defineOptions({
  name: 'AmuDrawer',
})

const props = defineProps(drawerProps)
const emit = defineEmits(drawerEmits)

const visible = ref(false)
const drawerRef = ref<HTMLElement>()
const isDragging = ref(false)
const currentZIndex = ref(props.zIndex || 2000)
const { nextZIndex } = useZIndex()

// 处理 keep-alive / destroy-on-close
const rendered = ref(false)
const shouldRender = computed(() => {
  // 如果处于打开状态，强制渲染
  if (visible.value) return true
  // 如果未打开且已经渲染过，根据 destroyOnClose 决定是否保留
  if (rendered.value && !props.destroyOnClose) return true
  // 初始化时，如果 modelValue 为 true，也应该渲染（配合 internalOpen 逻辑）
  if (props.modelValue) return true
  
  return false
})

// Teleport 目标解析
const teleportTarget = computed(() => {
  if (typeof props.teleportTo === 'function') return props.teleportTo()
  return props.teleportTo
})

// 生命周期与可见性
let drawerId = 0
onMounted(() => {
  drawerId = Math.random() // 简单ID生成
  if (props.modelValue) {
    internalOpen()
  }
})

onBeforeUnmount(() => {
  drawerManager.remove(drawerId)
})

watch(() => props.modelValue, (val) => {
  if (val) internalOpen()
  else internalClose()
})

const internalOpen = async () => {
  rendered.value = true
  currentZIndex.value = props.zIndex ?? nextZIndex()
  
  // 强制重绘，等待 DOM 挂载
  await nextTick()
  
  // 再次等待一帧，确保浏览器完成布局计算，避免动画第一帧出现样式错乱（如白色闪烁）
  requestAnimationFrame(() => {
    // 双重 rAF 确保在下一帧渲染前执行，这是处理 Vue Transition 闪烁的经典 hack
    requestAnimationFrame(() => {
      visible.value = true
      drawerManager.add({
        id: drawerId,
        close: handleClose,
        closeOnEsc: props.closeOnEsc,
        modal: props.modal
      })
      emit('open')
    })
  })
}

const internalClose = () => {
  visible.value = false
  drawerManager.remove(drawerId)
  emit('close')
} 

const handleClose = async () => {
  if (props.beforeClose) {
    const res = props.beforeClose()
    if (res instanceof Promise) {
      const allowed = await res
      if (allowed) close()
    } else if (res) {
      close()
    }
  } else {
    close()
  }
}

const close = () => {
  emit('update:modelValue', false)
}

const handleMaskClick = () => {
  if (props.maskClosable && props.modal) {
    handleClose()
  }
}

const onOpened = () => {
  emit('opened')
}

const onClosed = () => {
  emit('closed')
  if (props.destroyOnClose) rendered.value = false
}

defineExpose({
  close: handleClose,
  open: internalOpen
})

// 尺寸调整逻辑
const drawerSize = ref(props.size)
const computedSize = computed(() => {
  const size = drawerSize.value
  if (typeof size === 'number') return `${size}px`
  return size
})

const isVertical = computed(() => props.placement === 'top' || props.placement === 'bottom')

const drawerStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {}
  if (isVertical.value) {
    style.height = computedSize.value
    style.width = '100%'
  } else {
    style.width = computedSize.value
    style.height = '100%'
  }
  return style
})

// 尺寸调整处理
const handleResizeStart = (e: MouseEvent) => {
  if (!props.resizable) return
  e.preventDefault()
  isDragging.value = true
  
  const startX = e.clientX
  const startY = e.clientY
  
  // 将当前尺寸解析为数字
  let startSize = 0
  const el = drawerRef.value
  if (!el) return
  
  const rect = el.getBoundingClientRect()
  startSize = isVertical.value ? rect.height : rect.width

  const onMouseMove = (e: MouseEvent) => {
    let delta = 0
    if (props.placement === 'left') delta = e.clientX - startX
    if (props.placement === 'right') delta = startX - e.clientX
    if (props.placement === 'top') delta = e.clientY - startY
    if (props.placement === 'bottom') delta = startY - e.clientY

    let newSize = startSize + delta

    // 尺寸限制
    if (props.minSize) newSize = Math.max(newSize, props.minSize)
    if (props.maxSize) newSize = Math.min(newSize, props.maxSize)
    
    // 视口检查（可选，建议用于生产环境）
    const viewportSize = isVertical.value ? window.innerHeight : window.innerWidth
    newSize = Math.min(newSize, viewportSize)

    drawerSize.value = newSize
    emit('resize', isVertical.value ? { width: viewportSize, height: newSize } : { width: newSize, height: window.innerHeight })
  }

  const onMouseUp = () => {
    isDragging.value = false
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }

  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}

</script>

<style scoped>
/* 基础布局样式 - 按需使用 scoped，建议优先使用主题变量 */
.amu-drawer-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 0;
  overflow: visible;
  pointer-events: none;
  /* 确保整个容器在动画时也是合成层 */
  will-change: z-index;
}

.amu-drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--amu-overlay-color, rgba(0, 0, 0, 0.5));
  /* 并行结构下，overlay 单独处理，需要恢复 pointer-events 响应点击 */
  pointer-events: auto;
  will-change: background-color;
}

.amu-drawer-overlay.is-non-modal {
  pointer-events: none;
  background-color: transparent;
}

.amu-drawer {
  position: fixed;
  background: var(--amu-bg-color, #fff); /* 兜底值 */
  color: var(--amu-text-color-primary, #333);
  display: flex;
  flex-direction: column;
  box-shadow: var(--amu-box-shadow-dark, 0 16px 48px 16px rgba(0, 0, 0, 0.08));
  transition: width 0.3s, height 0.3s;
  will-change: transform;
  backface-visibility: hidden;
  /* 并行结构下，drawer 单独处理，需要恢复 pointer-events 响应拖拽/内容交互 */
  pointer-events: auto;
}
.amu-drawer.is-dragging {
  transition: none;
  user-select: none;
}

/* 位置样式 */
.amu-drawer--left { top: 0; left: 0; height: 100%; }
.amu-drawer--right { top: 0; right: 0; height: 100%; }
.amu-drawer--top { top: 0; left: 0; width: 100%; }
.amu-drawer--bottom { bottom: 0; left: 0; width: 100%; }

/* 头部/主体/底部区域 */
.amu-drawer__header {
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--amu-border-color-light, #e4e7ed);
}
.amu-drawer__title {
  font-size: 18px;
  line-height: 24px;
  font-weight: 500;
}
.amu-drawer__close {
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 20px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--amu-text-color-regular, #606266);
}
.amu-drawer__close:hover {
  color: var(--amu-color-primary, #409eff);
}

.amu-drawer__body {
  flex: 1;
  padding: 20px;
  overflow: hidden;
}
.amu-drawer__body.is-scrollable {
  overflow-y: auto;
}

.amu-drawer__footer {
  padding: 16px 20px;
  border-top: 1px solid var(--amu-border-color-light, #e4e7ed);
  text-align: right;
}

/* 调整手柄 */
.amu-drawer__resizer {
  position: absolute;
  z-index: 10;
  opacity: 0;
  transition: 0.2s;
}
.amu-drawer__resizer:hover, .amu-drawer.is-dragging .amu-drawer__resizer {
  background: var(--amu-color-primary, #409eff);
  opacity: 0.5;
}

/* 水平方向调整手柄（左侧抽屉调整右边，右侧抽屉调整左边） */
.amu-drawer__resizer--left { right: -5px; top: 0; width: 10px; height: 100%; cursor: col-resize; }
.amu-drawer__resizer--right { left: -5px; top: 0; width: 10px; height: 100%; cursor: col-resize; }

/* 垂直方向调整手柄 */
.amu-drawer__resizer--top { bottom: -5px; left: 0; height: 10px; width: 100%; cursor: row-resize; }
.amu-drawer__resizer--bottom { top: -5px; left: 0; height: 10px; width: 100%; cursor: row-resize; }

/* 过渡动画 */
.amu-drawer-fade-enter-active, .amu-drawer-fade-leave-active { 
  transition: background-color 0.4s cubic-bezier(0.25, 0.8, 0.5, 1); 
}
.amu-drawer-fade-enter-from, .amu-drawer-fade-leave-to { 
  background-color: transparent;
}

.amu-drawer-slide-right-enter-active, .amu-drawer-slide-right-leave-active,
.amu-drawer-slide-left-enter-active, .amu-drawer-slide-left-leave-active,
.amu-drawer-slide-top-enter-active, .amu-drawer-slide-top-leave-active,
.amu-drawer-slide-bottom-enter-active, .amu-drawer-slide-bottom-leave-active {
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* 滑动变换 */
.amu-drawer-slide-right-enter-from, .amu-drawer-slide-right-leave-to { transform: translateX(100%); }
.amu-drawer-slide-left-enter-from, .amu-drawer-slide-left-leave-to { transform: translateX(-100%); }
.amu-drawer-slide-top-enter-from, .amu-drawer-slide-top-leave-to { transform: translateY(-100%); }
.amu-drawer-slide-bottom-enter-from, .amu-drawer-slide-bottom-leave-to { transform: translateY(100%); }
</style>
