<template>
  <div class="page-container">
    <AmuCard class="page-card">
      <template #title>用户管理</template>
      <template #extra>
        <AmuSpace>
          <AmuInput v-model="keyword" placeholder="搜索姓名、账号或邮箱" clearable />
          <AmuButton v-permission="'system:user:write'" type="primary" @click="openCreateDialog">新建用户</AmuButton>
        </AmuSpace>
      </template>
      <AmuTable :data="tableData" border stripe>
        <AmuTableColumn prop="displayName" label="姓名" min-width="120" />
        <AmuTableColumn prop="username" label="账号" min-width="120" />
        <AmuTableColumn prop="department" label="部门" min-width="140" />
        <AmuTableColumn prop="title" label="岗位" min-width="140" />
        <AmuTableColumn prop="roleCodes" label="角色">
          <template #default="{ row }">
            <AmuSpace wrap>
              <AmuTag v-for="role in row.roleCodes" :key="role" type="primary">{{ role }}</AmuTag>
            </AmuSpace>
          </template>
        </AmuTableColumn>
        <AmuTableColumn prop="status" label="状态">
          <template #default="{ row }">
            <AmuTag :type="row.status === 'ACTIVE' ? 'success' : 'danger'">{{ row.status === 'ACTIVE' ? '启用' : '锁定' }}</AmuTag>
          </template>
        </AmuTableColumn>
        <AmuTableColumn prop="email" label="邮箱" min-width="220" />
        <AmuTableColumn label="操作" width="340">
          <template #default="{ row }">
            <AmuSpace wrap>
              <AmuButton size="small" @click="openEditDialog(row)">编辑</AmuButton>
              <AmuPopconfirm :title="row.status === 'ACTIVE' ? '确认锁定该用户？' : '确认启用该用户？'" @confirm="handleStatusToggle(row)">
                <template #reference>
                  <AmuButton v-permission="'system:user:write'" size="small">{{ row.status === 'ACTIVE' ? '锁定' : '启用' }}</AmuButton>
                </template>
              </AmuPopconfirm>
              <AmuPopconfirm title="确认将该用户密码重置为 123456 吗？" @confirm="handleResetPassword(row)">
                <template #reference>
                  <AmuButton v-permission="'system:user:write'" size="small">重置密码</AmuButton>
                </template>
              </AmuPopconfirm>
              <AmuPopconfirm title="确认删除该用户？" @confirm="handleDeleteUser(row)">
                <template #reference>
                  <AmuButton v-permission="'system:user:write'" size="small">删除</AmuButton>
                </template>
              </AmuPopconfirm>
            </AmuSpace>
          </template>
        </AmuTableColumn>
      </AmuTable>
    </AmuCard>

    <AmuDialog v-model="dialogVisible" title="用户配置" type="custom" :width="760">
      <div class="editor-grid">
        <div class="editor-item">
          <label class="editor-label">账号</label>
          <AmuInput v-model="form.username" placeholder="请输入账号" />
        </div>
        <div class="editor-item">
          <label class="editor-label">姓名</label>
          <AmuInput v-model="form.displayName" placeholder="请输入姓名" />
        </div>
        <div class="editor-item">
          <label class="editor-label">邮箱</label>
          <AmuInput v-model="form.email" placeholder="请输入邮箱" />
        </div>
        <div class="editor-item">
          <label class="editor-label">岗位</label>
          <AmuInput v-model="form.title" placeholder="请输入岗位" />
        </div>
        <div class="editor-item">
          <label class="editor-label">部门</label>
          <AmuSelect v-model="form.departmentId" placeholder="请选择部门">
            <AmuOption v-for="department in departments" :key="department.id" :label="department.name" :value="department.id" />
          </AmuSelect>
        </div>
        <div class="editor-item">
          <label class="editor-label">密码</label>
          <AmuInput v-model="form.password" type="password" :placeholder="editingId ? '留空则不修改密码' : '请输入初始密码'" />
        </div>
        <div class="editor-item editor-item--full">
          <label class="editor-label">角色</label>
          <AmuCheckboxGroup v-model="form.roleCodes" :options="roleOptions" />
        </div>
        <div class="editor-item editor-item--full">
          <label class="editor-label">直授权限</label>
          <AmuCheckboxGroup v-model="form.directPermissionCodes" :options="permissionOptions" />
        </div>
        <div class="editor-item">
          <label class="editor-label">状态</label>
          <div class="editor-switch">
            <AmuSwitch v-model="statusEnabled" />
            <span>{{ statusEnabled ? '启用' : '锁定' }}</span>
          </div>
        </div>
      </div>

      <template #footer>
        <AmuSpace>
          <AmuButton @click="dialogVisible = false">取消</AmuButton>
          <AmuButton type="primary" :loading="submitting" @click="submitForm">保存</AmuButton>
        </AmuSpace>
      </template>
    </AmuDialog>
  </div>
</template>

<script setup lang="ts">
import { AmuButton } from 'amu-ui/button'
import { AmuCard } from 'amu-ui/card'
import { AmuCheckboxGroup } from 'amu-ui/checkbox'
import { AmuDialog } from 'amu-ui/dialog'
import { AmuInput } from 'amu-ui/input'
import { AmuOption, AmuSelect } from 'amu-ui/select'
import { AmuPopconfirm } from 'amu-ui/popconfirm'
import { AmuSpace } from 'amu-ui/space'
import { AmuSwitch } from 'amu-ui/switch'
import { AmuTable, AmuTableColumn } from 'amu-ui/table'
import { AmuTag } from 'amu-ui/tag'
import { AmuMessage } from 'amu-ui/message'
import { computed, onMounted, reactive, ref } from 'vue'
import { createUser, deleteUser, fetchDepartments, fetchPermissions, fetchRoles, fetchUsers, resetUserPassword, setUserStatus, updateUser, type AccessDepartmentRow, type AccessPermissionRow, type AccessRoleRow, type AccessUserRow } from '../api/access-control'

defineOptions({
  name: 'SystemUsers'
})

const keyword = ref('')
const rawData = ref<AccessUserRow[]>([])
const roles = ref<AccessRoleRow[]>([])
const permissions = ref<AccessPermissionRow[]>([])
const departments = ref<AccessDepartmentRow[]>([])
const dialogVisible = ref(false)
const submitting = ref(false)
const editingId = ref('')
const statusEnabled = ref(true)
const form = reactive({
  username: '',
  displayName: '',
  email: '',
  departmentId: '',
  title: '',
  roleCodes: [] as string[],
  directPermissionCodes: [] as string[],
  password: ''
})

const roleOptions = computed(() => roles.value.map((role) => ({ label: `${role.name} (${role.code})`, value: role.code })))
const permissionOptions = computed(() => permissions.value.map((permission) => ({ label: `${permission.name} (${permission.code})`, value: permission.code })))

const resetForm = () => {
  editingId.value = ''
  form.username = ''
  form.displayName = ''
  form.email = ''
  form.departmentId = departments.value[0]?.id || ''
  form.title = ''
  form.roleCodes = []
  form.directPermissionCodes = []
  form.password = ''
  statusEnabled.value = true
}

const loadUsers = async () => {
  try {
    rawData.value = await fetchUsers()
  } catch (error) {
    const message = error instanceof Error ? error.message : '加载用户失败'
    AmuMessage.error({ message })
  }
}

const loadMetadata = async () => {
  try {
    const [nextRoles, nextPermissions, nextDepartments] = await Promise.all([
      fetchRoles(),
      fetchPermissions(),
      fetchDepartments()
    ])
    roles.value = nextRoles
    permissions.value = nextPermissions
    departments.value = nextDepartments
    if (!form.departmentId) {
      form.departmentId = nextDepartments[0]?.id || ''
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : '加载用户元数据失败'
    AmuMessage.error({ message })
  }
}

const openCreateDialog = () => {
  resetForm()
  dialogVisible.value = true
}

const openEditDialog = (row: AccessUserRow) => {
  editingId.value = row.id
  form.username = row.username
  form.displayName = row.displayName
  form.email = row.email
  form.departmentId = departments.value.find((department) => department.name === row.department)?.id || departments.value[0]?.id || ''
  form.title = row.title
  form.roleCodes = [...row.roleCodes]
  form.directPermissionCodes = [...row.directPermissionCodes]
  form.password = ''
  statusEnabled.value = row.status === 'ACTIVE'
  dialogVisible.value = true
}

const submitForm = async () => {
  if (!form.username || !form.displayName || !form.email || !form.departmentId || !form.title) {
    AmuMessage.warning({ message: '请填写完整的用户信息' })
    return
  }
  if (form.roleCodes.length === 0) {
    AmuMessage.warning({ message: '请至少分配一个角色' })
    return
  }

  submitting.value = true
  try {
    const payload = {
      username: form.username,
      displayName: form.displayName,
      email: form.email,
      departmentId: form.departmentId,
      title: form.title,
      status: statusEnabled.value ? 'ACTIVE' as const : 'LOCKED' as const,
      roleCodes: [...form.roleCodes],
      directPermissionCodes: [...form.directPermissionCodes],
      password: form.password || undefined
    }

    if (editingId.value) {
      await updateUser(editingId.value, payload)
      AmuMessage.success({ message: '用户已更新' })
    } else {
      await createUser(payload)
      AmuMessage.success({ message: '用户已创建' })
    }

    dialogVisible.value = false
    await loadUsers()
  } catch (error) {
    const message = error instanceof Error ? error.message : '保存用户失败'
    AmuMessage.error({ message })
  } finally {
    submitting.value = false
  }
}

const handleStatusToggle = async (row: AccessUserRow) => {
  try {
    await setUserStatus(row.id, row.status === 'ACTIVE' ? 'LOCKED' : 'ACTIVE')
    AmuMessage.success({ message: row.status === 'ACTIVE' ? '用户已锁定' : '用户已启用' })
    await loadUsers()
  } catch (error) {
    const message = error instanceof Error ? error.message : '更新用户状态失败'
    AmuMessage.error({ message })
  }
}

const handleResetPassword = async (row: AccessUserRow) => {
  try {
    const result = await resetUserPassword(row.id)
    AmuMessage.success({ message: `密码已重置，临时密码：${result.temporaryPassword}` })
  } catch (error) {
    const message = error instanceof Error ? error.message : '重置密码失败'
    AmuMessage.error({ message })
  }
}

const handleDeleteUser = async (row: AccessUserRow) => {
  try {
    await deleteUser(row.id)
    AmuMessage.success({ message: '用户已删除' })
    await loadUsers()
  } catch (error) {
    const message = error instanceof Error ? error.message : '删除用户失败'
    AmuMessage.error({ message })
  }
}

const tableData = computed(() => {
  if (!keyword.value) return rawData.value
  return rawData.value.filter((item) => {
    const value = keyword.value.trim()
    return item.displayName.includes(value) || item.username.includes(value) || item.email.includes(value)
  })
})

onMounted(() => {
  void loadUsers()
  void loadMetadata()
})
</script>

<style scoped>
.editor-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.editor-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.editor-item--full {
  grid-column: 1 / -1;
}

.editor-label {
  font-size: 13px;
  color: var(--amu-color-text-secondary);
}

.editor-switch {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 36px;
}
</style>
