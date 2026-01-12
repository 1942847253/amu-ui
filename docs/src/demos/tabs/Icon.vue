<script lang="ts" setup>
import { ref, shallowRef } from 'vue'
import { IconUser, IconSettings, IconHome } from '@amu-ui/icons'

const activeKey = ref('home')
</script>

<template>
  <amu-tabs v-model="activeKey">
    <amu-tab-pane name="home" title="Home" :icon="IconHome">
      Home Content
    </amu-tab-pane>
    <amu-tab-pane name="profile" title="Profile" :icon="IconUser">
      Profile Content
    </amu-tab-pane>
    <amu-tab-pane name="settings" title="Settings" :icon="IconSettings">
      Settings Content
    </amu-tab-pane>
  </amu-tabs>
</template>
