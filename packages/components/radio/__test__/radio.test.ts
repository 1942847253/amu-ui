import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import { nextTick, ref } from 'vue'
import { AmuRadio, AmuRadioButton, AmuRadioGroup } from '../index'
import type { RadioValueType } from '../src/props'

describe('Radio', () => {
  test('create', async () => {
    const radio = ref<RadioValueType>('')
    const wrapper = mount(AmuRadio, {
      props: {
        modelValue: radio.value,
        label: 'a',
        'onUpdate:modelValue': async (val: RadioValueType) => {
          radio.value = val
          await wrapper.setProps({ modelValue: val })
        },
      },
    })
    expect(wrapper.classes()).toContain('amu-radio')
    const input = wrapper.find('input')
    await input.setValue(true)
    expect(wrapper.classes()).toContain('is-checked')
    expect(radio.value).toEqual('a')
  })

  test('disabled', async () => {
    const radio = ref<RadioValueType>('')
    const wrapper = mount(AmuRadio, {
      props: {
        modelValue: radio.value,
        label: 'a',
        disabled: true,
      },
    })
    expect(wrapper.classes()).toContain('is-disabled')
    const input = wrapper.find('input')
    await input.setValue(true)
    expect(wrapper.classes()).not.toContain('is-checked')
    expect(radio.value).toEqual('')
  })

  test('border', () => {
    const radio = ref<RadioValueType>('')
    const wrapper = mount(AmuRadio, {
      props: {
        modelValue: radio.value,
        label: 'a',
        border: true,
      },
    })
    expect(wrapper.classes()).toContain('is-bordered')
  })

  test('radio group', async () => {
    const radio = ref<RadioValueType>(3)
    const wrapper = mount({
      components: { AmuRadio, AmuRadioGroup },
      template: `
        <amu-radio-group v-model="radio">
          <amu-radio :label="3" ref="radio1">3</amu-radio>
          <amu-radio :label="6" ref="radio2">6</amu-radio>
          <amu-radio :label="9">9</amu-radio>
        </amu-radio-group>
      `,
      setup() {
        return { radio }
      },
    })
    
    const radio1 = wrapper.findComponent({ ref: 'radio1' })
    const radio2 = wrapper.findComponent({ ref: 'radio2' })
    
    expect(radio1.classes()).toContain('is-checked')
    expect(radio2.classes()).not.toContain('is-checked')
    
    await radio2.find('input').setValue(true)
    expect(radio2.classes()).toContain('is-checked')
    expect(radio.value).toEqual(6)
  })

  test('radio button', async () => {
    const radio = ref<RadioValueType>('a')
    const wrapper = mount({
      components: { AmuRadioButton, AmuRadioGroup },
      template: `
        <amu-radio-group v-model="radio">
          <amu-radio-button label="a" ref="radio1">a</amu-radio-button>
          <amu-radio-button label="b" ref="radio2">b</amu-radio-button>
        </amu-radio-group>
      `,
      setup() {
        return { radio }
      },
    })
    
    const radio1 = wrapper.findComponent({ ref: 'radio1' })
    const radio2 = wrapper.findComponent({ ref: 'radio2' })
    
    expect(radio1.classes()).toContain('is-active')
    await radio2.find('input').setValue(true)
    expect(radio2.classes()).toContain('is-active')
    expect(radio.value).toEqual('b')
  })

  test('change event', async () => {
    const radio = ref<RadioValueType>('')
    const onChange = (val: RadioValueType) => {}
    const wrapper = mount(AmuRadio, {
      props: {
        modelValue: radio.value,
        label: 'a',
        onChange,
        'onUpdate:modelValue': async (val: RadioValueType) => {
          radio.value = val
          await wrapper.setProps({ modelValue: val })
        },
      },
    })
    const input = wrapper.find('input')
    await input.setValue(true)
    expect(wrapper.emitted()).toHaveProperty('change')
    expect(wrapper.emitted('change')![0]).toEqual(['a'])
  })

  test('radio group change event', async () => {
    const radio = ref<RadioValueType>(3)
    const wrapper = mount({
      components: { AmuRadio, AmuRadioGroup },
      template: `
        <amu-radio-group v-model="radio" @change="onChange">
          <amu-radio :label="3">3</amu-radio>
          <amu-radio :label="6">6</amu-radio>
        </amu-radio-group>
      `,
      setup() {
        return { radio, onChange: (val: RadioValueType) => {} }
      },
    })
    
    const radios = wrapper.findAll('.amu-radio')
    await radios[1].find('input').setValue(true)
    expect(wrapper.findComponent(AmuRadioGroup).emitted()).toHaveProperty('change')
    expect(wrapper.findComponent(AmuRadioGroup).emitted('change')![0]).toEqual([6])
  })
})
