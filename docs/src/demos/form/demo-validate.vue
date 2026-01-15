<template>
  <amu-form ref="formRef" :model="form" :rules="rules" :style="{ width: '500px' }" @submit.prevent>
    <amu-form-item prop="name" label="Username">
      <amu-input v-model="form.name" placeholder="Please enter name" />
    </amu-form-item>
    <amu-form-item prop="password" label="Password">
      <amu-input v-model="form.password" type="password" placeholder="Please enter password" show-password />
    </amu-form-item>
    <amu-form-item prop="isRead">
      <amu-checkbox v-model="form.isRead">I have read the agreement</amu-checkbox>
    </amu-form-item>
    <amu-form-item>
      <amu-button type="primary" @click="handleSubmit">Login</amu-button>
      <amu-button @click="resetForm" style="margin-left: 10px">Reset</amu-button>
    </amu-form-item>
  </amu-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { AmuForm, AmuFormItem, AmuButton, AmuInput, AmuCheckbox, AmuMessage } from 'amu-ui'
import type { FormInstance, FormRules } from 'amu-ui'

const formRef = ref<FormInstance>()

const form = reactive({
  name: '',
  password: '',
  isRead: false
})

const rules: FormRules = {
  name: [
    { required: true, message: 'Please enter name', trigger: 'blur' },
    { min: 3, max: 10, message: 'Length should be 3 to 10', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Please enter password', trigger: 'blur' }
  ],
  isRead: [
    { 
       validator: (rule, value, callback) => {
          if (!value) {
            callback(new Error('Please check the agreement'))
          } else {
            callback()
          }
       },
       trigger: 'change'
    }
  ]
}

const handleSubmit = async () => {
    try {
        await formRef.value?.validate()
        AmuMessage.success('Validation passed')
    } catch (e) {
        AmuMessage.error('Validation failed')
    }
}

const resetForm = () => {
    formRef.value?.resetFields()
}
</script>
