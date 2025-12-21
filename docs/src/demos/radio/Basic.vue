<template>
  <amu-radio v-model="radio" label="1">Option 1</amu-radio>
  <amu-radio v-model="radio" label="2">Option 2</amu-radio>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { AmuRadio } from 'amu-ui/radio'

const radio = ref('1')
</script>
