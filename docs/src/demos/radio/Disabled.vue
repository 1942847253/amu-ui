<template>
  <amu-radio v-model="radio" disabled label="disabled">Disabled</amu-radio>
  <amu-radio v-model="radio" disabled label="selected">Disabled & Selected</amu-radio>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { AmuRadio } from 'amu-ui/radio'

const radio = ref('selected')
</script>
