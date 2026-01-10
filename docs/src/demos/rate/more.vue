<template>
  <div>
    <p>尺寸：</p>
    <AmuRate v-model="value" size="sm" style="margin-right: 18px;" />
    <AmuRate v-model="value" size="md" style="margin-right: 18px;" />
    <AmuRate v-model="value" size="lg" />
    
    <p>自定义图标：</p>
    <AmuRate 
        v-model="value2" 
        :icons="icons"
        :void-icon="IconFrown" 
        :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AmuRate } from 'amu-ui/rate'
import { IconFrown, IconMeh, IconSmile } from '@amu-ui/icons'

const value = ref(3)
const value2 = ref(2)

const icons = [IconFrown, IconMeh, IconSmile]
</script>
