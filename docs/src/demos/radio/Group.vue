<template>
  <amu-radio-group v-model="radio">
    <amu-radio :label="3">Option A</amu-radio>
    <amu-radio :label="6">Option B</amu-radio>
    <amu-radio :label="9">Option C</amu-radio>
  </amu-radio-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { AmuRadio, AmuRadioGroup } from 'amu-ui/radio'

const radio = ref(3)
</script>
