<template>
  <div>
    <amu-radio-group v-model="size" type="button" style="margin-bottom: 20px;">
      <amu-radio value="mini">Mini</amu-radio>
      <amu-radio value="small">Small</amu-radio>
      <amu-radio value="medium">Medium</amu-radio>
      <amu-radio value="large">Large</amu-radio>
    </amu-radio-group>
    
    <div style="margin-bottom: 20px">
        <span style="margin-right: 10px">Disabled:</span>
        <amu-switch v-model="disabled" />
    </div>

    <amu-form :model="form" :size="size" :disabled="disabled" :label-width="100" style="width: 600px">
      <amu-form-item label="Input" prop="input">
        <amu-input v-model="form.input" placeholder="Input..." />
      </amu-form-item>
      
      <amu-form-item label="Select" prop="select">
        <amu-select v-model="form.select" placeholder="Select...">
           <amu-option value="1" label="Option 1" />
           <amu-option value="2" label="Option 2" />
        </amu-select>
      </amu-form-item>

      <amu-form-item label="Date" prop="date">
         <amu-date-picker v-model="form.date" />
      </amu-form-item>

      <amu-form-item label="Number" prop="number">
         <amu-input-number v-model="form.number" />
      </amu-form-item>

      <amu-form-item label="Checkbox" prop="checkbox">
          <amu-checkbox-group v-model="form.checkbox">
            <amu-checkbox value="1">Option A</amu-checkbox>
            <amu-checkbox value="2">Option B</amu-checkbox>
          </amu-checkbox-group>
      </amu-form-item>

       <amu-form-item label="Radio" prop="radio">
          <amu-radio-group v-model="form.radio">
            <amu-radio value="1">Option A</amu-radio>
            <amu-radio value="2">Option B</amu-radio>
          </amu-radio-group>
      </amu-form-item>
       
      <amu-form-item>
        <amu-button type="primary">Submit</amu-button>
        <amu-button style="margin-left: 10px">Cancel</amu-button>
      </amu-form-item>
    </amu-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { 
    AmuForm, AmuFormItem, AmuInput, AmuButton, 
    AmuRadioGroup, AmuRadio, AmuSwitch, AmuSelect, 
    AmuOption, AmuDatePicker, AmuInputNumber,
    AmuCheckboxGroup, AmuCheckbox 
} from 'amu-ui'
import type { FormSize } from 'amu-ui'

const size = ref<FormSize>('medium')
const disabled = ref(false)

const form = reactive({
  input: '',
  select: '',
  date: undefined,
  number: 0,
  checkbox: [],
  radio: ''
})
</script>
