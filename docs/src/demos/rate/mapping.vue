<template>
  <div>
    <p>颜色映射 (2星以下红，4星以下橙，5星绿)：</p>
    <AmuRate v-model="value1" :colors="colors" />
    
    <p>图标映射 (2星以下 frown，4星以下 meh，5星 smile)：</p>
    <AmuRate v-model="value2" :icons="icons" :void-icon="IconFrown" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuRate } from 'amu-ui/rate'
import { IconFrown, IconMeh, IconSmile } from '@amu-ui/icons'

const value1 = ref(2)
const value2 = ref(3)

const colors = ref({ 2: '#F56C6C', 4: '#E6A23C', 5: '#67C23A' })
const icons = ref({ 2: IconFrown, 4: IconMeh, 5: IconSmile })
</script>
