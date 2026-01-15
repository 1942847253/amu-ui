<template>
  <amu-form :model="form" :style="{ width: '500px' }">
    <amu-form-item 
      prop="name" 
      label="Name" 
    >
      <amu-input v-model="form.name" />
    </amu-form-item>
    <amu-form-item 
      prop="age" 
      label="Age"
    >
        <amu-input-number v-model="form.age" />
    </amu-form-item>
    <amu-form-item>
      <amu-button type="primary" @click="onSubmit">Create</amu-button>
      <amu-button style="margin-left: 10px">Cancel</amu-button>
    </amu-form-item>
  </amu-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { AmuForm, AmuFormItem, AmuButton, AmuInput, AmuInputNumber, AmuMessage } from 'amu-ui'

const form = reactive({
  name: '',
  age: 18,
})

const onSubmit = () => {
  console.log(form)
  AmuMessage.success('Submitted!')
}
</script>
