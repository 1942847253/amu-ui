<template>
  <amu-form ref="formRef" :model="form" :rules="rules" :label-width="120" style="width: 600px">
    <amu-row :gutter="20">
      <amu-col :span="12">
        <amu-form-item label="Password" prop="pass">
          <amu-input v-model="form.pass" type="password" show-password autocomplete="off" />
        </amu-form-item>
      </amu-col>
      <amu-col :span="12">
        <amu-form-item label="Confirm" prop="checkPass">
          <amu-input v-model="form.checkPass" type="password" show-password autocomplete="off" />
        </amu-form-item>
      </amu-col>
    </amu-row>
    <amu-form-item label="Age" prop="age">
      <amu-input-number v-model="form.age" />
    </amu-form-item>
    <amu-form-item>
      <amu-button type="primary" @click="submitForm">Submit</amu-button>
      <amu-button @click="resetForm" style="margin-left: 10px;">Reset</amu-button>
    </amu-form-item>
  </amu-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { AmuForm, AmuFormItem, AmuInput, AmuInputNumber, AmuButton, AmuMessage, AmuRow, AmuCol } from 'amu-ui'
import type { FormInstance, FormRules } from 'amu-ui'

const formRef = ref<FormInstance>()

const form = reactive({
  pass: '',
  checkPass: '',
  age: 18,
})

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (form.checkPass !== '') {
      formRef.value?.validateField('checkPass')
    }
    callback()
  }
}

const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== form.pass) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}

const checkAge = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('Please enter the age'))
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error('Please enter digits'))
    } else {
      if (value < 18) {
        callback(new Error('Age must be greater than 18'))
      } else {
        callback()
      }
    }
  }, 1000)
}

const rules = reactive<FormRules>({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
  age: [{ validator: checkAge, trigger: 'blur' }],
})

const submitForm = async () => {
    try {
        await formRef.value?.validate()
        AmuMessage.success('Validation passed')
    } catch {
        AmuMessage.error('Validation failed')
    }
}

const resetForm = () => {
  formRef.value?.resetFields()
}
</script>
