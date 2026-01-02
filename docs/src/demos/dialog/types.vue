<template>
  <AmuSpace>
    <AmuButton type="primary" @click="visible1 = true">Confirm</AmuButton>
    <AmuButton type="primary" @click="visible2 = true">Feedback (Success)</AmuButton>
    <AmuButton type="primary" @click="visible3 = true">Feedback (Warning)</AmuButton>
    <AmuButton type="primary" @click="visible4 = true">Feedback (Error)</AmuButton>
    <AmuButton type="primary" @click="visible5 = true">Custom Icon</AmuButton>
  </AmuSpace>

  <AmuDialog v-model="visible1" type="confirm" title="Confirm" description="This is a confirm dialog." />
  
  <AmuDialog v-model="visible2" type="feedback" icon="success" title="Success" description="Operation successful!" />
  
  <AmuDialog v-model="visible3" type="feedback" icon="warning" title="Warning" description="Something might be wrong." />
  
  <AmuDialog v-model="visible4" type="feedback" icon="error" title="Error" description="Operation failed." />

  <AmuDialog v-model="visible5" title="Custom Icon" description="Dialog with custom icon.">
    <template #icon>
      <AmuIcon color="blue"><IconActivity /></AmuIcon>
    </template>
  </AmuDialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuDialog, AmuButton, AmuSpace, AmuIcon } from 'amu-ui'
import { IconActivity } from '@amu-ui/icons'

const visible1 = ref(false)
const visible2 = ref(false)
const visible3 = ref(false)
const visible4 = ref(false)
const visible5 = ref(false)
</script>
