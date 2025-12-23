<template>
  <AmuSpace direction="vertical">
    <AmuSwitch v-model="value1" checked-text="ON" unchecked-text="OFF" />
    <AmuSwitch v-model="value2" checked-text="开了哦小朋友" unchecked-text="关了哦小姐姐" />
    <AmuSwitch v-model="value3">
      <template #checked-icon>
        <AmuIcon><IconCheck /></AmuIcon>
      </template>
      <template #unchecked-icon>
        <AmuIcon><IconX /></AmuIcon>
      </template>
    </AmuSwitch>
  </AmuSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuSwitch } from 'amu-ui/switch'
import { AmuSpace } from 'amu-ui/space'
import { AmuIcon } from 'amu-ui/icon'
import { IconCheck, IconX } from '@amu-ui/icons'

const value1 = ref(true)
const value2 = ref(true)
const value3 = ref(true)
</script>
