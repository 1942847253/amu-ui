<template>
  <div>
    <AmuRate
      v-model="value"
      :texts="['极差', '失望', '一般', '满意', '惊喜']"
      show-text
    />
    <br/>
    <AmuRate
      v-model="value2"
      show-score
      text-color="#ff9900"
      score-template="{value} 分"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuRate } from 'amu-ui/rate'

const value = ref(0)
const value2 = ref(3.7) // test decimal display
</script>
