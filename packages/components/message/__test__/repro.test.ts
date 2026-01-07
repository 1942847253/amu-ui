
import { describe, test, expect } from 'vitest'
import { nextTick } from 'vue'
import { Message } from '../src/method'

describe('Message Repro', () => {
  test('loading message should appear and have duration 0', async () => {
    // 模拟 DOM
    document.body.innerHTML = ''
    
    // 调用 loading
    const handle = Message.loading('loading test')
    await nextTick()
    
    // 检查是否渲染
    const messageEl = document.querySelector('.amu-message')
    expect(messageEl).toBeTruthy()
    expect(messageEl?.textContent).toContain('loading test')
    
    // 检查是否是 loading 类型
    const loadingEl = document.querySelector('.amu-message--loading')
    expect(loadingEl).toBeTruthy()

    // 此时不应该自动关闭，所以等待一段时间后应该还在
    await new Promise(resolve => setTimeout(resolve, 100))
    expect(document.querySelector('.amu-message--loading')).toBeTruthy()
    
    // 手动关闭
    handle.close()
    await nextTick()
    // 等待动画结束实际可能需要更多时间，但从 DOM 移除通常由状态驱动
    // 注意：message-manager 使用了 TransitionGroup，由于是在 jsdom 环境，transition 可能不会像浏览器那样工作
    // 但我们可以检查 manager 的状态
  })
})
