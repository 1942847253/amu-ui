<template>
  <amu-space direction="vertical" style="width: 100%">
    <amu-space>
      <amu-button @click="scrollTo(0)">Scroll to Top</amu-button>
      <amu-button @click="scrollTo(100)">Scroll to 100px</amu-button>
      <amu-button @click="scrollTo(200)">Scroll to 200px</amu-button>
      <amu-button @click="scrollToBottom">Scroll to Bottom</amu-button>
    </amu-space>
    
    <amu-scrollbar ref="scrollbarRef" height="400px" always>
      <div ref="innerRef">
        <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</p>
      </div>
    </amu-scrollbar>
  </amu-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { AmuScrollbar } from 'amu-ui/scrollbar'

const scrollbarRef = ref<InstanceType<typeof AmuScrollbar>>()
const innerRef = ref<HTMLDivElement>()

const scrollTo = (top: number) => {
  scrollbarRef.value!.setScrollTop(top)
}

const scrollToBottom = () => {
  if (innerRef.value) {
    scrollbarRef.value!.setScrollTop(innerRef.value.clientHeight)
  }
}
</script>

<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--amu-color-bg-fill);
  color: var(--amu-color-text);
}
</style>
