<template>
  <AmuSpace direction="vertical">
    <AmuInput v-model="value1" placeholder="前缀和后缀">
      <template #prefix>User</template>
      <template #suffix>KG</template>
    </AmuInput>

    <AmuInput v-model="value2" placeholder="前置和后置">
      <template #prepend>Http://</template>
      <template #append>.com</template>
    </AmuInput>

    <AmuInput v-model="value3" placeholder="带图标">
      <template #prefix>
        <AmuIcon>
          <IconUser />
        </AmuIcon>
      </template>
      <template #suffix>
        <AmuIcon>
          <IconSearch />
        </AmuIcon>
      </template>
    </AmuInput>
  </AmuSpace>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuInput, AmuSpace } from 'amu-ui'
import { IconUser, IconSearch } from '@amu-ui/icons'

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
</script>
