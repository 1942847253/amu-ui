<template>
  <amu-form :model="form" :label-width="80" label-align="top">
    <!-- Row 1 -->
    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px;">
        <amu-form-item label="First Name" prop="firstName">
            <amu-input v-model="form.firstName" />
        </amu-form-item>
        <amu-form-item label="Middle Name" prop="middleName">
            <amu-input v-model="form.middleName" />
        </amu-form-item>
        <amu-form-item label="Last Name" prop="lastName">
            <amu-input v-model="form.lastName" />
        </amu-form-item>
    </div>

    <!-- Row 2 -->
    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 20px;">
        <amu-form-item label="Address" prop="address">
            <amu-input v-model="form.address" />
        </amu-form-item>
        <amu-form-item label="City" prop="city">
            <amu-input v-model="form.city" />
        </amu-form-item>
    </div>
    
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
import { AmuForm, AmuFormItem, AmuInput, AmuButton } from 'amu-ui'

const form = reactive({
  firstName: '',
  middleName: '',
  lastName: '',
  address: '',
  city: '',
  notes: ''
})
</script>
