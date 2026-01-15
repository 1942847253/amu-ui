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
        <div style="display: flex; gap: 10px; width: 100%">
            <amu-input v-model="domain.value" />
            <amu-button @click.prevent="removeDomain(domain)">Delete</amu-button>
        </div>
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
import { AmuForm, AmuFormItem, AmuInput, AmuButton, AmuMessage } from 'amu-ui'
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
