import { ref } from 'vue'

export interface DrawerInstance {
  id: number
  close: () => void
  closeOnEsc: boolean
  modal: boolean
}

class DrawerManager {
  private instances = ref<DrawerInstance[]>([])
  private modalCount = ref(0)
  private originalOverflow = ''
  private originalPaddingRight = ''

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', this.handleKeydown)
    }
  }

  add(instance: DrawerInstance) {
    if (this.instances.value.find((inst) => inst.id === instance.id)) return
    
    this.instances.value.push(instance)
    
    if (instance.modal) {
      if (this.modalCount.value === 0) {
        this.lockScroll()
      }
      this.modalCount.value++
    }
  }

  remove(id: number) {
    const instance = this.instances.value.find((inst) => inst.id === id)
    if (!instance) return

    if (instance.modal) {
      this.modalCount.value--
      if (this.modalCount.value === 0) {
        this.unlockScroll()
      }
    }

    this.instances.value = this.instances.value.filter((inst) => inst.id !== id)
  }

  // 如有需要处理更新（例如动态修改 modal 属性）
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updates: Partial<DrawerInstance>) {
     // 如有需要处理更新（例如动态修改 modal 属性）
  }

  private lockScroll() {
    if (typeof document === 'undefined') return
    
    // 计算滚动条宽度
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth
    
    if (scrollBarWidth > 0 || (document.body.scrollHeight > window.innerHeight)) {
      this.originalPaddingRight = document.body.style.paddingRight
      const computedStyle = window.getComputedStyle(document.body)
      const currentPaddingRight = parseFloat(computedStyle.paddingRight) || 0
      
      // 可以选择使用 width: calc(100% - scrollBarWidth) 代替 padding-right
      // 但为了保持简洁，这里坚持使用 padding-right 方案
      // 使用 Math.ceil 避免亚像素抖动
      const barWidth = Math.ceil(scrollBarWidth)
      
      document.body.style.paddingRight = `${currentPaddingRight + barWidth}px`
    }

    this.originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  }

  private unlockScroll() {
    if (typeof document === 'undefined') return
    document.body.style.overflow = this.originalOverflow
    document.body.style.paddingRight = this.originalPaddingRight
  }

  private handleKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      const topInstance = this.instances.value[this.instances.value.length - 1]
      // 仅当栈不为空且栈顶实例允许关闭时执行
      if (topInstance && topInstance.closeOnEsc) {
        topInstance.close()
      }
    }
  }
}

const drawerManager = new DrawerManager()
export default drawerManager
