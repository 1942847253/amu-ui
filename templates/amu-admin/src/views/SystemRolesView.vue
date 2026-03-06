<template>
  <div class="page-container">
    <AmuCard class="page-card">
      <template #title>角色管理</template>
      <template #extra>
        <AmuButton v-permission="'system:role:write'" type="primary" @click="openCreateDialog">新建角色</AmuButton>
      </template>

      <AmuTable :data="tableData" border>
        <AmuTableColumn prop="name" label="角色名称" />
        <AmuTableColumn prop="code" label="角色编码">
          <template #default="{ row }">
            <AmuTag type="primary">{{ row.code }}</AmuTag>
          </template>
        </AmuTableColumn>
        <AmuTableColumn prop="dataScope" label="数据权限范围" />
        <AmuTableColumn prop="description" label="角色说明" min-width="220" />
        <AmuTableColumn prop="permissionCodes" label="权限点">
          <template #default="{ row }">
            <AmuSpace wrap>
              <AmuTag v-for="permission in row.permissionCodes.slice(0, 3)" :key="permission">{{ permission }}</AmuTag>
              <AmuTag v-if="row.permissionCodes.length > 3" type="warning">+{{ row.permissionCodes.length - 3 }}</AmuTag>
            </AmuSpace>
          </template>
        </AmuTableColumn>
        <AmuTableColumn label="操作" width="240">
          <template #default="{ row }">
            <AmuSpace>
              <AmuButton size="small" @click="openEditDialog(row)">编辑</AmuButton>
              <AmuPopconfirm title="确认删除该角色？" @confirm="handleDeleteRole(row)">
                <template #reference>
                  <AmuButton v-permission="'system:role:write'" size="small">删除</AmuButton>
                </template>
              </AmuPopconfirm>
            </AmuSpace>
          </template>
        </AmuTableColumn>
      </AmuTable>
    </AmuCard>

    <AmuDialog v-model="dialogVisible" title="角色配置" type="custom" :width="720">
      <div class="editor-grid">
        <div class="editor-item">
          <label class="editor-label">角色编码</label>
          <AmuInput v-model="form.code" placeholder="请输入角色编码" />
        </div>
        <div class="editor-item">
          <label class="editor-label">角色名称</label>
          <AmuInput v-model="form.name" placeholder="请输入角色名称" />
        </div>
        <div class="editor-item editor-item--full">
          <label class="editor-label">角色说明</label>
          <AmuInput v-model="form.description" placeholder="请输入角色说明" />
        </div>
        <div class="editor-item">
          <label class="editor-label">数据范围</label>
          <AmuSelect v-model="form.dataScope" placeholder="请选择数据范围">
            <AmuOption label="全部数据" value="ALL" />
            <AmuOption label="本部门" value="DEPARTMENT" />
            <AmuOption label="本部门及子部门" value="DEPARTMENT_AND_CHILDREN" />
            <AmuOption label="仅本人" value="SELF" />
            <AmuOption label="自定义" value="CUSTOM" />
          </AmuSelect>
        </div>
        <div class="editor-item editor-item--full">
          <label class="editor-label">权限点</label>
          <AmuCheckboxGroup v-model="form.permissionCodes" :options="permissionOptions" />
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
import { AmuMessage } from 'amu-ui/message'
import { AmuPopconfirm } from 'amu-ui/popconfirm'
import { AmuOption, AmuSelect } from 'amu-ui/select'
import { AmuSpace } from 'amu-ui/space'
import { AmuTable, AmuTableColumn } from 'amu-ui/table'
import { AmuTag } from 'amu-ui/tag'
import { computed, onMounted, reactive, ref } from 'vue'
import { createRole, deleteRole, fetchPermissions, fetchRoles, updateRole, type AccessPermissionRow, type AccessRoleRow } from '../api/access-control'

defineOptions({
  name: 'SystemRoles'
})

const tableData = ref<AccessRoleRow[]>([])
const permissions = ref<AccessPermissionRow[]>([])
const dialogVisible = ref(false)
const submitting = ref(false)
const editingId = ref('')
const form = reactive({
  code: '',
  name: '',
  description: '',
  dataScope: 'SELF',
  permissionCodes: [] as string[]
})

const permissionOptions = computed(() => permissions.value.map((permission) => ({
  label: `${permission.name} (${permission.code})`,
  value: permission.code
})))

const resetForm = () => {
  editingId.value = ''
  form.code = ''
  form.name = ''
  form.description = ''
  form.dataScope = 'SELF'
  form.permissionCodes = []
}

const loadRoles = async () => {
  try {
    tableData.value = await fetchRoles()
  } catch (error) {
    const message = error instanceof Error ? error.message : '加载角色失败'
    AmuMessage.error({ message })
  }
}

const loadPermissions = async () => {
  try {
    permissions.value = await fetchPermissions()
  } catch (error) {
    const message = error instanceof Error ? error.message : '加载权限点失败'
    AmuMessage.error({ message })
  }
}

const openCreateDialog = () => {
  resetForm()
  dialogVisible.value = true
}

const openEditDialog = (row: AccessRoleRow) => {
  editingId.value = row.id
  form.code = row.code
  form.name = row.name
  form.description = row.description
  form.dataScope = row.dataScope
  form.permissionCodes = [...row.permissionCodes]
  dialogVisible.value = true
}

const submitForm = async () => {
  if (!form.code || !form.name || !form.description) {
    AmuMessage.warning({ message: '请填写完整的角色信息' })
    return
  }

  submitting.value = true
  try {
    const payload = {
      code: form.code,
      name: form.name,
      description: form.description,
      dataScope: form.dataScope,
      permissionCodes: [...form.permissionCodes]
    }
    if (editingId.value) {
      await updateRole(editingId.value, payload)
      AmuMessage.success({ message: '角色已更新' })
    } else {
      await createRole(payload)
      AmuMessage.success({ message: '角色已创建' })
    }
    dialogVisible.value = false
    await loadRoles()
  } catch (error) {
    const message = error instanceof Error ? error.message : '保存角色失败'
    AmuMessage.error({ message })
  } finally {
    submitting.value = false
  }
}

const handleDeleteRole = async (row: AccessRoleRow) => {
  try {
    await deleteRole(row.id)
    AmuMessage.success({ message: '角色已删除' })
    await loadRoles()
  } catch (error) {
    const message = error instanceof Error ? error.message : '删除角色失败'
    AmuMessage.error({ message })
  }
}

onMounted(() => {
  void loadRoles()
  void loadPermissions()
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
</style>
