<template>
  <amu-space direction="vertical" fill style="width: 100%">
    <div style="margin-bottom: 16px;">
        <amu-button @click="toggleLoading">Toggle Loading (current: {{ loading }})</amu-button>
    </div>

    <amu-card>
      <amu-skeleton :loading="loading" animated>
        <template #template>
          <div style="display: flex; gap: 16px;">
            <amu-skeleton-item variant="image" style="width: 100px; height: 100px; flex-shrink: 0;" />
            <div style="flex: 1;">
              <amu-skeleton-item variant="h3" style="width: 50%" />
              <div style="margin-top: 10px; display: flex; flex-direction: column; gap: 8px;">
                 <amu-skeleton-item variant="text" />
                 <amu-skeleton-item variant="text" />
                 <amu-skeleton-item variant="text" style="width: 80%" />
              </div>
            </div>
          </div>
        </template>
        
        <div style="display: flex; gap: 16px;">
          <div style="width: 100px; height: 100px; background: #eee; border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #999; font-size: 24px; flex-shrink: 0;">
            🖼️
          </div>
          <div>
            <h3 style="margin: 0 0 10px 0;">Delicious Dessert</h3>
            <p style="margin: 0; color: var(--amu-color-text-default);">This is a delicious dessert. It tastes very sweet and makes people happy.</p>
          </div>
        </div>
      </amu-skeleton>
    </amu-card>
  </amu-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { AmuSkeleton, AmuSkeletonItem, AmuCard, AmuButton, AmuSpace } from 'amu-ui'

const loading = ref(true)
const toggleLoading = () => {
    loading.value = !loading.value
}
</script>
