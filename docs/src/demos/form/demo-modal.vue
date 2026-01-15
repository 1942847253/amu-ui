<template>
  <amu-button type="primary" @click="visible = true">Open Form Dialog</amu-button>

  <amu-dialog v-model="visible" title="Edit User" width="500px">
    <amu-form ref="formRef" :model="form" :rules="rules" :label-width="80">
      <amu-form-item label="Name" prop="name">
        <amu-input v-model="form.name" />
      </amu-form-item>
      <amu-form-item label="Email" prop="email">
        <amu-input v-model="form.email" />
      </amu-form-item>
      <amu-form-item label="Role" prop="role">
        <amu-select v-model="form.role">
          <amu-option value="admin" label="Admin" />
          <amu-option value="user" label="User" />
        </amu-select>
      </amu-form-item>
    </amu-form>
    
    <template #footer>
      <amu-button @click="handleCancel">Cancel</amu-button>
      <amu-button type="primary" :loading="loading" @click="handleOk">Confirm</amu-button>
    </template>
  </amu-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { AmuForm, AmuFormItem, AmuInput, AmuButton, AmuDialog, AmuSelect, AmuOption, AmuMessage } from 'amu-ui'
import type { FormInstance, FormRules } from 'amu-ui'

const visible = ref(false)
const loading = ref(false)
const formRef = ref<FormInstance>()

const form = reactive({
  name: '',
  email: '',
  role: ''
})

const rules: FormRules = {
  name: [{ required: true, message: 'Name is required' }],
  email: [{ required: true, message: 'Email is required' }, { type: 'email', message: 'Invalid email' }],
  role: [{ required: true, message: 'Role is required' }]
}

const handleOk = async () => {
    try {
        await formRef.value?.validate()
        loading.value = true
        // Simulate async request
        setTimeout(() => {
            loading.value = false
            visible.value = false
            AmuMessage.success('Saved successfully')
        }, 1000)
    } catch {
        // Validation failed
    }
}

const handleCancel = () => {
    visible.value = false
}

// Reset form when dialog opens
watch(visible, (val) => {
    if (val) {
        // Wait for DOM
        setTimeout(() => {
            formRef.value?.resetFields()
        }, 0)
    }
})
</script>
