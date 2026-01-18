import { describe, test, expect, afterEach } from 'vitest'
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import AmuLoading from '../src/loading'
import AmuLoadingService from '../src/service'
import { vLoading } from '../src/directive'

describe('Loading', () => {
    test('create', async () => {
        const wrapper = mount(AmuLoading, {
            props: {
                visible: true,
                text: 'Loading...'
            }
        })
        expect(wrapper.find('.amu-loading-text').text()).toBe('Loading...')
        expect(wrapper.find('.amu-loading-mask').isVisible()).toBe(true)
    })

    test('service', async () => {
        const instance = AmuLoadingService({
            text: 'Loading Service',
            fullscreen: true
        })
        
        expect(document.querySelector('.amu-loading-mask')).toBeTruthy()
        expect(document.querySelector('.amu-loading-text')?.textContent).toBe('Loading Service')

        instance.close()
        // wait for transition
        await new Promise(r => setTimeout(r, 400))
        expect(document.querySelector('.amu-loading-mask')).toBeFalsy()
    })

    test('directive', async () => {
        const Comp = {
            template: `<div v-loading="loading">Content</div>`,
            directives: {
                loading: vLoading
            },
            data() {
                return {
                    loading: false
                }
            }
        }
        
        const wrapper = mount(Comp)
        expect(wrapper.find('.amu-loading-mask').exists()).toBe(false)
        
        await wrapper.setData({ loading: true })
        expect(wrapper.find('.amu-loading-mask').exists()).toBe(true)
    })
})
