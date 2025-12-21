<template>
  <amu-space direction="vertical">
    <amu-radio-group v-model="radio1">
      <amu-radio-button label="New York" />
      <amu-radio-button label="Washington" />
      <amu-radio-button label="Los Angeles" />
      <amu-radio-button label="Chicago" />
    </amu-radio-group>

    <amu-radio-group v-model="radio2" size="large">
      <amu-radio-button label="New York" />
      <amu-radio-button label="Washington" />
      <amu-radio-button label="Los Angeles" />
      <amu-radio-button label="Chicago" />
    </amu-radio-group>

    <amu-radio-group v-model="radio3" size="small">
      <amu-radio-button label="New York" />
      <amu-radio-button label="Washington" disabled />
      <amu-radio-button label="Los Angeles" />
      <amu-radio-button label="Chicago" />
    </amu-radio-group>

    <amu-radio-group v-model="radio4" fill="#F53F3F" text-color="#ffffff">
      <amu-radio-button label="New York" />
      <amu-radio-button label="Washington" />
      <amu-radio-button label="Los Angeles" />
      <amu-radio-button label="Chicago" />
    </amu-radio-group>
  </amu-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { AmuRadioGroup, AmuRadioButton } from 'amu-ui/radio'
import { AmuSpace } from 'amu-ui/space'

const radio1 = ref('New York')
const radio2 = ref('New York')
const radio3 = ref('New York')
const radio4 = ref('New York')
</script>
