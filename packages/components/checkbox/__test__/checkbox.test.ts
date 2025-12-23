import { describe, it, expect, vi } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import { AmuCheckbox, AmuCheckboxGroup } from '../index'

describe('Checkbox', () => {
  it('应该正确渲染', () => {
    const wrapper = mount(AmuCheckbox, {
      props: {
        label: '测试复选框',
      },
    })
    expect(wrapper.find('.amu-checkbox').exists()).toBe(true)
    expect(wrapper.text()).toContain('测试复选框')
  })

  it('应该支持 v-model', async () => {
    const wrapper: VueWrapper<any> = mount(AmuCheckbox, {
      props: {
        modelValue: false,
        'onUpdate:modelValue': (value: boolean | string | number) =>
          wrapper.setProps({ modelValue: value }),
      },
    })

    expect(wrapper.find('.amu-checkbox').classes()).not.toContain('is-checked')

    await wrapper.find('input').setValue(true)
    await wrapper.vm.$nextTick()

    expect(wrapper.props('modelValue')).toBe(true)
  })

  it('应该支持禁用状态', () => {
    const wrapper = mount(AmuCheckbox, {
      props: {
        disabled: true,
      },
    })

    expect(wrapper.find('.amu-checkbox').classes()).toContain('is-disabled')
    expect(wrapper.find('input').element.disabled).toBe(true)
  })

  it('应该支持半选状态', () => {
    const wrapper = mount(AmuCheckbox, {
      props: {
        indeterminate: true,
      },
    })

    expect(wrapper.find('.amu-checkbox').classes()).toContain('is-indeterminate')
    expect(wrapper.find('input').attributes('aria-checked')).toBe('mixed')
  })

  it('应该支持不同尺寸', () => {
    const wrapper = mount(AmuCheckbox, {
      props: {
        size: 'large',
      },
    })

    expect(wrapper.find('.amu-checkbox').classes()).toContain(
      'amu-checkbox--large'
    )
  })

  it('应该支持错误状态', () => {
    const wrapper = mount(AmuCheckbox, {
      props: {
        error: true,
      },
    })

    expect(wrapper.find('.amu-checkbox').classes()).toContain('is-error')
  })

  it('应该触发 change 事件', async () => {
    const onChange = vi.fn()
    const wrapper = mount(AmuCheckbox, {
      props: {
        modelValue: false,
        onChange,
      },
    })

    await wrapper.find('input').setValue(true)
    expect(onChange).toHaveBeenCalledWith(true, undefined)
  })

  it('应该触发 click 事件', async () => {
    const onClick = vi.fn()
    const wrapper = mount(AmuCheckbox, {
      props: {
        onClick,
      },
    })

    await wrapper.find('.amu-checkbox').trigger('click')
    expect(onClick).toHaveBeenCalled()
  })

  it('应该支持默认插槽', () => {
    const wrapper = mount(AmuCheckbox, {
      slots: {
        default: '<span>自定义内容</span>',
      },
    })

    expect(wrapper.html()).toContain('自定义内容')
  })

  it('禁用状态下不应该触发 change 事件', async () => {
    const onChange = vi.fn()
    const wrapper = mount(AmuCheckbox, {
      props: {
        disabled: true,
        onChange,
      },
    })

    await wrapper.find('input').trigger('change')
    expect(onChange).not.toHaveBeenCalled()
  })
})

describe('CheckboxGroup', () => {
  it('应该正确渲染', () => {
    const wrapper = mount(AmuCheckboxGroup, {
      props: {
        modelValue: [],
      },
    })
    expect(wrapper.find('.amu-checkbox-group').exists()).toBe(true)
  })

  it('应该支持 options 快速生成', () => {
    const options = [
      { label: '选项1', value: '1' },
      { label: '选项2', value: '2' },
      { label: '选项3', value: '3' },
    ]
    const wrapper = mount(AmuCheckboxGroup, {
      props: {
        modelValue: [],
        options,
      },
    })

    const checkboxes = wrapper.findAllComponents(AmuCheckbox)
    expect(checkboxes.length).toBe(3)
    expect(checkboxes[0].props('label')).toBe('选项1')
  })

  it('应该支持 v-model', async () => {
    const wrapper: VueWrapper<any> = mount(AmuCheckboxGroup, {
      props: {
        modelValue: ['1'],
        options: [
          { label: '选项1', value: '1' },
          { label: '选项2', value: '2' },
        ],
        'onUpdate:modelValue': (value: Array<string | number>) =>
          wrapper.setProps({ modelValue: value }),
      },
    })

    const checkboxes = wrapper.findAllComponents(AmuCheckbox)
    expect(checkboxes[0].classes()).toContain('is-checked')
    expect(checkboxes[1].classes()).not.toContain('is-checked')
  })

  it('应该支持最大选中数量限制', async () => {
    const onUpdateModelValue = vi.fn()
    const wrapper = mount(AmuCheckboxGroup, {
      props: {
        modelValue: ['1'],
        max: 2,
        options: [
          { label: '选项1', value: '1' },
          { label: '选项2', value: '2' },
          { label: '选项3', value: '3' },
        ],
        'onUpdate:modelValue': onUpdateModelValue,
      },
    })

    // 选中第二个
    const checkboxes = wrapper.findAllComponents(AmuCheckbox)
    await checkboxes[1].find('input').setValue(true)
    expect(onUpdateModelValue).toHaveBeenCalledWith(['1', '2'])

    // 尝试选中第三个（应该被限制）
    onUpdateModelValue.mockClear()
    await wrapper.setProps({ modelValue: ['1', '2'] })
    await checkboxes[2].find('input').setValue(true)
    // 因为已经达到 max，不应该触发更新
    expect(onUpdateModelValue).not.toHaveBeenCalled()
  })

  it('应该支持最小选中数量限制', async () => {
    const onUpdateModelValue = vi.fn()
    const wrapper = mount(AmuCheckboxGroup, {
      props: {
        modelValue: ['1', '2'],
        min: 1,
        options: [
          { label: '选项1', value: '1' },
          { label: '选项2', value: '2' },
        ],
        'onUpdate:modelValue': onUpdateModelValue,
      },
    })

    // 取消选中第一个
    const checkboxes = wrapper.findAllComponents(AmuCheckbox)
    await checkboxes[0].find('input').setValue(false)
    expect(onUpdateModelValue).toHaveBeenCalledWith(['2'])

    // 尝试取消选中第二个（应该被限制）
    onUpdateModelValue.mockClear()
    await wrapper.setProps({ modelValue: ['2'] })
    await checkboxes[1].find('input').setValue(false)
    // 因为已经达到 min，不应该触发更新
    expect(onUpdateModelValue).not.toHaveBeenCalled()
  })

  it('应该支持禁用整组', () => {
    const wrapper = mount(AmuCheckboxGroup, {
      props: {
        modelValue: [],
        disabled: true,
        options: [
          { label: '选项1', value: '1' },
          { label: '选项2', value: '2' },
        ],
      },
    })

    const checkboxes = wrapper.findAllComponents(AmuCheckbox)
    checkboxes.forEach((checkbox) => {
      expect(checkbox.classes()).toContain('is-disabled')
    })
  })

  it('应该支持不同尺寸', () => {
    const wrapper = mount(AmuCheckboxGroup, {
      props: {
        modelValue: [],
        size: 'large',
        options: [{ label: '选项1', value: '1' }],
      },
    })

    expect(wrapper.find('.amu-checkbox-group').classes()).toContain(
      'amu-checkbox-group--large'
    )
  })

  it('应该触发 change 事件', async () => {
    const onChange = vi.fn()
    const wrapper = mount(AmuCheckboxGroup, {
      props: {
        modelValue: [],
        options: [{ label: '选项1', value: '1' }],
        onChange,
      },
    })

    const checkbox = wrapper.findComponent(AmuCheckbox)
    await checkbox.find('input').setValue(true)
    expect(onChange).toHaveBeenCalledWith(['1'])
  })

  it('应该支持默认插槽', () => {
    const wrapper = mount(AmuCheckboxGroup, {
      props: {
        modelValue: [],
      },
      slots: {
        default: '<div class="custom-checkbox">自定义</div>',
      },
    })

    expect(wrapper.find('.custom-checkbox').exists()).toBe(true)
  })
})
