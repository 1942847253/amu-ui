<template>
  <amu-form :model="form" :label-width="80" style="width: 600px">
    <amu-form-item label="Full Name">
        <amu-row :gutter="10" style="width: 100%">
           <amu-col :span="12">
             <amu-form-item prop="name.first" :rules="{ required: true, message: 'First name required', trigger: 'blur' }" style="margin-bottom: 0;">
                  <amu-input v-model="form.name.first" placeholder="First Name" />
             </amu-form-item>
           </amu-col>
           <amu-col :span="12">
             <amu-form-item prop="name.last" :rules="{ required: true, message: 'Last name required', trigger: 'blur' }" style="margin-bottom: 0;">
                  <amu-input v-model="form.name.last" placeholder="Last Name" />
             </amu-form-item>
           </amu-col>
        </amu-row>
    </amu-form-item>

    <amu-form-item label="Address" prop="user.address" :rules="{ required: true, message: 'Address is required'}">
        <amu-input v-model="form.user.address" />
    </amu-form-item>

    <amu-form-item>
        <amu-button type="primary" @click="onSubmit">Submit</amu-button>
    </amu-form-item>
  </amu-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { AmuForm, AmuFormItem, AmuInput, AmuButton, AmuMessage, AmuRow, AmuCol } from 'amu-ui'

const form = reactive({
  name: {
      first: '',
      last: ''
  },
  user: {
      address: ''
  }
})

const onSubmit = () => {
    AmuMessage.info('Check console for form value')
    console.log(form)
}
</script>
