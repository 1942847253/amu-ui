<template>
  <amu-form ref="formRef" :model="form" :label-width="100" style="width: 600px">
    <amu-form-item
      v-for="(domain, index) in form.domains"
      :key="domain.key"
      :label="'Domain ' + index"
      :prop="'domains.' + index + '.value'"
      :rules="{
        required: true,
        message: 'Domain can not be null',
        trigger: 'blur',
      }"
    >
        <amu-row :gutter="10" style="width: 100%">
            <amu-col :span="20">
                <amu-input v-model="domain.value" />
            </amu-col>
            <amu-col :span="4">
                <amu-button @click.prevent="removeDomain(domain)" style="width: 100%">Delete</amu-button>
            </amu-col>
        </amu-row>
    </amu-form-item>
    <amu-form-item>
      <amu-button type="primary" @click="submitForm">Submit</amu-button>
      <amu-button @click="addDomain" style="margin-left: 10px;">Add Domain</amu-button>
      <amu-button @click="resetForm" style="margin-left: 10px;">Reset</amu-button>
    </amu-form-item>
  </amu-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { AmuForm, AmuFormItem, AmuInput, AmuButton, AmuMessage, AmuRow, AmuCol } from 'amu-ui'
import type { FormInstance } from 'amu-ui'

interface DomainItem {
  key: number
  value: string
}

const formRef = ref<FormInstance>()
const form = reactive<{ domains: DomainItem[] }>({
  domains: [
    {
      key: 1,
      value: '',
    },
  ],
})

const removeDomain = (item: DomainItem) => {
  const index = form.domains.indexOf(item)
  if (index !== -1) {
    form.domains.splice(index, 1)
  }
}

const addDomain = () => {
  form.domains.push({
    key: Date.now(),
    value: '',
  })
}

const submitForm = async () => {
    try {
        await formRef.value?.validate()
        AmuMessage.success('Validation passed')
    } catch (error) {
        console.error('Validation failed', error)
    }
}

const resetForm = () => {
  formRef.value?.resetFields()
}
</script>
