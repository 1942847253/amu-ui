<template>
  <amu-radio-group v-model="layout" type="button" style="margin-bottom: 20px;">
    <amu-radio value="horizontal">Horizontal</amu-radio>
    <amu-radio value="vertical">Vertical</amu-radio>
    <amu-radio value="inline">Inline</amu-radio>
  </amu-radio-group>

  <amu-radio-group v-model="labelAlign" type="button" style="margin-bottom: 20px; margin-left: 20px;" v-if="layout !== 'inline'">
    <amu-radio value="right">Right Align</amu-radio>
    <amu-radio value="left">Left Align</amu-radio>
    <amu-radio value="top">Top Align</amu-radio>
  </amu-radio-group>

  <amu-form 
    :model="form" 
    :layout="layout" 
    :label-align="labelAlign"
    :label-width="100"
    :style="layout === 'inline' ? {} : { width: '600px' }"
  >
    <amu-form-item label="Name" prop="name">
      <amu-input v-model="form.name" />
    </amu-form-item>
    <amu-form-item label="Email" prop="email">
      <amu-input v-model="form.email" />
    </amu-form-item>
    <amu-form-item>
      <amu-button type="primary">Submit</amu-button>
    </amu-form-item>
  </amu-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { AmuForm, AmuFormItem, AmuInput, AmuButton, AmuRadioGroup, AmuRadio } from 'amu-ui'
import type { FormLayout, FormLabelAlign } from 'amu-ui'

const form = reactive({
  name: '',
  email: '',
})

const layout = ref<FormLayout>('horizontal')
const labelAlign = ref<FormLabelAlign>('right')
</script>
