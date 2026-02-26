import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, nextTick, ref } from 'vue'
import { AmuTable, AmuTableColumn } from '../index'

const globalMountOptions = {
  global: {
    stubs: {
      AmuScrollbar: {
        template: '<div><slot /></div>'
      }
    }
  }
}

describe('AmuTable', () => {
  it('does not mutate incoming columns prop', async () => {
    const sourceColumns = [
      { type: 'selection' as const, label: '选择' },
      { prop: 'name', label: '姓名' }
    ]

    const wrapper = mount(
      defineComponent({
        components: { AmuTable },
        setup() {
          const data = ref([{ id: 1, name: '张三' }])
          const columns = ref(sourceColumns)
          return { data, columns }
        },
        template: `<AmuTable :data="data" :columns="columns" row-key="id" />`
      }),
      globalMountOptions
    )

    await nextTick()

    expect(sourceColumns[0].width).toBeUndefined()
    expect(wrapper.find('.amu-table').exists()).toBe(true)
  })

  it('remounts slot columns without recursive update errors', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    const wrapper = mount(
      defineComponent({
        components: { AmuTable, AmuTableColumn },
        setup() {
          const visible = ref(true)
          const data = ref([{ id: 1, name: '张三' }])
          const toggle = () => {
            visible.value = !visible.value
          }
          return { visible, data, toggle }
        },
        template: `
          <div>
            <button class="toggle" @click="toggle">toggle</button>
            <AmuTable v-if="visible" :data="data" row-key="id">
              <AmuTableColumn prop="name" label="姓名" />
            </AmuTable>
          </div>
        `
      }),
      globalMountOptions
    )

    for (let index = 0; index < 4; index += 1) {
      await wrapper.find('.toggle').trigger('click')
      await nextTick()
      await wrapper.find('.toggle').trigger('click')
      await nextTick()
    }

    const hasRecursiveError = errorSpy.mock.calls.some((call) => {
      return call.some((item) => String(item).includes('Maximum recursive updates exceeded'))
    })

    expect(hasRecursiveError).toBe(false)
    expect(wrapper.find('.amu-table').exists()).toBe(true)

    errorSpy.mockRestore()
  })

  it('switches between users and roles table views without recursive update errors', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    const wrapper = mount(
      defineComponent({
        components: { AmuTable, AmuTableColumn },
        setup() {
          const currentPage = ref<'users' | 'roles'>('users')
          const users = ref([
            { id: 1, name: '张三', role: '管理员' },
            { id: 2, name: '李四', role: '运营' }
          ])
          const roles = ref([
            { id: 'admin', name: '超级管理员', members: 2 },
            { id: 'operator', name: '运营角色', members: 12 }
          ])

          const toUsers = () => {
            currentPage.value = 'users'
          }

          const toRoles = () => {
            currentPage.value = 'roles'
          }

          return {
            currentPage,
            users,
            roles,
            toUsers,
            toRoles
          }
        },
        template: `
          <div>
            <button class="to-users" @click="toUsers">users</button>
            <button class="to-roles" @click="toRoles">roles</button>

            <AmuTable v-if="currentPage === 'users'" :data="users" row-key="id">
              <AmuTableColumn prop="name" label="姓名" />
              <AmuTableColumn prop="role" label="角色" />
            </AmuTable>

            <AmuTable v-else :data="roles" row-key="id">
              <AmuTableColumn prop="name" label="角色名称" />
              <AmuTableColumn prop="members" label="成员数量" />
            </AmuTable>
          </div>
        `
      }),
      globalMountOptions
    )

    for (let index = 0; index < 6; index += 1) {
      await wrapper.find('.to-roles').trigger('click')
      await nextTick()
      await wrapper.find('.to-users').trigger('click')
      await nextTick()
    }

    const hasRecursiveError = errorSpy.mock.calls.some((call) => {
      return call.some((item) => String(item).includes('Maximum recursive updates exceeded'))
    })

    expect(hasRecursiveError).toBe(false)
    expect(wrapper.findAll('.amu-table').length).toBe(1)

    errorSpy.mockRestore()
  })
})
