<template>
  <div class="demo-select-placement">
    <amu-select v-model="value" placeholder="bottom-start (default)" placement="bottom-start">
      <amu-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </amu-select>
    <amu-select v-model="value" placeholder="top-start" placement="top-start">
      <amu-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </amu-select>
    <amu-select v-model="value" placeholder="bottom-end" placement="bottom-end">
      <amu-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </amu-select>
    <amu-select v-model="value" placeholder="top-end" placement="top-end">
      <amu-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </amu-select>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')

const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]
</script>

<style scoped>
.demo-select-placement .amu-select {
  margin-right: 20px;
  margin-bottom: 20px;
}
</style>
