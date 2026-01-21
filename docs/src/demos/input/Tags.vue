<template>
  <div style="width: 100%; max-width: 600px;">
    <h3>基础用法</h3>
    <amu-input
      v-model="inputValue"
      v-model:tags="tags"
      type="tags"
      placeholder="输入后按回车"
      style="width: 100%"
    />
    <div style="margin-top: 10px;">Tags: {{ tags }}</div>

    <h3>不同尺寸</h3>
    <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px;">
        <amu-input
            v-model:tags="tagsSmall"
            type="tags"
            size="small"
            placeholder="Small size"
        />
        <amu-input
            v-model:tags="tagsMedium"
            type="tags"
            size="medium"
            placeholder="Medium size"
        />
        <amu-input
            v-model:tags="tagsLarge"
            type="tags"
            size="large"
            placeholder="Large size"
        />
    </div>

    <h3>限制数量 (最多3个)</h3>
    <amu-input
        v-model:tags="tagsLimit"
        type="tags"
        :max-tags="3"
        placeholder="最多输入3个标签"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const inputValue = ref('')
const tags = ref(['Vue', 'React', 'Angular'])

const tagsSmall = ref(['Small'])
const tagsMedium = ref(['Medium'])
const tagsLarge = ref(['Large'])

const tagsLimit = ref(['HTML', 'CSS'])
</script>
