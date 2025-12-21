<template>
    <amu-space direction="vertical">
        <amu-radio-group v-model="radio1" size="large">
            <amu-radio label="1">Option 1</amu-radio>
            <amu-radio label="2">Option 2</amu-radio>
        </amu-radio-group>

        <amu-radio-group v-model="radio2" size="default">
            <amu-radio label="1">Option 1</amu-radio>
            <amu-radio label="2">Option 2</amu-radio>
        </amu-radio-group>

        <amu-radio-group v-model="radio3" size="small">
            <amu-radio label="1">Option 1</amu-radio>
            <amu-radio label="2">Option 2</amu-radio>
        </amu-radio-group>
    </amu-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { AmuRadio, AmuRadioGroup } from 'amu-ui/radio'
import { AmuSpace } from 'amu-ui/space'

const radio1 = ref('1')
const radio2 = ref('1')
const radio3 = ref('1')
</script>
