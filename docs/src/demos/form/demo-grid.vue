<template>
  <amu-form :model="form" :label-width="80" label-align="top">
    <!-- Row 1 -->
    <amu-row :gutter="20">
      <amu-col :span="8">
        <amu-form-item label="First Name" prop="firstName">
            <amu-input v-model="form.firstName" />
        </amu-form-item>
      </amu-col>
      <amu-col :span="8">
        <amu-form-item label="Middle Name" prop="middleName">
            <amu-input v-model="form.middleName" />
        </amu-form-item>
      </amu-col>
      <amu-col :span="8">
        <amu-form-item label="Last Name" prop="lastName">
            <amu-input v-model="form.lastName" />
        </amu-form-item>
      </amu-col>
    </amu-row>

    <!-- Row 2 -->
    <amu-row :gutter="20">
      <amu-col :span="16">
        <amu-form-item label="Address" prop="address">
            <amu-input v-model="form.address" />
        </amu-form-item>
      </amu-col>
      <amu-col :span="8">
        <amu-form-item label="City" prop="city">
            <amu-input v-model="form.city" />
        </amu-form-item>
      </amu-col>
    </amu-row>
    
    <amu-form-item label="Notes" prop="notes">
        <amu-input v-model="form.notes" type="textarea" />
    </amu-form-item>

    <amu-form-item>
        <amu-button type="primary">Submit</amu-button>
    </amu-form-item>
  </amu-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { AmuForm, AmuFormItem, AmuInput, AmuButton, AmuRow, AmuCol } from 'amu-ui'

const form = reactive({
  firstName: '',
  middleName: '',
  lastName: '',
  address: '',
  city: '',
  notes: ''
})
</script>
