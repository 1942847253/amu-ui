<template>
  <div class="page-container">
    <AmuCard class="page-card">
      <template #title>权限点管理</template>
      <template #extra>
        <AmuSpace>
          <AmuInput v-model="keyword" placeholder="搜索权限编码、名称或模块" clearable />
          <AmuButton v-permission="'system:permission:write'" type="primary" @click="openCreateDialog">新建权限点</AmuButton>
        </AmuSpace>
      </template>

      <AmuTable :data="tableData" border stripe>
        <AmuTableColumn prop="code" label="权限编码" min-width="220">
          <template #default="{ row }">
            <AmuTag type="primary">{{ row.code }}</AmuTag>
          </template>
        </AmuTableColumn>
        <AmuTableColumn prop="name" label="权限名称" min-width="180" />
        <AmuTableColumn prop="module" label="归属模块" min-width="140" />
        <AmuTableColumn prop="apiScopes" label="接口范围" min-width="320">
          <template #default="{ row }">
            <AmuSpace wrap>
              <AmuTag v-for="scope in row.apiScopes.slice(0, 2)" :key="scope">{{ scope }}</AmuTag>
              <AmuTag v-if="row.apiScopes.length > 2" type="warning">+{{ row.apiScopes.length - 2 }}</AmuTag>
            </AmuSpace>
          </template>
        </AmuTableColumn>
        <AmuTableColumn label="操作" width="240">
          <template #default="{ row }">
            <AmuSpace>
              <AmuButton size="small" @click="openEditDialog(row)">编辑</AmuButton>
              <AmuPopconfirm title="确认删除该权限点？" @confirm="handleDeletePermission(row)">
                <template #reference>
                  <AmuButton v-permission="'system:permission:write'" size="small">删除</AmuButton>
                </template>
              </AmuPopconfirm>
            </AmuSpace>
          </template>
        </AmuTableColumn>
      </AmuTable>
    </AmuCard>

    <AmuDialog v-model="dialogVisible" title="权限点配置" type="custom" :width="720">
      <div class="editor-grid">
        <div class="editor-item">
          <label class="editor-label">权限编码</label>
          <AmuInput v-model="form.code" placeholder="例如 system:user:read" />
        </div>
        <div class="editor-item">
          <label class="editor-label">权限名称</label>
          <AmuInput v-model="form.name" placeholder="请输入权限名称" />
        </div>
        <div class="editor-item editor-item--full">
          <label class="editor-label">归属模块</label>
          <AmuInput v-model="form.module" placeholder="例如 iam" />
        </div>
        <div class="editor-item editor-item--full">
          <label class="editor-label">接口范围</label>
          <AmuTextarea v-model="apiScopesText" :rows="6" placeholder="每行一个接口范围，例如 GET:/api/access-control/users" />
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
import { AmuDialog } from 'amu-ui/dialog'
import { AmuInput } from 'amu-ui/input'
import { AmuMessage } from 'amu-ui/message'
import { AmuPopconfirm } from 'amu-ui/popconfirm'
import { AmuSpace } from 'amu-ui/space'
import { AmuTable, AmuTableColumn } from 'amu-ui/table'
import { AmuTag } from 'amu-ui/tag'
import { AmuTextarea } from 'amu-ui/textarea'
import { computed, onMounted, reactive, ref } from 'vue'
import { createPermission, deletePermission, fetchPermissions, updatePermission, type AccessPermissionRow } from '../api/access-control'

defineOptions({
  name: 'SystemPermissions'
})

const keyword = ref('')
const rows = ref<AccessPermissionRow[]>([])
const dialogVisible = ref(false)
const submitting = ref(false)
const editingCode = ref('')
const apiScopesText = ref('')
const form = reactive({
  code: '',
  name: '',
  module: ''
})

const loadPermissions = async () => {
  try {
    rows.value = await fetchPermissions()
  } catch (error) {
    const message = error instanceof Error ? error.message : '加载权限点失败'
    AmuMessage.error({ message })
  }
}

const tableData = computed(() => {
  if (!keyword.value.trim()) return rows.value
  const value = keyword.value.trim()
  return rows.value.filter((item) => item.code.includes(value) || item.name.includes(value) || item.module.includes(value))
})

const openCreateDialog = () => {
  editingCode.value = ''
  form.code = ''
  form.name = ''
  form.module = ''
  apiScopesText.value = ''
  dialogVisible.value = true
}

const openEditDialog = (row: AccessPermissionRow) => {
  editingCode.value = row.code
  form.code = row.code
  form.name = row.name
  form.module = row.module
  apiScopesText.value = row.apiScopes.join('\n')
  dialogVisible.value = true
}

const submitForm = async () => {
  if (!form.code || !form.name || !form.module) {
    AmuMessage.warning({ message: '请填写完整的权限点信息' })
    return
  }

  const apiScopes = apiScopesText.value.split(/\r?\n|,/).map((item) => item.trim()).filter(Boolean)
  submitting.value = true
  try {
    const payload = {
      code: form.code,
      name: form.name,
      module: form.module,
      apiScopes
    }
    if (editingCode.value) {
      await updatePermission(editingCode.value, payload)
      AmuMessage.success({ message: '权限点已更新' })
    } else {
      await createPermission(payload)
      AmuMessage.success({ message: '权限点已创建' })
    }
    dialogVisible.value = false
    await loadPermissions()
  } catch (error) {
    const message = error instanceof Error ? error.message : '保存权限点失败'
    AmuMessage.error({ message })
  } finally {
    submitting.value = false
  }
}

const handleDeletePermission = async (row: AccessPermissionRow) => {
  try {
    await deletePermission(row.code)
    AmuMessage.success({ message: '权限点已删除' })
    await loadPermissions()
  } catch (error) {
    const message = error instanceof Error ? error.message : '删除权限点失败'
    AmuMessage.error({ message })
  }
}

onMounted(() => {
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